---
title:  "Mapshaper"
date: 2020-09-12
tag: Data Visualization
tags: [mapshaper, geojson, shp, json]
description: How to use Mapshaper for geomap conversions
---

>
Before begin: 
The `mapshaper` tool being introduced here is also available on `R` as `rmapshaper` or `mapshaper` in `js`.


In the world of geographic visualizations, one of the oldest file formats still control the large shares of all, namely, `.shp`. Many sites which provide geographic files offer at least including this format, and none of else are supported in `Python`. However, despite its dominance, this format is binary, meaning that modifications isn't straightforward. As well as this format indeed accompanies supporting files. (*.cpg, .dbf, .prj, .shx*)

Due to these characteristics, importing these files are done with special libraries. In `Python`, prominently, [geopandas](https://geopandas.readthedocs.io) modules. For many users who are using conda for python packages managements, the first step to `geopandas` has never been easy. Most likely, they have to create a new virtual environment to install the module, unless they downgrade the conda version to earlier ones.
Also, those characteristics make not every mapping tools to allow this file format, including my latest favorite, [Pydeck](https://deckgl.readthedocs.io). Indeed, `Pydeck` ~~only~~ allows `geojson` file format, which is indeed a structured `json` format, which is dedicated to geographic purposes.

> Updates:
`Pydeck` also allows geopandas by `GeoJsonLayer` (See the gallery section of [Geopandas Integration](https://deckgl.readthedocs.io/en/latest/gallery/geopandas_integration.html).)

Hopefully, there are handful of resources to convert `.shp` format to `geojson` (the file extension can be either `.geojson` or `.json`), including the very website I'm gonna introduce, [mapshaper.org](https://mapshaper.org)

As can be seen from the below screenshot, interface is quite straightforward.

* Import by *selecting* or *dragging and dropping* files
* Export with the desired file formats

![](https://github.com/staedi/staedi.github.io/raw/main/images/mapshaper.png)

With this tool, you can proceed with modifications to serve your own purposes. For instance, extracting certain regions from the whole file or converting *MultiPolygon* to *Single Polygon*, last but not least, reducing file sizes by **dissolving** and **simplifying**. In fact, the last ones are important for faster map loadings, especially for web uses.
