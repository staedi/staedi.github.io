---
title:  "Setting charset in FastAPI Response"
date: 2023-02-03
tag: Development
tags: [fastapi, encoding, utf-8, response, charset]
description: An instruction on how to set charset correctly in FastAPI for non-western characters
---

## FastAPI

Recently, I've been using `FastAPI` package to try out REST API. As its name implies, `FastAPI` is one of the most popular and a go-to package among Python developers to create APIs.


## Encodings

As it happens, for non-Western languages (or all but English?), the original characters are shown as weird for encoding issues.

Recall **encoding** option in ***pandas***'s `read_csv()` or **charset** in HTTP Response? 

With default setting, this is how non-Western languages are displayed.

```
[{"region": "KR", "symbol": "005930", "name": "ì‚¼ì„±ì „ìž", "valid": "OK"}]
```

The original data was supposed to be like this.

```
[{"region": "KR", "symbol": "005930", "name": "삼성전자", "valid": "OK"}]
```


## Default operation

By default, `FastAPI` parses the Python **dict** data structure into **JSON** ouput.

In that way, it cannot display the output in **UTF-8** charset.

```py
from fastapi import FastAPI
import pandas as pd
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Front API
@app.get('/')
async def welcome():
    return {'msg':f'Welcome to {title}'}

# Sample ticker
@app.get('/tickers/')
async def tickers():
    sample_data = pd.DataFrame([{"region": "KR", "symbol": "005930", "name": "삼성전자", "valid": "OK"}])
    content = sample_data.to_dict('records')
    return content
```


## `Response()` to the rescue

To enable custom charset of the **HTTP Response**, `Response()` function from **FastAPI** can be used along with `json.dumps()`.

To make an HTTP output, original Python data structure (e.g., ***dict***) should be first converted into **str** by `json.dumps()` (with **ensure_ascii=False**) and then it is transmitted with **FastAPI**'s `Response()` function.

Here, **encoding charset** option can be added in the **media_type** input param of `Response()` function.

Specifically, 

```py
sample_dict = {'결과':'정상'}
output = json.dumps(sample_dict,ensure_ascii=False)
return Response(content=output,media_type='application/json;charset=utf-8')
```

Here, to display the non-Western characters correctly, I added the conversion of Python dict to str and `Response()` function to return the result rather than directly returning the dict.


If we back to the original sample, it can be rewritten as this.


```py
from fastapi import FastAPI, Response
import pandas as pd
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# On startup
@app.on_event('startup')
async def startup_event():
    global content_type
    content_type = f'application/json;charset=utf-8'

# Front API
@app.get('/')
async def welcome():
    content_dict = {'msg':f'Welcome to {title}'}
    content = json.dumps(content_dict,ensure_ascii=False)
    return Response(content=content, media_type=content_type)

# Sample ticker
@app.get('/tickers/')
async def tickers():
    sample_data = pd.DataFrame([{"region": "KR", "symbol": "005930", "name": "삼성전자", "valid": "OK"}])
    content_dict = sample_data.to_dict('records')
    content = json.dumps(content_dict,ensure_ascii=False)
    return Response(content=content, media_type=content_type)
```

Unlike in the original code, I added `@app.on_event('startup')` to add global variable **content_type** which is being used for every API call functions.