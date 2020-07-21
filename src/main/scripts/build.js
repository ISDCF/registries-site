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

const path = require('path');
const fs = require('fs');
const proc = require("child_process");
const hb = require('handlebars');
const puppeteer = require('puppeteer');

const REGISTRIES_REPO_PATH = "external/registries";
const PAGE_JS_PATH = "src/site/features.js";
const PAGE_CSS_PATH = "src/site/mobile.css";
const BUILD_PATH = "build";

/* list the available registries type (lower case), id (single, for links), titles (Upper Case), and schema builds */

const registries = [
  {
    "listType": "facilities",
    "idType": "facility",
    "listTitle": "Facilities",
    "schemaBuild": "1.0.0-beta.2"
  },
  {
    "listType": "languages",
    "idType": "language",
    "listTitle": "Languages",
    "schemaBuild": "1.0.0-beta.1"
  },
  {
    "listType": "studios",
    "idType": "studio",
    "listTitle": "Studios",
    "schemaBuild": "1.0.0-beta.1"
  }
]

/* load and build the templates */

registries.forEach(function(obj) {
  
  var listType = obj.listType
  var idType = obj.idType
  var listTitle = obj.listTitle
  var schemaBuild = obj.schemaBuild

  console.log(`Building ${listType} started`)

  var DATA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/data/" + listType + ".json");
  var DATA_SCHEMA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/schemas/" + listType + ".schema.json");
  var TEMPLATE_PATH = "src/main/templates/" + listType + ".hbs";
  var PAGE_SITE_PATH = listType + ".html";
  var PDF_SITE_PATH = listType + ".pdf";

  /* load header and footer for templates */

  hb.registerPartial('header', fs.readFileSync("src/main/templates/partials/header.hbs", 'utf8'));
  hb.registerPartial('footer', fs.readFileSync("src/main/templates/partials/footer.hbs", 'utf8'));
  
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
    
  /* load display names if registry is "languages" */

  if (listType == "languages") {
    
    var DISPLAYNAMES_PATH = "node_modules/cldr-localenames-modern/main/en/languages.json";
    var UTILS_PATH = path.join("./../../../", REGISTRIES_REPO_PATH, "src/main/scripts/language-utilities.js");
    
    let displayNames = JSON.parse(
      fs.readFileSync(
        DISPLAYNAMES_PATH
      )
    );
    
    if (!displayNames) {
      throw "Cannot load CLDR display names";
    }
    
    /* build display name */
    
    var utils = require(UTILS_PATH);
    
    for (let i in registry) {
      let langtag = registry[i]["rfc5646Tag"];
    
      let ptag = utils.parseLanguageTag(langtag);
    
      let locale = utils.parsedTagToCLDRLocale(ptag);
    
      if (!locale) {
        throw "Cannot transform language tag to locale: " + langtag;
      }
    
      /* CLDR locale */
    
      registry[i].cldrLocale = utils.fromParsedTagToCanonicalTag(locale);
    
      /* add display name */
    
      let dn = utils.buildDisplayName(locale);
    
      if (!dn) {
        throw "Invalid language tag: " + langtag;
      }
    
      registry[i].displayName = dn;
    
    }

  }
  
  /* confirm we understand the registry schema */
  
  let json_schema = JSON.parse(
    fs.readFileSync(
      DATA_SCHEMA_PATH
    )
  );
  
  if (json_schema["$id"] !== "http://isdcf.com/ns/json-schemas/registries/" + listType + "/" + schemaBuild) {
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
    "site_version": site_version,
    "listType": listType,
    "idType": idType,
    "listTitle": listTitle
  });
  
  /* write HTML file */
  
  fs.writeFileSync(path.join(BUILD_PATH, PAGE_SITE_PATH), html, 'utf8');
  
  /* copy in js */
  fs.copyFileSync(PAGE_JS_PATH, path.join(BUILD_PATH, path.basename(PAGE_JS_PATH)));
  fs.copyFileSync(PAGE_CSS_PATH, path.join(BUILD_PATH, path.basename(PAGE_CSS_PATH)));

  /* write pdf */

  if (process.argv.slice(2).includes("--nopdf")) return;
  
  /* set the CHROMEPATH environment variable to provide your own Chrome executable */
  
  var pptr_options = {};
  
  if (process.env.CHROMEPATH) {
    pptr_options.executablePath = process.env.CHROMEPATH;
  };
  
  try {

    (async() => {

      var browser = await puppeteer.launch(pptr_options);
      var page = await browser.newPage();
      await page.setContent(html);
      await page.pdf({ path: path.join(BUILD_PATH, PDF_SITE_PATH).toString()});
      await browser.close();

    })();

  } catch (e) {
      console.log(e);
    }

  console.log(`Build of ${listType} completed`)

});
