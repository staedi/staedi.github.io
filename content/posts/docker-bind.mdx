---
title:  "Using Docker with different directory access"
date: 2023-06-30
tag: Development
tags: [docker, bind, volume, python]
description: How to give access to outside directory in Docker
---

## Docker - efficient but isolated

With Docker, one can have an efficient isolated container. In other words, the container does not have all the information in the original configuration, thereby the efficiency. 

This fact comes as the hurdle for many newcomers to Docker as it can't access the directory other than that of the container.

For instance, here is the default `FastAPI` **Dockerfile** (provided by FastAPI).

```docker filename="Dockerfile"
FROM python:3.9
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY . /code
CMD ["uvicorn","main:app","--host","0.0.0.0","--port","5000","--reload"]
```

Then, assuming that this Docker image contains directory `~/dev/fastapi-code`, how can I let Docker to access the following directory, e.g., `~/dev/data`.


## `Bind` to the rescue 

To tackle this issue, one can mount or link physical directory to the Docker. In this way, Docker is now able to access additional directories other than its **WORKDIR**.

According to Docker official documentation, **bind** is what we need. Another option, **volume** is to link DB with a Docker container.

For simplicity, this can be done with `docker-compose.yaml`.

```yaml filename="docker-compose.yaml"
version: "3"
services:
  fastapi-code:
    build: .
    image: fastapi-code
    volumes:
      - type: bind
        source: /home/minpark/dev/data
        target: /opt/dev/data
```

Voilà!

Docker's **bind** enables physical directory to be linked into the container. Thereby, with the target (**virtual**) directory, we can access physical directory.

Here is a Python example to access a data file (assuming the file name is *sample.csv* located in the **data** directory).

```py
import os
import pandas as pd

pd.read_csv('/opt/dev/data/sample.csv')
```