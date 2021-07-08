Information about *Closed Captions* is listed at **//Reel/AssetList/ClosedCaption**[^1]

    <AssetList>
      …
      <cc-cpl:ClosedCaption xmlns:cc-cpl="http://www.smpte-ra.org/schemas/429-12/2008/TT">
        …
      </cc-cpl:ClosedCaption>
      …
    </AssetList>

Information about *Open Captions* is listed at **//Reel/AssetList/MainSubtitle**[^2]

    <AssetList>
      …
      <MainSubtitle>
        …
      <MainSubtitle>
      …
    </AssetList>

Both `ClosedCaption` and `MainSubtitle` are an extension of the CPL TrackFileAssetType, which contains several sub-elements (some optional, some mandatory) not described here. See the standards for details.

[^1]: *Captions are described in SMPTE ST 429-12.*

[^2]: *`MainSubtitle` is used for open captions due to incompatibility issues in the field, which accomplishes the desired rendered result. As per SMPTE RDD 52, `MainCaption` and `ClosedSubtitle` as defined in SMPTE ST 429-7 shall not be used.*