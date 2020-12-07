
If you are already familiar with the Digital Cinema Naming Convention (DCNC), [[Click Here]](general.html) for general tips and updates.

This site is designed to help everyone involved in Digital Cinema exhibition understand how to use the Digital Cinema Naming Convention when naming (or locating) Digital Cinema Packages.

The information in this site is used to create a text string that describes a particular CPL for a particular version of a movie. (The 5.1 or 7.1 audio version, the French or English version, etc.) This text string is used to populate the `ContentTitleText` of the CPL. Today most servers and theater management systems present this text string to the user and the operator uses this site to decode the ContentTitleText string. This will continue, but some systems will read the CPL Metadata directly to better inform the user of the specifications of a particular version of the movie.

This text string goes lots of other places, too. In addition to the entry of the naming convention in the `ContentTitleText` of the CPL, it must also appear in the `AnnotationText` of the CPL and in the `AnnotationText` of the PKL, as some systems present this data to the user on ingest. ALL these entries should MATCH EXACTLY. If they do not, confusion may result with end users.

There MUST be an entry in EVERY field. Some systems count the number of underscores to parse the information (NOT RECOMMENDED – BUT it’s done). If you have a non-relevent field, fill it with the letters `NULL` or see the field's details page for more info.

We are transitioning to the use of SMPTE Standard CPL Metadata ([SMPTE ST 429-16](https://doi.org/10.5594/SMPTE.ST429-16.2014)) instead of reliance on this naming convention. All items that are included in this naming convention must also be included in the CPL Metadata. CPL Metadata is being populated in distributed movies as of Jan 2018. In fact, more details are included in the CPL Metadata than are included in the naming convention AND it’s machine readable and actionable. This website contains information for both the naming convention and CPL Metadata.

The Digital Cinema Naming Convention is evolving with the addition of new terms and modifications to existing terms. ISDCF is the arbiter of modifications to the convention. In general, requests are made to <digitalcinemanaming@isdcf.com> and are reviewed at the next ISDCF meeting. No significant modification is made without discussion at ISDCF. The official version is always this on-line version.

URIs and Universal Labels that are found in Digital Cinema Packages in general, and in CPL Metadata in particular, but are not otherwise specified by SMPTE engineering are described at <https://isdcf.com/register/>

Do you want to SEARCH the site? Use [Google Search](https://www.google.com/) `site:http://isdcf.com/dcnc/: (search term)`.