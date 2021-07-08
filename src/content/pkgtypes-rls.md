There are certain rules that must be applied when labeling OV and VF files.

Every feature version will be numbered in the Content Type field. For example:

     MOVIE-TITLE_FTR-1_F_EN-XX_US-PG_51-EN_2K_ST_20070115_FAC_OV
     MOVIE-TITLE_FTR-2_F_EN-XX_US-PG_51-EN_2K_ST_20070115_FAC_OV

In the example above, notice that Feature Version #1 and Feature Version #2 both have their own OV files. Each OV file contains an entire version of the feature, and will play the feature without any additional files (except for the KDM).

Although there is the original OV file for the first language version of a feature, there can also be additional OV files for Generic International Versions.  These Generic Versions can be either texted or textless, and should be coded in the Territory Field of the Naming Convention as follows:

`INT-TD` = texted
`INT-TL` = textless

For example:

The original English language version for the US might be titled:

     MOVIE-TITLE_FTR-1_F_EN-XX_US-G_51-EN_2K_ST_20070115_FAC_OV

The Generic International Texted version of the feature has its own separate OV. It’s labeled: `INT-TD` in the Territory Field, and `FTR-2` in the Content Type Field:

     MOVIE-TITLE_FTR-2_F_EN-XX_INT-TD_51-EN_2K_ST_20070115_FAC_OV

The Generic International Textless version has its own OV as well.  It’s labeled `INT-TL` in the Territory Field, and `FTR-3` in the Content Type Field:

     MOVIE-TITLE_FTR-3_F_EN-XX_INT-TL_51-EN_2K_ST_20070115_FAC_OV

*Note:* It is extremely important that you differentiate all of the OV files with different version numbers in the Content Type field.

You do not need to create a new OV file, however, for each localized version of a feature.  This can be done using an existing OV file, in concert with a VF or “Version File“.

The DCP of the original US, English language version might be labeled:

    MOVIE-TITLE_FTR-1_F_EN-XX_US-PG_51-EN_2K_ST_20070115_FAC_OV

For the French version, you can create a supplemental package with a version file containing the changes. This might be labeled:

     MOVIE-TITLE_FTR-1_F_FR-XX_FR-AA_51-EN_2K_ST_20070115_FAC_VF-1

The number `1` in `VF-1` indicates that you need the OV file of `FTR-1` (Feature Version #1) in addition to the `VF-1` file in order to play the new version of the feature correctly. Both files played together will create the French version. Note that the feature version number in the Content Type field has not changed.

**Special Notes:**
- The feature version number does not change with simple localization changes so long as you are using Version Files
- If you want to create an OV for a localized version of a feature, you can, but the feature version number in the Content Type field must change.  (You can never have more than one OV for a given feature version.
- If you are making picture or sound changes that apply to multiple locations, you must create a new OV with a new feature version number. 
