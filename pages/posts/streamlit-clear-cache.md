---
title:  "Clear cache on Streamlit"
date: 2021-06-19
tag: Development
tags: [python, streamlit]
description: How to clear cache on Streamlit (For older versions)
---

## Streamlit
As I've mentioned several times here in my `GitHub Pages`, [`Streamlit`](https://streamlit.io) is my go-to tool to build an interactive dashboard. Unlike its competitors such as [Plot.ly's `Dash`](https://dash.plotly.com) or [RStudio's `Shiny`](https://shiny.rstudio.com), it doesn't require you to add any boilterplate codes for `CSS`.

## Cache on Streamlit
Evidently, in data analytics, handling data is at the core no matter what your intention is. A lot of time, it involves handling huge size of data and therefore, being able to efficiently deal with it is advantageous for practitioners. That being said, `Streamlit` has feature to preload the data and allows app to run faster. 

## Reset cache
While it's good to have caching data, it often entails problems such as not being able to refresh to up-to-date data. You would have experienced your web brower loaded a web site using cached version not the up-to-date one.

So it's crucial to have a feature to reset data. Unfortunately, as of its current release (0.8.x), a buttton to clear cache on `Streamlit` has been removed.

## So, no luck?
Does that mean we are out of luck to clear data cache at all? Of course not!

The following two lines of codes can reset cache and re-run the app with fresh data.

```py
    st.caching.clear_cache()
    st.experiemental_rerun()
```

Above code assumes `streamlit` module has been loaded as **st** (`import streamlit as st`).
