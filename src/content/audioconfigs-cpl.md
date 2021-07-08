The Audio Configuration is listed at **//Reel[1]//CompositionMetadataAsset/MainSoundConfiguration**[^1][^2][^3][^4]

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <MainSoundConfiguration>71/L,R,C,LFE,Lss,Rss,HI,VIN,-,-,Lrs,Rrs,-,-,-,-</MainSoundConfiguration>
      …
    </CompositionMetadataAsset>



[^1]: *The syntax for the Sound Configuration value includes qualifiers not shown in the example above; see SMPTE ST 429-16-2014 for details.*
[^2]: *Permissible values for the SOUNDFIELD component of `MainSoundConfiguration` include the following listed in SMPTE ST 428-12: `51`, `71`, `SDS`, `M`.*
[^3]: *For silent compositions, either omit the `MainSoundConfiguration` element or append `/-` to the SOUNDFIELD, e.g. `71/-`.*
[^4]: *The `MainSoundConfiguration` element is a logical extension of the `MainSound` element in the composition playlist (the latter is a required element).*