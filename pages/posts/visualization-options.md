---
title:  "Searching for a Data Visualization library (feat. BERTopic and Next.js)"
date: 2023-03-26
tag: Data Visualization
tags: [next.js, react.js, chart.js, d3.js, nivo, potion.js, visx, bertopic]
description: My ongoing journey to find a Data Visualization library
---

## BERTopic and Data Visualization

From the work, I use `BERTopic` to extract topic summary from a list of news texts. This is a good tool to start with, but along with any other AI techniques, `BERTopic` is far from perfect without any tweaks. 

For the past weeks, I have been exploring various options in `BERTopic` (*hierarchies*, *representations*) to get a better summary of topics.

Among them, **Hierarchy Visualization** is the area I've been focusing on. In `BERTopic`, there is a function `visuzalize_hierarchy()` which makes a hierarchical dendrogram of topics using `Plot.ly`.

However, it doesn't give a satisfactory visualization in terms of flexibility (e.g., no *collapsible tree*, *circle pack*).


## High-level (easy-to-use) libraries

### [Chart.js](https://chartjs.org) - Easy to use and visually compelling

![Chart.js](/images/chartjs.png) [^1]

I've always wanted to learn this popular `Javascript` charting library barring `D3.js` since I got to know the existence of this library.

The styling of charts made with `Chart.js` is so compelling to lead me to test out despite its lack of chart varieties. Besides, it is well applicable to `React.js` with [react-chartjs-2](http://react-chartjs-2.js.org/).

Unfortunately, this very fact forced me to look for other options.


### [Nivo](https://nivo.rocks) - Easy to use with a large library of chart options

![Nivo](/images/nivo.png)

Another great option is **Nivo**. It's ***almost*** perfect except its styling was little bit at odds with me.

For a library with its abstration, `Nivo` provides a bunch of charting options, even **Tree** or **Circle Pack**, which are not available with most libraries.

Another caveat is the lack of inherent support of a combined chart (e.g., line chart on top of bar chart). However, it now supports **layers** which enable users to combined different types of charts.


## Low-level (more flexible) libraries

### [D3.js](https://d3js.org) - Most comprehensive

![D3.js](/images/d3.png) [^2]

In terms of flexibility, no other chart libraries can beat `D3.js`. It is notoriously difficult to master (like `React.js`?) even to get started (unlike `React.js`).

However, once you get to know the basics, limitless potential is upon you. On [Observable](https://observablehq.com), there are numerous visualization notebooks utilizing `D3.js` (obviously given that `D3.js` hosting its tutorials and examples on this platform).

While it is not the only tool, many of complicated- or cool-looking visualizations have been made with `D3.js`. For Data Visualizations in journalisms were made possible with this.

As `D3.js`'s expressive grammar doesn't go well with the component-centric principle of`React.js`, many `D3.js` chart made even in `React.js` do not look like `React.js` code.

Many of codes are presented in **Observable notebooks** only complicate the matter (think of **Jupyter notebook** and `MLops`).


### [Potion.js](https://potion.js) - Discontinued(?) low-level abstraction

It is one of options which provides low-level interface on top of `D3.js`, rather than **high-level wrappers** such as `Chart.js`. Nevertheless, it claims to work well with `React.js`.

While it might not simplify the visualization process dramatically, its great integration with `React.js` would make the job easier than raw `D3.js`.

The only caveat was the end of maintenance. From its GitHub [repository](https://github.com/finnfiddle/potion), the last update was in **2018**. Given the continous update of `D3.js`. 

With its major version update, the syntax of `D3.js` is often overhauled that makes codes written in previous versions do not anymore.


### [Visx](http://airbnb.io/visx/) - My choice

![Visx](/images/visx.png)

Similar to `Potion.js`, this low-level interface on top of `D3.js` perfectly compatible with `React.js`.

This library was made by **Airbnb** and is maintained actively. As I trust `Airflow` (another module made by **Airbnb**), I have nothing but confidence on this library.

Its low-level interface does not make my life drastically easier, it has flexibility however.


I found these two latter libraries on the day of this writing, and am fully intend to test out `Visx` pretty soon. While I prefer the overall styling of `Potion.js`, I am afraid that its syntax might be out of sync with latest version of `D3.js`.

[^1]: [By Chrispoth Pahmeyer on Observable](https://observablehq.com/@chrispahm/charts)
[^2]: [D3 Gallery on Observable](https://observablehq.com/@d3/gallery)