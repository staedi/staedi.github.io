---
title:  "COVID-19 Situation Awareness Dashboard"
date: 2020-10-07
tag: Project
tags: [python, pydeck, altair, streamlit, choropleth]
description: A COVID-19 visualization project using Streamlit and Pydeck
---

It's already been more than 6 months since COVID-19 upended the global community. While it's frustrating reality to live in, it also opened doors to many researchers/developers outside epidemiologies to hone their data analysis and visualization skills, including myself.

## Motivation

Like many others, I, initially was content with the *Johns Hopkins University*'s famous [COVID-19 Dashboard](https://coronavirus.jhu.edu/map.html). It was a go-to place for folks to get to know up-to-date global statistics of the pandemics.

However, I began to sense that the visualization was somewhat not up to my expectation as it used scatter plot for worldwide infection status. Due to the exploding number of global clusters, the scatter couldn't be distinguished from each other, __the inherent drawback of scatterplot__.

After a bit of research, I found out Choropleth would be a solution and set out to do it myself, but not in Dashboard fashion.


## Development history (From Tableau to Streamlit, a Web-based Dashboard)

### Tableau
Initially, my first choice was `Tableau`, as I learned it could be used for geographic programming during my last semester. It turned out, unfortanately, my academic license for the software had already expired as it only covers for one year.

### Python (geopandas)
So, I turned to `Python`, which has been my favorite progamming language so far, and found out I could mimic Tableau by using package called [geopandas](https://geopandas.readthedocs.io/en/latest/).
After a quite bit of time tinkering and trial-and-error with GIS shapefiles and charting, I could make it happen. 
In fact, installing the package in `conda` environment was quite a hassle. As I didn't want to make a new virtual environment, I had to downgrade `conda` environment after quite a bit of research.

### R (ggplot2, leaflet)
One day, I stumbled upon how visually appealing charts could be made by `ggplot2` in `R`. I was quite shocked that I could make charts beautifully which I couldn't do with `seaborn` or `matplotlib` in `Python`.

After completing a specialization in [Coursera](https://coursera.org), I began converting the previous works into `R`, adding more visual elements, namely, `Heatmap` and `Interactive Choropleth` powered by `Leaflet` library.
With this transformation, the focus somewhat shifted from `Choropleth` itself to `Heatmap`, which `ggplot2` excelled at aesthetically.

### Streamlit (pydeck, altair)
Finally, I shifted again into Web dashboard. 

Initially, I leaned toward [Dash](https://dash.plotly.com), because that was the only tool I had heard until then. 
However, I stumbled into [Streamlit](https://streamlit.io), which provides more cleaner, beautiful with less amounts of codes.

The only catch was I should really make a virtual environment as it doesn't allow installation on `conda` and suggest using `pip`. But, the benefits seem overwhelming.
Without any styling definitions, resulting dashboard is sleek and modern-look. 
Aside from the look, it also boasts various graphic packages including `Pydeck`, `Altair` among others.


## Dashboard components

To make good use of web dashboard structure, I divided the window into sidebar and main section.

In the sidebar, the following choices can be made.

* Worldwide or Country-wide: Country selections are confined to only which has state-level dataset (e.g., US, Canada) [**Default**: Worldwide]
* Statistics: Cumulative or Daily changes can be chosen [**Default**: None]
* Drawing map: By default, Choropleth is not drawn as the process can be exhaustive when the checkbox isn't selected.

In the main section, the following information are displayed.

* Summary of selected region: Cumulative and Daily Changes of infections and casualities
* Heatmap of infections and casualties (when options other than **None** is selected)
* Choropleth: Infections and casualties are shown at the same time (*infections*: color depths, *casualties*: elevations)
* Credits


## Underlying tech stacks

To make this dashboard, following relevant sets are used.

* Data acquisition (BeautifulSoup, GitPython): To streamline the process, data acqusition including web scrawling (`BeautifulSoup`) and automatic git commit & push (`GitPython`) are done in [separate repository](https://github.com/staedi/nCov-Summary). [**Note**: Only processed final data file is available]
* geosjon map conversion & simplification (R): `Pydeck` doesn't allow **MultiPolygon** shapefile and larger file delays loading pages. Therefore, preprocessing step was done to convert geojson to smaller *Single* Polygon with smaller filesizes.
* Heatmap (Altair): `Altair` package, the preferred one in `Streamlit`, is used to depict changes of Virus on Heatmap.
* Choropleth (Pydeck): `Pydeck` provides various layers for users to implement, including **PolygonLayer**.


## Snapshots

### Main Landing Page (Summary)
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/main.png)

### Heatmap
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/US.png)

### Choropleth
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/US_map.png)


## Future Developments

While I'm proud of what I could have done by myself, I acknowledge that it's not enough. Possible improvements include the following.

* Timeseries plot: While Heatmap is an elegant way to compare different independent variables, it doesn't show quantitatively.
* Animated Choropleth: Currently, only current map is shown. It would be worthwhile if it can animate over a timeline.
* Ranks in summary: It can be easier to grasp how a region is doing by adding overall rank of the region.
