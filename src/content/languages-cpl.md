### Single spoken and single subtitle language example

`EN-FR`
(English Audio with French Subtitles
The first language code (`EN`) represents the audio language. The second language code (`FR`) represents the subtitle language.

The audio language is listed at **//Reel//MainSound[1]/Language**:

    <MainSound>
      …
      <Language>en</Language>
      …
    </MainSound>

The primary subtitle language is listed at **///Reel//MainSubtitle[1]/Language**:

    <MainSubtitle>
      …
      <Language>fr</Language>
      …
    </MainSubtitle>

*AND*, as the first element of **//Reel[1]//CompositionMetadataAsset/MainSubtitleLanguageList**:

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <MainSubtitleLanguageList>fr</MainSubtitleLanguageList>
      …
    </CompositionMetadataAsset>

### Single spoken and two (or more) subtitle languages example

`GSW-FR-IT`
(Swiss German audio with French and Italian subtitles.)
The first language code (`GSW`) represents the audio language. The rest of the language codes (`FR`, `IT`) represents the subtitle languages.

The audio language is listed at **//Reel//MainSound[1]/Language**:

    <MainSound>
      …
      <Language>gsw</Language>
      …
    </MainSound>

The primary subtitle language is listed at **///Reel//MainSubtitle[1]/Language**:

    <MainSubtitle>
      …
      <Language>fr</Language>
      …
    </MainSubtitle>

*AND* all the languages are listed in order in the element **//Reel[1]//CompositionMetadataAsset/MainSubtitleLanguageList**:

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <MainSubtitleLanguageList>fr it</MainSubtitleLanguageList>
      …
    </CompositionMetadataAsset>