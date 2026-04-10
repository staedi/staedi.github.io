---
title:  "Getting HTML inside JSON in Scrapy"
date: 2023-02-04
tag: NLP
tags: [scrapy, selector, json, html]
description: An instruction on extracting HTML tags inside a JSON structure with Scrapy
---


Scraping HTML xor JSON page with `Scrapy` (or `Request` and/or `BeautifulSoup4` for that matter) is rather straight-forward.

```py
## JSON
response_json = response.json()
```

```py
## HTML
## Subsequent manipulation is done with xpath
response_html = response
```

Then, how about HTML inside a JSON document?


## `Selector()` to the rescue

Let's say a scraped JSON document has a section named **html** which includes HTML tags. How to scrape it and make the HTML tags manipulated with `xpath`?

**Scrapy**'s `Selector()` is to be used upon that JSON object.

```py
import scrapy
response_json = response.json()
response_json['html'] = scrapy.Selector(text=response_json['html'],type='html')
```

Here, when using `Selector()`, be sure to assign with `text=`. Unless, error might occur while ***type*** assignment is optional.