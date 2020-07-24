const langUtils = require("isdcf-registries/src/main/scripts/language-utilities.js")

module.exports = registry => {

  /* build display name */

  for (let i in registry) {
    let langtag = registry[i].rfc5646Tag;

    let ptag = langUtils.parseLanguageTag(langtag);

    let locale = langUtils.parsedTagToCLDRLocale(ptag);

    if (!locale) {
      throw "Cannot transform language tag to locale: " + langtag;
    }

    /* CLDR locale */

    registry[i].cldrLocale = langUtils.fromParsedTagToCanonicalTag(locale);

    /* add display name */

    let dn = langUtils.buildDisplayName(locale);

    if (!dn) {
      throw "Invalid language tag: " + langtag;
    }

    registry[i].displayName = dn;

  }

}
