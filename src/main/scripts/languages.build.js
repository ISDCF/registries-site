const hb = require('handlebars');
const fs = require('fs');
const path = require('path');
const utils = require('./language-utilities.js');
const puppeteer = require('puppeteer');
const proc = require('child_process');
const ajv = require('ajv');


const REGISTRIES_REPO_PATH = "external/registries";
const DATA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/data/languages.json");
const DATA_SCHEMA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/schemas/languages.schema.json");
const TEMPLATE_PATH = "src/main/templates/languages.hbs";
const PAGE_JS_PATH = "src/site/filter-languages.js";
const PAGE_JS2_PATH = "src/site/backtotop.js";
const PAGE_CSS_PATH = "src/site/mobile.css";
const BUILD_PATH = "build";
const PAGE_SITE_PATH = "languages.html";
const PDF_SITE_PATH = "languages.pdf";
const DISPLAYNAMES_PATH = "node_modules/cldr-localenames-modern/main/en/languages.json";

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

/* load display names */

let displayNames = JSON.parse(
  fs.readFileSync(
    DISPLAYNAMES_PATH
  )
);

if (!displayNames) {
  throw "Cannot load CLDR display names";
}

/* build display name */

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

/* confirm we understand the registry schema */

let json_schema = JSON.parse(
  fs.readFileSync(
    DATA_SCHEMA_PATH
  )
);

if (json_schema["$id"] !== "http://isdcf.com/ns/json-schemas/registries/languages/1.0.0-beta.1") {
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
fs.copyFileSync(PAGE_JS2_PATH, path.join(BUILD_PATH, path.basename(PAGE_JS2_PATH)));
fs.copyFileSync(PAGE_CSS_PATH, path.join(BUILD_PATH, path.basename(PAGE_CSS_PATH)));

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

