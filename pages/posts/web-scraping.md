---
title:  "Simple Guide on Web Scraping"
date: 2021-06-19
tag: NLP
tags: [python, scraping, php, javascript, json, api, beautifulsoup]
description: A few introduction to web scraping
---

## Web Scraping
In many of data analyses practices, the work starts with acquiring data. Unless the data is already available on database or local storage, scraping data from the web is the starting point.

## Basic scraping
If you're like me, you would like web scraping as the way to extract data from `html` outputs. The famous `BeautifulSoup` comes into play for this job along with `requests`, which send HTTP requests to the desired websites.

## Advanced scraping

### Scraping JSON
For many websites, especially ones which employ dymamic pagination or scrolling, it has become common to make use of JSON files which store information you'd like to extract from. Unlike scraping `html` pages, as long as you figure out to retrieve JSON files, the process is much easier as you don't need to use BeautifulSoup to deal with **HTML/CSS tags**.

### Pages with infinite scroll
An increasing number of web pages are equipped with infinite scroll. Good examples are CNBC.com or Yahoo Finance, go-to-sites for financiers. As the scrolling is activated by users' actions, conventional static web scraping doesn't work. In that way, you can only retrieve the initial page. **Selenium** can come to the rescue for these kinds of sites as it enables you to emulate the actions of browers programmatically. ***BUT***, better news is that these sites use JSON to initially store information which will be shown with scrolling.

### Data wrapped in javascript
While not so common, some sites use `javascript` to render data, thereby the data is not revealed in the static **HTML page source**. However, that doesn't mean we can't see the data from the source. As javascript works at client-side, the data is readily available to users while they are embeded inside the script. **Regular Expression** can extract the data for your desirable format.

### Requests with REST APIs
While some sites allow users to access JSON files without any parameters embedded in the **Request**, many big sites require them, either cookies, User-Agent headers, API parameters or POST data parameters. [https://curl.trillworks.com](https://curl.trillworks.com) can help you for access with parameters as cURL includes passed parameter in **HTTP Request**.


## Limitations
Until now, I introduced several techniques which can scrape web sites which are seemingly difficult to be done. So, one might be curious, is web scraping almighty? We can do it for every site? Bad news is it can't. While it has been losing its share, there are still number of web pages made with server-side technologies. Do you remember PHP, ASP or ASPX? These server-side web technologies allow site owners to conceal data in the server and only render data to users. It's almost impossible for you to scrape the sites.