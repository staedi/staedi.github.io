---
layout: post
title:  "Visualization of Covid-19 Situation Awareness"
categories: [works]
tags: [python, pydeck, altair, streamlit]
---

It's already been more than 6 months since Covid-19 upended the global community. While it's frustrating reality to live in, it also opened doors to many people out of epidemiologies to hone their data analysis and visualization skills, including myself.

## Motivation

Like many others, I, initially was content with the *Johns Hopkins University*'s prominent [Covid-19 Dashboard](https://coronavirus.jhu.edu/map.html). It was a go-to place for everyone to get to know up-to-date global statistics of the pandemics.

However, I began to sense that the visualization was somewhat not to my taste as the scatter sizes was exploding with the multiple clusters developments worldwide.

After a bit of research, I found out Choropleth would be a solution and set out to do it myself, but not in Dashboard fashion.


## Development history (From Tableau to Streamlit, Web-based Dashboard)

### Tableau
Initially, my tool of choice was `Tableau`, as I learned it during my last semester. It turned out, unfortanately, my academic license already expired as it only lasted for one year.

### Python (geopandas)
So, I turned to `Python`, which was my favorite progamming language so far, and found out I could mimic by using package called [geopandas](https://geopandas.readthedocs.io/en/latest/).
After a quite bit of time tinkering and trial-and-error with GIS shapefiles and charting, I could make it happen. 
In fact, even installing the package in `conda` environment was quite a hassle. As I didn't want to make a new virtual environment, I had to downgrade `conda` environment after quite a bit of research.

### R (ggplot2, leaflet)
But, One day, I stumbled upon how visually appealing charts made by `ggplot2` in `R`. I was quite shocked that I could make charts so beautiful which I couldn't do with `seaborn` or `matplotlib` in `Python`.

After completing a specialization in [Coursera](https://coursera.org), I began converting the previous works into `R`, adding more visual elements, namely, `Heatmap` and `Interactive Choropleth` powered by `Leaflet` library.
With this transformation, the focus somewhat shifted from `Choropleth` itself to `Heatmap`, which `ggplot2` excelled at aesthetically.

### Streamlit (pydeck, altair)
Finally, I shifted again into Web dashboard. 

My initial thought leaned toward [Dash](https://dash.plotly.com), because that was the only tool I had known until then. 
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
