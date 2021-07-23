
If you are already familiar with the Digital Cinema Naming Convention (DCNC), [[Click Here]](general) for general tips and updates.

This site is designed to help everyone involved in Digital Cinema exhibition understand how to use the Digital Cinema Naming Convention when naming (or locating) Digital Cinema Packages.

The information in this site is used to create a text string that describes a particular CPL for a particular version of a movie. (The 5.1 or 7.1 audio version, the French or English version, etc.) This text string is used to populate the `ContentTitleText` of the CPL. Today most servers and theater management systems present this text string to the user and the operator uses this site to decode the ContentTitleText string. This will continue, but some systems will read the CPL Metadata directly to better inform the user of the specifications of a particular version of the movie.

This text string goes lots of other places, too. In addition to the entry of the naming convention in the `ContentTitleText` of the CPL, it must also appear in the `AnnotationText` of the CPL and in the `AnnotationText` of the PKL, as some systems present this data to the user on ingest. ALL these entries should MATCH EXACTLY. If they do not, confusion may result with end users.