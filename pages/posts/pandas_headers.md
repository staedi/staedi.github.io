---
title:  "Using request header in pandas.read_csv() for remote access"
date: 2022-12-17
tag: Development
tags: [pandas, python, read_csv, header, useragent]
description: An instruction on using pandas.read_csv() to access files remotely
---

For Python developers or analysts, it is well known that we can use `pandas` to access files remotely (i.e., GitHub). 

But, one thing which not everyone knows is that we can use it with some custom request header as we access with `requests` library.


## Why?

It may not be clear for someone who only tries to access files from GitHub, which doesn't require the developer to set **request header**.

But, many sites restrict the access without any **header**, especially with the **User-Agent** property.


## How?

We are so aware to read a CSV file using `pandas` like the following.

```py
import pandas as pd

data = pd.read_csv('https://website.com/file.csv')
```

So, what needs to be done to supply **request header**, then?
The `storage_options` comes to the rescue (added in `pandas` **1.3.0**).

You can pass the **header** value with this new parameter.

```py
import pandas as pd

headers = {'User-Agent':'Some browser info'}
data = pd.read_csv('https://website.com/file.csv', storage_options=headers)
```

With this, you can access **publicly** available remote CSV file with `pandas`. However, it cannot be used to access files in **private** `GitHub` repository cannot be accessed (It's more complicated and an article about the topic will be posted later).