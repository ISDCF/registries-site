The Content Type is listed at **//ContentKind**:

    <CompositionPlaylist xmlns=”http://www.smpte-ra.org/schemas/429-7/2006/CPL”>
      …
      <ContentKind>feature</ContentKind>
      …
    <CompositionPlaylist>

+_NOTE_: As specified at SMPTE ST 429-7, 6.8, the `scope` attribute of the `ContentKind` element is present and set to the value specified in the _ContentKind Scope_ column of the register, _unless_ the _ContentKind Scope_ is equal to `http://www.smpte-ra.org/schemas/429-7/2006/CPL`, in which case  the `scope` attribute can be omitted.
