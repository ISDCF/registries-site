The Title of the DCP is listed at **//ContentTitleText**[^1]

    <CompositionPlaylist xmlns=”http://www.smpte-ra.org/schemas/429-7/2006/CPL”>
      …
      <ContentTitleText>AliceWonder_FTR-1_S_EN-LAS_US-13_51_2K_DI_20060607_TDC_OV</ContentTitleText>
      …
    </CompositionPlaylist>

Alternatively, the Title may be listed at **//Reel[1]//CompositionMetadataAsset//FullContentTitleText**[^2]

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <FullContentTitleText language=”en”>Alice In Wonderland</FullContentTitleText>
      …
    </CompositionMetadataAsset>

[^1]: *Historically this has been the digital cinema naming convention string*

[^2]: *This field is not meant to house the DCNC. The difference between ContentTitleText and FullContentTitleText is that the former may contain technical information, whereas the latter should contain the actual title of the composition. The language attribute is optional.*