Most Digital Cinema Packages contain an entire feature or trailer.  Sometimes, however, a “Supplemental” Digital Cinema Package is sent with an alternate reel, different language, or other features.  This “Supplemental Package” does not usually contain the entire feature; in these cases, both packages are necessary to run the feature as intended.  In order to differentiate package types and the CPLs associated with them, i.e., to know if a package is likely to contain an entire feature or a partial one, a code is added at the tail of the CPL Naming Convention.  There are two codes of this type: 

`OV` = Original Version (OR it may be left blank)

and

`VF` = Version File (“VF” as the package type only if it needs assets from another CPL.)

An `OV`, or “Original Version” package, always contains an entire feature/package.  The `VF` or “Version File” usually contains a partial feature (e.g.: subtitles, alternate language, pickup shots) and must be loaded together with the OV track files in order to play the feature correctly.  An `OV` package shipped by itself always contains its own CPL and track files.  A `VF` package shipped by itself always contains its own CPL, often some alternative track files, and relies on the existing `OV` track files.  A `VF` package is sometimes shipped with its corresponding `OV` package.  In this case, the `OV` package doesn’t need its own CPL because the `VF` CPL determines playout.  (See figure below.)

![OV/VF Illustration](dcnc_ov-vf.jpg "OV/VF Illustration"){#ovvf-illustration .image}

[[enlarge]](dcnc_ov-vf.jpg)
{.text-center}