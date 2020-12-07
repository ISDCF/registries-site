### Page Info Key

    /* list the available pages (note - order here determines order for page menu):

      "pageType": "menuBreak", "descriptiveText", or "registryTable"
      "pageTemplate": "lowercase" / plural for registries or lists
      "idType": "lowercase" / not needed for "descriptiveText" or "registryTable"
      "pageTitle": "Proper Case" / Page and menu name
      "schemaBuild": "1.0.0-beta.1" / specific to registry, not needed for "descriptiveText" or "registryTable"
      "menuLevel": 1, 2, or 3 / controls indents in menu
      "sections": [
        "int" Introduction Text - pageTemplate-int
        "ov" Overview (tab) - pageTemplate-ov
        "rls" Rules (tab) - pageTemplate-rls
        "ctt" CTT Example (tab) - pageTemplate-ctt
        "cpl" CPL Usage (tab) - pageTemplate-cpl
        "spn" Special Note - pageTemplate-spn
        "lst" List - pageTemplate-ls
        "toc" Table of Content - pageTemplate-toc
      ] / all non "menuBreak" pages must have at least one section

    */

---

# D-Cinema Naming Convention and Metadata Registry

Introduction [done]

Tabs
* Overview [done]
  * The Problem
  * The Solution

Special Notes [done]

  ---

## DCNC

### General Tips

Tabs
* Overview [done]
  * Rules [done]
* CTT Example
  * List of sample CTTs
* CPL Usage [done]


pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "general",
      "pageTitle": "General Tips",
      "menuLevel": 3,
      "breadCrumb": [
        "DCNC"
      ]
    }

### Illustrated Guide

Tabs
* Overview
  * DCNC Image [Pierre working on]
    * Link to App # based on section
    * Link to PDF

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "illustratedguide",
      "pageTitle": "Illustrated Guide",
      "menuLevel": 3,
      "breadCrumb": [
        "DCNC"
      ]
    }

  ---

## CPL Metadata

### Conventions

Tabs
* Overview
* CPL Usage
  * Sample CPL with all metadata filled out

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "conventions",
      "pageTitle": "Conventions",
      "menuLevel": 3,
      "breadCrumb": [
        "CPL Metadata"
      ]
    }

---

## Details (Section)

### Content Type

Tabs
* Overview
* CTT Example
* CPL Usage

Table [done]

pageinfo: 

    {
      "pageType": "registryTable",
      "pageTemplate": "contenttypes",
      "idType": "contenttype",
      "pageTitle": "Content Types",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Content Modifier

Tabs
* Overview
* CTT Example

Table (CPL Usage in table) [done]

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "contentmodifiers",
      "idType": "contentmodifier",
      "pageTitle": "Content Modifiers",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Labeling 3D Product

Tabs
* Overview
  * Rules
* 3D Glasses Cards
  * Examples

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "labeling3dproduct",
      "pageTitle": "Labeling 3D Product",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Labeling "Combo" Trailers

Tabs
* Overview
  * Examples

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "labelingcombotrailers",
      "pageTitle": "Labeling 'Combo' Trailers",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Projector Aspect Ratios

Tabs
* Overview
  * Notes
* CTT Example
* CPL Usage

Special Notes

Table

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "projectoraspectratios",
      "idType": "projectoraspectratio",
      "pageTitle": "Projector Aspect Ratios",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Language Codes

Tabs 
* Overview [done]
* CTT Example
* CPL Usage
* CPL Usage
  * (Multiple Sub Lanugage)

Special Note [done]

Table [done]

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "languages",
      "idType": "language",
      "pageTitle": "Language Codes",
      "schemaBuild": "1.0.0-beta.2",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Open and Closed Captions

Tabs 
* Overview
* CTT Example
* CPL Usage

Special Note

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "openandclosedcaptions",
      "pageTitle": "Open and Closed Captions",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Territory and Rating Introduction

Tabs
* Overview

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "territoryandratingintro",
      "pageTitle": "Territory and Rating Introduction",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Territory Codes

Tabs
* Overview
* CTT Example
* CPL Usage

Special Note

Table [done]

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "territories",
      "idType": "territory",
      "pageTitle": "Territory Codes",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

###  Ratings

Tabs
* Overview
* CTT Example
* CPL Usage

Special Note

Table [done]

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "ratings",
      "idType": "rating",
      "pageTitle": "Ratings",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Audio Config and Narrative Description Tracks

Tabs
* Overview
* CTT Example
* CPL Usage

Special Note

Table

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "audioconfigandndtracks",
      "idType": "audioconfigandndtrack",
      "pageTitle": "Audio Config and Narrative Description Tracks",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Studio Codes

Tabs
* Overview
* CTT Example
* CPL Usage

Special Note

Table [done]

pageinfo
  
    {
      "pageType": "registryTable",
      "pageTemplate": "studios",
      "idType": "studio",
      "pageTitle": "Studio Codes",
      "schemaBuild": "1.0.0-beta.2",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Creation Date

Tabs
* Overview
* CTT Example
* CPL Usage

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "creationdate",
      "pageTitle": "Creation Date",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Facility Codes

Tabs
* Overview [done]
* CTT Example 
* CPL Usage [done]

Special Note [done]

Table [done]

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "facilities",
      "idType": "facility",
      "pageTitle": "Facility Codes",
      "schemaBuild": "1.0.0-beta.3",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Standard and Package Types

Tabs
* Overview
  * Standard (SMPTE/IOP)
  * Package Type
* Rules
* CTT Example
* CPL Usage

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "standardandpkgtypes",
      "pageTitle": "Standard and Package Types",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### IMAX

Tabs
* Overview
* CTT Example

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "imax",
      "pageTitle": "IMAX",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### CPL Metadata Extensions

Tabs
* Overview
* CPL Usage

Table

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "cplmetadataexts",
      "idType": "cplmetadataext",
      "pageTitle": "CPL Metadata Extensions",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### KDM Forensic Flags

Tabs
* Overview

Table

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "kdmforensicflags",
      "idType": "kdmforensicflag",
      "pageTitle": "KDM Forensic Flags",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### Private ULs

Tabs
* Overview

Table

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "privateuls",
      "idType": "privateul",
      "pageTitle": "Private ULs",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

### ISDCF ULs

Tabs
* Overview

Table

pageinfo:

    {
      "pageType": "registryTable",
      "pageTemplate": "isdcfuls",
      "idType": "isdcful",
      "pageTitle": "ISDCF ULs",
      "schemaBuild": "1.0.0-beta.1",
      "menuLevel": 3,
      "breadCrumb": [
        "Details"
      ]
    }

---


## References

Tabs
* Overview

List

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "references",
      "pageTitle": "References",
      "menuLevel": 2
    }

## Acknowledgements

Tabs
* Overview

List

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "acknowledgements",
      "pageTitle": "Acknowledgements",
      "menuLevel": 2
    }

## Translations

Tabs
* Overview

List

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "translations",
      "pageTitle": "Translations",
      "menuLevel": 2
    }

## Updates

Tabs
* Overview

List

pageinfo:

    {
      "pageType": "descriptiveText",
      "pageTemplate": "updates",
      "pageTitle": "Updates",
      "menuLevel": 2
    }