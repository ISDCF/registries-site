The Release Territory is listed at **//Reel[1]//CompositionMetadataAsset/ReleaseTerritory**[^1][^2]

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <ReleaseTerritory>US</ReleaseTerritory>
      …
    </CompositionMetadataAsset>



[^1]: *Permissible values for the Release Territory are governed by the scope attribute.  The value of the scope attribute informs the recipient which values can be present in ReleaseTerritory. For instance, if the default value (<http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata#scope/release-territory/UNM49>) is used, then only values defined in the IETF RFC 5646 Language SubtagRegistry. Future versions of the specification (or individual parties) can define additional permissible sets of values by introducing new values for the scope attribute. If a recipient finds a scope value it does not understand, it will not know what values can be present, but should nevertheless present them to the user. In other words, whereas the choice of contents for, say `FullContentTitleText`, is left entirely to the author, the contents of a `ReleaseTerritory` instance is intended to be limited to the values permitted by the controlled vocabulary identified by the value of the scope attribute. By default, these are specified by IETF RFC 5646. RFC 5646 does not allow all the territory codes listed on this page, nor does it allow `INT`.*
[^2]: *Release Territory codes should be in upper case.*