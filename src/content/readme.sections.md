### Sections

* "int" Introduction Text - pageTemplate-int.md
* "ov" Overview (tab) - pageTemplate-ov.md
* "rls" Rules (tab) - pageTemplate-rls.md
* "ctt" CTT Example (tab) - pageTemplate-ctt.md
* "cpl" CPL Usage (tab) - pageTemplate-cpl.md
* "spn" Special Note - pageTemplate-spn.md
* "lst" List - pageTemplate-lst.md

pageTemplate = pages.pageTemplate from build.js

**To create a new section for a page**: 
1. Create new md file with naming convention above. 
2. Add section, .md filename link, and short description to "readme.DCNCSiteMap.md" for tracking overall site mapping (no functionality is built of this page)
3. Build file will automatically place into the "content.hbs" template for all pages.

*Note: "sample-.md" files have provided for layout examples and to duplicate from* 