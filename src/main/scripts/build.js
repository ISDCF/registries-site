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
const fs = require('fs').promises;
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile)
const hb = require('handlebars');
const puppeteer = require('puppeteer');
const md = require('markdown-it')({
    html: true,
    breaks: true,
  })
  .use(require('markdown-it-include'), 'src/content/')
  .use(require('markdown-it-footnote'));
const markdownItAttrs = require('markdown-it-attrs');
md.use(markdownItAttrs, {
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: ['id', 'class', /^regex.*$/]
})

const REGISTRIES_REPO_PATH = "external/registries";
const SITE_PATH = "src/site"
const BUILD_PATH = "build";

/* list the available pages (note - order here determines order for page menu):

  "pageType": "menuBreak", "descriptiveText", or "registryTable"
  "pageTemplate": "lowercase" / plural for registries or lists
  "idType": "lowercase" / singular, not used for "descriptiveText" or "menuBreak"
  "pageTitle": "Proper Case" / Page and Menu name
  "schemaBuild": "1.0.0-beta.1" / specific to registry, not used for "descriptiveText" or "menuBreak"
  "menuLevel": 1, 2, or 3 / controls indents in menu (1 used for single pages. 2 is used for menu sections headers, 3 is for sub sections)
  "pageOrder": order of the pages in the menu and for pagination (actual pages only)
  "sections": [
    "int" Introduction Text - pageTemplate-int
    "ov" Overview (tab) - pageTemplate-ov
    "rls" Rules (tab) - pageTemplate-rls
    "ctt" CTT Example (tab) - pageTemplate-ctt
    "cpl" CPL Usage (tab) - pageTemplate-cpl
    "spn" Special Note - pageTemplate-spn
    "lst" List - pageTemplate-ls
    "toc" Table of Content - pageTemplate-toc
  ] / all non "menuBreak" pages must have at least one section

*/

const pages = [
  {
    "pageType": "descriptiveText",
    "pageTemplate": "index",
    "pageTitle": "Digital Cinema Naming Convention and Metadata/Terminology Registries",
    "menuLevel": 1,
    "pageOrder": 1
  },
  {
    "pageType": "menuCollapse",
    "pageTemplate": "namingconvention",
    "pageTitle": "Digital Cinema Naming Convention",
    "menuLevel": 2
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "general",
    "pageTitle": "General Tips",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 2
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "illustratedguide",
    "pageTitle": "Illustrated Guide",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 3
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "contenttypes",
    "idType": "contenttype",
    "pageTitle": "Content Types",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 4
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "contentmodifiers",
    "idType": "contentmodifier",
    "pageTitle": "Content Modifiers",
    "schemaBuild": "1.0.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 5
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "labeling3dproduct",
    "pageTitle": "Labeling 3D Product",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 6
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "labelingcombotrailers",
    "pageTitle": "Labeling 'Combo' Trailers",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ]
    ,
    "pageOrder": 7
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "projectoraspectratios",
    "idType": "projectoraspectratio",
    "pageTitle": "Projector Aspect Ratios and Resolutions",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 8
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "languages",
    "idType": "language",
    "pageTitle": "Language Codes",
    "schemaBuild": "1.0.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 9
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "openandclosedcaptions",
    "pageTitle": "Open and Closed Captions",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 10
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "territories",
    "idType": "territory",
    "pageTitle": "Territory Codes",
    "schemaBuild": "1.0.3",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 11
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "ratings",
    "idType": "rating",
    "pageTitle": "Ratings",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 12
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "audioconfigs",
    "idType": "audioconfig",
    "pageTitle": "Audio Config and Narrative Description Tracks",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 13
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "studios",
    "idType": "studio",
    "pageTitle": "Studio Codes",
    "schemaBuild": "2.0.0",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 14
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "creationdate",
    "pageTitle": "Creation Date",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 15
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "facilities",
    "idType": "facility",
    "pageTitle": "Facility Codes",
    "schemaBuild": "1.0.0",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 16
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "standard",
    "pageTitle": "Standard",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 17
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "pkgtypes",
    "pageTitle": "Package Types",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 18
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "imax",
    "pageTitle": "IMAX",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 19
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "references",
    "pageTitle": "References",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 20
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "acknowledgements",
    "pageTitle": "Acknowledgements",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 21
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "translations",
    "pageTitle": "Translations",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 22
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "updates",
    "pageTitle": "Updates",
    "menuLevel": 3,
    "breadCrumb": [
      "Naming Convention"
    ],
    "pageOrder": 23
  },
  {
    "pageType": "menuCollapseEnd",
    "pageTemplate": "namingconvention",
    "pageTitle": "Naming Convention End",
    "menuLevel": 2
  },
  {
    "pageType": "menuCollapse",
    "pageTemplate": "metadataregistry",
    "pageTitle": "Metadata Registry",
    "menuLevel": 2
  },
  {
    "pageType": "descriptiveText",
    "pageTemplate": "registryintro",
    "pageTitle": "Introduction",
    "menuLevel": 3,
    "breadCrumb": [
      "Metadata Registry"
    ],
    "pageOrder": 24
  },
  {
    "pageType": "registryTable", 
    "pageTemplate": "cplmetadataexts",
    "idType": "cplmetadataext",
    "pageTitle": "CPL Metadata Extensions",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Metadata Registry"
    ],
    "pageOrder": 25
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "kdmforensicflags",
    "idType": "kdmforensicflag",
    "pageTitle": "KDM Forensic Flags",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Metadata Registry"
    ],
    "pageOrder": 26
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "uls",
    "idType": "ul",
    "pageTitle": "ULs",
    "schemaBuild": "1.0.0-beta.1",
    "menuLevel": 3,
    "breadCrumb": [
      "Metadata Registry"
    ],
    "pageOrder": 27
  },
  {
    "pageType": "menuCollapseEnd",
    "pageTemplate": "metadataregistry",
    "pageTitle": "Metadata Registry End",
    "menuLevel": 2
  },
  {
    "pageType": "menuCollapse",
    "pageTemplate": "terminologyregistry",
    "pageTitle": "Terminology Registry",
    "menuLevel": 2
  },
  {
    "pageType": "registryTable",
    "pageTemplate": "terms",
    "idType": "term",
    "pageTitle": "Terms",
    "schemaBuild": "1.0.0-beta.2",
    "menuLevel": 3,
    "breadCrumb": [
      "Terminology Registry"
    ],
    "pageOrder": 28
  },
  {
    "pageType": "menuCollapseEnd",
    "pageTemplate": "terminologyregistry",
    "pageTitle": "Terminology Registry End",
    "menuLevel": 2
  }/*,
  {
    "pageType": "descriptiveText",
    "pageTemplate": "sample",
    "pageTitle": "Sample Page (All Sections)",
    "menuLevel": 2
  }*/
]

/* load and build the templates */

async function buildPage ({ pageTemplate, pageType, idType, pageTitle, schemaBuild, sections, breadCrumb, pageOrder }) {

  if (pageType == "descriptiveText" || pageType == "registryTable") {

    console.log(`Building page ${pageTemplate} started`)

    var DATA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/data/" + pageTemplate + ".json");
    var DATA_SCHEMA_PATH = path.join(REGISTRIES_REPO_PATH, "src/main/schemas/" + pageTemplate + ".schema.json");
    var PAGE_SITE_PATH 
    if (pageTemplate == "index") {
      PAGE_SITE_PATH = pageTemplate + ".html";
    }
    else {
      PAGE_SITE_PATH = pageTemplate + "/index.html";
    }

  /* load header and footer for templates */

    hb.registerPartial('header', await fs.readFile("src/main/templates/partials/header.hbs", 'utf8'));
    hb.registerPartial('pagination', await fs.readFile("src/main/templates/partials/pagination.hbs", 'utf8'));
    hb.registerPartial('footer', await fs.readFile("src/main/templates/partials/footer.hbs", 'utf8'));
    
  /* instantiate template */

    if (pageType == "registryTable") {
      var TEMPLATE_PATH = "src/main/templates/" + pageTemplate + ".hbs";
    } else {
      var TEMPLATE_PATH = "src/main/templates/default.hbs";
    }
    
    let template = hb.compile(
      await fs.readFile(TEMPLATE_PATH, 'utf8')
    );
    
    if (!template) {
      throw "Cannot load HTML template";
    }
    
  /* load in markup sections for templates */ 

    var sectionList = [
      "int",
      "ov",
      "rls",
      "ctt",
      "cpl",
      "spn",
      "lst",
      "toc" 
    ]

    var templateSections = {}

    sectionList.forEach(function (sec) {
   
      try {
        var section = md.render('!!!include(' + pageTemplate + '-' + sec + '.md)!!!');
        console.log("Building section " + pageTemplate + "-" + sec)
      } catch (e) {
        /* console.log("No " + pageTemplate + "-" + sec + " section present") */
      } 

      templateSections['page-' + sec] = pageTemplate + "-" + sec;
      templateSections['section-' + sec] = section;

    });

    hb.registerPartial('content', await fs.readFile("src/main/templates/partials/content.hbs", 'utf8'));

  /* if Conditional helpers */

    hb.registerHelper('ifeq', function (a, b, options) {
      if (a == b) { 
        return options.fn(this); 
      }
      return options.inverse(this);
    });

    hb.registerHelper('ifactive', function (a, b, options) {
        return a + '-' + b
    });

    hb.registerHelper('ifnoteq', function (a, b, options) {
      if (a !== b) { 
        return options.fn(this); 
      }
      return options.inverse(this);
    });

    hb.registerHelper('ifinc', function (a, b, options) {
      if (a.includes(b)) { 
        return options.fn(this); 
      }
      return options.inverse(this);
    });

    hb.registerHelper('stripillegalChars', function (a, b, options) {
      var cleanString = a.replace(/([^a-z0-9]+)/gi, '');
      return cleanString
    });

    const pageNumtoTemplate = {}
    pages.forEach(item => { pageNumtoTemplate[item.pageOrder] = item.pageTemplate})

    hb.registerHelper('lastPage', function (a, b, options) {
      var lastpageCount = a - 1
      return pageNumtoTemplate[lastpageCount];
    });

    hb.registerHelper('nextPage', function (a, b, options) {
      var nextpageCount = a + 1
      return pageNumtoTemplate[nextpageCount];
    });

  /* load the registry */

    if (pageType == "registryTable") {

      var registry = JSON.parse(
        await fs.readFile(DATA_PATH)
      );

      if (!registry) {
        throw "Cannot load registry";
      }

    } else {
      var registry = ''
    }

  /* load dcnc rating values if registry is "ratings" */

    if (pageType == "registryTable" && pageTemplate == "ratings") {

      for (let i in registry) {

        var rvaluesdcnc = []
        let rvalues = registry[i]["ratings"];

        rvalues.forEach(item => { 
          rC = item.replace(/[^0-9a-zA-Z]/g, '');
          rV = rC.toUpperCase();
          rL = rV.substr(0, 5);
          rvaluesdcnc.push(rL);

        } );

        registry[i].ratingsdcnc = rvaluesdcnc;

      }

    }
    
  /* load display names if registry is "languages" */

    if (pageType == "registryTable" && pageTemplate == "languages") {
      
      var DISPLAYNAMES_PATH = "node_modules/cldr-localenames-modern/main/en/languages.json";
      var UTILS_PATH = path.join("./../../../", REGISTRIES_REPO_PATH, "src/main/scripts/language-utilities.js");
      
      let displayNames = JSON.parse(
        await fs.readFile(DISPLAYNAMES_PATH)
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

    if (pageType == "registryTable") {

      var json_schema = JSON.parse(
        await fs.readFile(DATA_SCHEMA_PATH)
      );
      
      if (json_schema["$id"] !== "http://isdcf.com/ns/json-schemas/registries/" + pageTemplate + "/" + schemaBuild) {
        throw "Incompatible registry schema: " + json_schema["$id"];
      };

    } 

  /* get the version fields */
    
    let registry_version = "Unknown version"
    
    try {
      registry_version = (await execFile('git', [ 'submodule', 'status', REGISTRIES_REPO_PATH ])).stdout.split(" ");
    } catch (e) {
      console.warn(e);
    }

    let site_version = "Unknown version"
    
    try {
      site_version = (await execFile('git', [ 'rev-parse', 'HEAD' ])).stdout.trim()
    } catch (e) {
      console.warn(e);
    }
    
  /* create build directory */
    
    await fs.mkdir(BUILD_PATH, { recursive: true });
    if (pageTemplate != "index") { 
      await fs.mkdir(BUILD_PATH + "/" + pageTemplate, { recursive: true });
    }

  /* determine if build on GH to remove "index.html" from internal link */

    let htmlLink = "index.html"

    if ('GH_PAGES_BUILD' in process.env) {
      htmlLink = ""
    }

  /* apply template */
    
    var html = template({
      "version" : registry_version[1],
      "pages": pages,
      "htmlLink": htmlLink,
      "pageOrder": pageOrder,
      "data" : registry,
      "date" :  new Date(),
      "site_version": site_version,
      "pageTemplate": pageTemplate,
      "idType": idType,
      "pageTitle": pageTitle,
      "pageType": pageType,
      "breadCrumb": breadCrumb,
      "templateSections": templateSections,
    });
    
  /* write HTML file */
    
    await fs.writeFile(path.join(BUILD_PATH, PAGE_SITE_PATH), html, 'utf8');
    
  /* copy in static resources */

    await Promise.all((await fs.readdir(SITE_PATH)).map(
      f => fs.copyFile(path.join(SITE_PATH, f), path.join(BUILD_PATH, f))
    ))

  /* page template completed */

    console.log(`Build page ${pageTemplate} completed`)

  }

};

void (async () => {

  await Promise.all(pages.map(buildPage))
  console.log("Site is built.")

})().catch(e => { console.error(e); process.exit(1) } )
