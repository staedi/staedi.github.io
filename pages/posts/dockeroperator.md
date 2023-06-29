---
title:  "Using Docker within Airflow (DockerOperator)"
date: 2023-06-29
tag: Development
tags: [docker, airflow, dockeroperator]
description: How to execute command within Docker image in Airflow
---

## Docker - efficient but isolated

As I mentioned in the [previous article](docker-bind), **Docker** has a clear advantage over others as being an efficient virtual container. It's known to be much lighter than virtual machines while more dynamic than `conda` environment (we don't usually update every package in conda env).

So, a question arises. Can we use **Docker** in `Airflow`?


## DockerOperator

Short answer is why the hell not?
Among other Operators, Airflow provides `DockerOperator`, which creates a Docker container based on *pre-built image* and executes a command within that container.

The only caveat is the image should exist beforehand. This **doesn't** support create Docker image dynamically.


## How to use?

Before diving into its usage, here are the `Dockerfile` and `docker-compose.yaml` we'll indirectly use.

```docker filename="Dockerfile"
FROM python:3.9
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY . /code
RUN ["python","-m","spacy","download","en_core_web_md"]
```

```yaml filename="docker-compose.yaml"
version: "3"
services:
  fastapi-code:
    build: .
    image: bert-topic
    volumes:
      - type: bind
        source: /home/minpark/dev/bert-topic
        target: /opt/dev/bert-topic
```

As I explained in the last section, `DockerOperator` uses a pre-built **Docker image** to creates a container. In other words, unfortunately, we can't use `docker-compose.yaml` here. 

However, it can instruct how to construct a container, just not by the existing `docker-compose.yaml`.

Clearly, `DockerOperator` has so many options, most of which I don't use. Refer to the [official documentation](https://airflow.apache.org/docs/apache-airflow-providers-docker/stable/_api/airflow/providers/docker/operators/docker/index.html) if you're interested.

Here, I'll just give an example of `DockerOperator` just to make use of the previous `docker-compose.yaml` as follows.

```py
from airflow import DAG
from airflow.decorators import task
from airflow.operators.bash import BashOperator
from airflow.providers.docker.operators.docker import DockerOperator

from datetime import datetime, date
from dateutil import tz
from docker.types import Mount

bash_str = f"python run_analyzer.py"

with DAG(
    dag_id="bertopic_keybert-airflow",
    start_date=datetime(2023,6,28,tzinfo=tz.gettz('Asia/Seoul')),
    schedule="5 17 * * 1-5") as dag:

    bertopic_docker = DockerOperator(
        task_id="bertopic_docker",
        image="bert-topic",
        api_version="auto",
        auto_remove=True,
        mount_tmp_dir=False,
        mounts=[
            Mount(source='/home/minpark/dev/bert-topic',
                  target='/opt/dev/bert-topic',
                  type='bind'),
        ],
        command=bash_str,
        network_mode="bridge")

bertopic_docker
```

Before moving on to parameter explanations, I'd like to point out the import statement of `DockerOperator`. 

```py
from airflow.providers.docker.operators.docker import DockerOperator
```

If you googled or stackoverflowed, you might find it different from what you found on the net as follows.

```py
from airflow.operators.docker_operator import DockerOperator
```

> Why the difference?
This version was in version 1.x. Airflow revamped its operators and third party operators have been moved to `airflow.providers` module.


## Selected parameters

Among all the `DockerOperator` parameters, there are a few we need to pay attention to. Namely, *image*, *mount_tmp_dir*, *mounts* and *command*.

Before start, *task_id* parameter is the Airflow **Task ID**.

### image

This is the Docker image name. Either a local image built already or one that is on the Docker Hub might be used.

### mount_tmp_dir and mounts

Comparing **volumes** section in `docker-compose.yaml` and the DAG definition here, it's easy to see that mounts is what we need to define volumes or **bind** for that matter. 

The only thing worth mentioning is that mounts contains types of **Docker Mount** (see `from docker.types import Mount`).

Also, `mount_tmp_dir` is set to **False** in many various scenarios including the case when we use volumes (or **bind**). Even when we don't use volumes, Docker might fail to create a tmp dir.

### command

This is the command we'll execute within the freshly created Docker container within Airflow.