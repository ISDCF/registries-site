/*
Copyright (c) 2020, InterSociety Digital Cinema Forum
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* pass the option --nopdf to disable PDF creation */

const hb = require('handlebars');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const proc = require('child_process');
const ajv = require('ajv');


const REGISTRIES_REPO_PATH = "external/registries";
const DATA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/data/facilities.json");
const DATA_SCHEMA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/schemas/facilities.schema.json");
const TEMPLATE_PATH = "src/main/templates/facilities.hbs";
const PAGE_JS_PATH = "src/site/facilities.js";
const BUILD_PATH = "build";
const PAGE_SITE_PATH = "facilities.html";
const PDF_SITE_PATH = "isdcf-facilities.pdf";

/* instantiate template */

let template = hb.compile(
  fs.readFileSync(
    TEMPLATE_PATH,
    'utf8'
  )
);

if (!template) {
  throw "Cannot load HTML template";
}

/* load the registry */

let registry = JSON.parse(
  fs.readFileSync(
    DATA_PATH
  )
);

if (!registry) {
  throw "Cannot load registry";
}

/* confirm we understand the registry schema */

let json_schema = JSON.parse(
  fs.readFileSync(
    DATA_SCHEMA_PATH
  )
);

if (json_schema["$id"] !== "http://isdcf.com/ns/json-schemas/registries/facilities/1.0.0-beta.2") {
  throw "Incompatible registry schema: " + json_schema["$id"];
};

/* get the version fields */

let registry_version = "Unknown version"

try {
  registry_version = proc.execSync('git submodule status ' + REGISTRIES_REPO_PATH).toString().trim().split(" ")[0];
} catch (e) {
}

let site_version = "Unknown version"

try {
  site_version = proc.execSync('git rev-parse HEAD').toString().trim();
} catch (e) {
}


/* create build directory */

fs.mkdirSync(BUILD_PATH, { recursive: true });

/* apply template */

var html = template({
  "version" : registry_version,
  "data" : registry,
  "date" :  new Date(),
  "pdf_path": PDF_SITE_PATH,
  "site_version": site_version
});

/* write HTML file */

fs.writeFileSync(path.join(BUILD_PATH, PAGE_SITE_PATH), html, 'utf8');

/* copy in js */
fs.copyFileSync(PAGE_JS_PATH, path.join(BUILD_PATH, path.basename(PAGE_JS_PATH)));

/* write pdf */

if (process.argv.slice(2).includes("--nopdf")) return;

/* set the CHROMEPATH environment variable to provide your own Chrome executable */

var pptr_options = {};

if (process.env.CHROMEPATH) {
  pptr_options.executablePath = process.env.CHROMEPATH;
}

(async () => {
  const browser = await puppeteer.launch(pptr_options);
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: path.join(BUILD_PATH, PDF_SITE_PATH).toString() })
  await browser.close();
  process.exit();
})();

