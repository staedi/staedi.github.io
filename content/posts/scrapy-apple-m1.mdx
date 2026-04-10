---
title:  "Scrapy module on Apple Silicon (M1)-powered Macs"
date: 2022-05-18
tag: NLP
tags: [python, m1, apple, silicon, scrapy, cryptography, openssl, pip, conda]
description: An instruction of how to install Scrapy on Apple Silicon computers
---

## What's `Scrapy`?

If you have crawled or scraped the website to extract information such as stock price or news, you may have heard of `BeautifulSoup` module.

Better yet, if you have tried to crawl a dynamic website, i.e., auto-scrolling function needed, you know `Selenium`.

Finally, if you have digged deeper, you found `Scrapy`. Unlike `BeautifulSoup`, `Scrapy` is more of Framework, with sophisticated tools and classes in it.

For beginner, learning curve it steep as a simple crawling cannot be done in the easy way as with `BeautifulSoup`.

However, it worths every penny as it is powered with essential features such as retrying when the page cannot be retrieved in the first try for some reasons.


## Not on M1 conda (for a time)

However, installing `Scrapy` on M1-powered Mac has been a hassle since the release of this new computer. Due to architecture difference, only  **osx-arm64** or **noarch** labeled modules can be installed.  

There hadn't been a release with those labels on [anaconda](https://anaconda.org) until recently. As far as I know, a few weeks ago, M1-compatible modules have been released on anaconda channel (not conda-forge yet though).

Don't hold your horses yet, even a successful installation doesn't guarantee smooth operation.

You'll see the following error upon running `scrapy shell` command or even after successful launch, `fetch` command inside scrapy would throw an ire.

``` bash
MemoryError: Cannot allocate write+execute memory for ffi.callback(). You might be running on a system that prevents this. For more information, see https://cffi.readthedocs.io/en/latest/using.html#callbacks
```

## Solution 1: Install Python 3.10+ with Homebrew

According to many sources including *reddit*, a workable solution is to install Python 3.10 with homebrew.

```
brew install python
```

After installing Python 3.10, install `Scrapy`.

```
brew install scrapy
```

It works.

But for many **Python** users, this isn't the way they manage the environments.


## Solution 2: Install Python 3.10 with conda

I happened to think that, if the point was to install 3.10 version of Python (according to *reddit*, that version was shipped with newer version of `openssl`, which is essential), couldn't I just install by conda.

```
mamba create -n works python=3.10
```

After creating a new environment with Python 3.10, install `Scrapy` by **pip**.

*Note: Never install by `conda` (or `mamba`), core dependencies including `cryptography` and `openssl` will be downgraded, causing errors when using `Scrapy`.

```
mamba activate works
pip install scrapy
```

## Solution 3: Install 3.9 with conda

For no obvious reason but for the curiosity, I was wondering how earlier version I could install with this method.

What I found was that **3.9** version of Python was fine. (but not **3.8**)

```
mamba create -n works python=3.9
mamba activate works
pip install scrapy
```

Voilà!

``` bash
(base) minpark@Mins-MacBook-Air ~ % mamba activate works
(works) minpark@Mins-MacBook-Air ~ % scrapy shell

2022-05-18 14:27:33 [scrapy.utils.log] INFO: Scrapy 2.6.1 started (bot: scrapybot)
2022-05-18 14:27:33 [scrapy.utils.log] INFO: Versions: lxml 4.8.0.0, libxml2 2.9.4, cssselect 1.1.0, parsel 1.6.0, w3lib 1.22.0, 
Twisted 22.4.0, Python 3.9.12 | packaged by conda-forge | (main, Mar 24 2022, 23:25:14) - [Clang 12.0.1 ], pyOpenSSL 22.0.0 
(OpenSSL 3.0.3 3 May 2022), cryptography 37.0.2, Platform macOS-11.6.5-arm64-arm-64bit
2022-05-18 14:27:33 [scrapy.crawler] INFO: Overridden settings:
{'DUPEFILTER_CLASS': 'scrapy.dupefilters.BaseDupeFilter',
 'LOGSTATS_INTERVAL': 0}
2022-05-18 14:27:33 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.selectreactor.SelectReactor
2022-05-18 14:27:33 [scrapy.extensions.telnet] INFO: Telnet Password: cf6e5a1c7c29bd0c
2022-05-18 14:27:33 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.memusage.MemoryUsage']
2022-05-18 14:27:33 [scrapy.middleware] INFO: Enabled downloader middlewares:
['scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware',
 'scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware',
 'scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware',
 'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware',
 'scrapy.downloadermiddlewares.retry.RetryMiddleware',
 'scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware',
 'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware',
 'scrapy.downloadermiddlewares.redirect.RedirectMiddleware',
 'scrapy.downloadermiddlewares.cookies.CookiesMiddleware',
 'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware',
 'scrapy.downloadermiddlewares.stats.DownloaderStats']
2022-05-18 14:27:33 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2022-05-18 14:27:33 [scrapy.middleware] INFO: Enabled item pipelines:
[]
2022-05-18 14:27:33 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023
2022-05-18 14:27:33 [asyncio] DEBUG: Using selector: KqueueSelector
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x107e9b790>
[s]   item       {}
[s]   settings   <scrapy.settings.Settings object at 0x107e9b070>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects 
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
2022-05-18 14:27:33 [asyncio] DEBUG: Using selector: KqueueSelector

In [1]: fetch('http://apps.cnbc.com/view.asp?symbol=HDB&uid=stocks/summary')
2022-05-18 14:00:23 [scrapy.core.engine] INFO: Spider opened
2022-05-18 14:00:23 [scrapy.downloadermiddlewares.redirect] DEBUG: Redirecting (302) to <GET https://apps.cnbc.com/view.asp?
symbol=HDB&uid=stocks/summary> from <GET http://apps.cnbc.com/view.asp?symbol=HDB&uid=stocks/summary>
2022-05-18 14:00:24 [filelock] DEBUG: Attempting to acquire lock 4508900560 on /Users/minpark/.cache/python-
tldextract/3.9.12.final__works__6613f3__tldextract-3.3.0/publicsuffix.org-
tlds/de84b5ca2167d4c83e38fb162f2e8738.tldextract.json.lock
2022-05-18 14:00:24 [filelock] DEBUG: Lock 4508900560 acquired on /Users/minpark/.cache/python-
tldextract/3.9.12.final__works__6613f3__tldextract-3.3.0/publicsuffix.org-
tlds/de84b5ca2167d4c83e38fb162f2e8738.tldextract.json.lock
2022-05-18 14:00:24 [filelock] DEBUG: Attempting to release lock 4508900560 on /Users/minpark/.cache/python-
tldextract/3.9.12.final__works__6613f3__tldextract-3.3.0/publicsuffix.org-
tlds/de84b5ca2167d4c83e38fb162f2e8738.tldextract.json.lock
2022-05-18 14:00:24 [filelock] DEBUG: Lock 4508900560 released on /Users/minpark/.cache/python-
tldextract/3.9.12.final__works__6613f3__tldextract-3.3.0/publicsuffix.org-
tlds/de84b5ca2167d4c83e38fb162f2e8738.tldextract.json.lock
2022-05-18 14:00:24 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://apps.cnbc.com/view.asp?symbol=HDB&uid=stocks/summary> 
(referer: None)
```

## Notes to install additional modules

For certain packages, installing by `conda` (or `mamba`) downgraded `cryptography` and/or `openssl`. For such packages, use **pip**. (I always try not to use **pip** when the same package is available on anaconda.)

For my specific purpose, `scrapy`, `spacy` and `streamlit` had to be installed as such.
