---
title:  "COVID-19 Infections & Vaccinations Dashboard"
date: 2021-06-20
tag: Project
tags: [python, pydeck, altair, streamlit, choropleth, vaccinations, infections, heatmap, barplot]
description: A revised COVID-19 visualization project using Streamlit and Pydeck (vaccinations added)
---

It's more than one year since the pandemic ravaged the globe and impacted how we live and work. Fortunately, a growing number of countries are rushing to get their people vaccinated. This means that now is the time for me to update my previous proud work of [COVID-19 Dashboard](https://staedi.github.io/posts/covid19dashboard).


## Motivation

Like when news outlets were starting to publish daily updates on COVID-19 infections, a similar degree of media have been reporting updates on global vaccinations. 

However, unlike COVID-19 infections data, global vaccinations data with the same degree of granularity is hard to come by. In other words, less countries are reporting province/state-level data and some do less often.

Fortuantely for me, Johns Hopkins University GoVex GitHub (https://github.com/govex/COVID-19) provides global dataset. In fact, this is neither the only destination one can find about global distribution of vaccines nor the most famous ones. Rather, [Our World In Data (OWID)](https://github.com/owid/covid-19-data) is the primary source for many and [Bloomberg Graphics](https://github.com/BloombergGraphics/covid-vaccine-tracker-data) also provides one.

By comparing these dataset, I concluded that *Johns Hopkins University GitHub* is the place to start as I did with infections dashboard building. While it provides less granular data, it at least does more than other sites.


## Newer developments

### Additional data sources
With fewer countries with granular dataset (province/state-level), I set out to widen data sources. In addition to South Korea, I expanded gather data of these countries' dataset separately.

* Australia: [COVID Live](http://covidlive.com.au/)
* Canada: [COVID-19 Tracking Project](http://api.covid19tracker.ca)
* United Kingdom: [Public Health England](https://coronavirus.data.gov.uk/details/vaccinations)

### Per-population figures
In infections tracking, daily changes were enough for the purpose. While per-population or percentage were used, it wasn't used as often as raw figures. 

However, in vaccinations, the focus is quite different. While we track daily changes as well, we are more concerned with how much of the poulation has been vaccinated as vaccinating 75% of the population is often thought of threshold for reaching herd immunity. 

Therefore, for vaccination data, I shifted the representation of data for per-100K population.

### Country-level barplot
As mentioned before, less countries are repoting province/state-level vaccination data. If I restrict selection of countries to ones which have province/state-level vaccination data, the choice would be much narrower. 

Therefore, to keep the number of choices of countries the same, I chose to employ barplot when vaccination data is not available in province/state-level.

In addition, to keep the number of charts smaller, I stacked vaccination data in one *stacked barplot*, specifically **administed** vaccines doses on top of **fully vaccinated** people.


## Snapshots

### Main Landing Page (Summary)
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/main_v2.png)

### Heatmap (Vaccinations)
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/heatmap_vaccinations.png)

### Stacked barplot (Country-level vaccinations-only)
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/stackedbar_vaccinations.png)

### Choropleth (Vaccinations)
![](https://github.com/staedi/Streamlit_nCov19/raw/master/samples/choropleth_vaccinations.png)