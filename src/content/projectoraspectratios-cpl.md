The Aspect Ratio[^1] is listed at **//Reel//MainPicture[1]/ScreenAspectRatio** or **//Reel//MainStereoscopicPicture[1]/ScreenAspectRatio**[^2] :

    <Reel>
      …
      <MainPicture>
        <ScreenAspectRatio>1998 1080</ScreenAspectRatio>
      </MainPicture>
      …
    </Reel>

The Pixel Array Size of the image container (used for projector setting) is listed at **//Reel[1]//MainPictureStoredArea**[^3]:

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <MainPictureStoredArea>
        <Width>3996</Width>
        <Height>2160</Height>
      </MainPictureStoredArea>
      …
    </CompositionMetadataAsset>

The Pixel Array Size of the content in the DCP (a function of pixel array size and aspect Ratio, used for masking) is listed at **//Reel[1]//MainPictureActiveArea**:

    <CompositionMetadataAsset xmlns=”http://www.smpte-ra.org/schemas/429-16/2014/CPL-Metadata”>
      …
      <MainPictureActiveArea>
        <Width>2872</Width>
        <Height>2160</Height>
      </MainPictureActiveArea>
      …
    </CompositionMetadataAsset>

[^1]: *These values assume a SMPTE CPL. For IOP CPLs, the values for this element are the calulated aspect in a ratio over 0, rounded to the next hundredth, without the decimal, such as `185 0`*

[^2]: *2D content uses the `MainPicture` element; 3D content uses the `MainStereoscopicPicture` element (and they are placed at different locations within the Reel.*

[^3]: *The CPL doesn’t have an explicit indicator of 2K or 4K content; it can be inferred from the dimensions recorded in `MainPictureStoredArea`.*