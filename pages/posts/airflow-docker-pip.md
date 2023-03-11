---
title:  "Installing Python libraries (pip) in Airflow (Docker)"
date: 2022-11-22
tag: Development
tags: [airflow, docker, pip, python, docker-compose]
description: How to install Python libraries in Docker-deployed Airflow
---

In the last [article](airflow-docker), I introduced to use [Airflow](https://airflow.apache.org) in *Windows OS* with [Docker](https://docker.com).
Although it might work fine for **bash**-based jobs, its ability to handle Python can be (obvisouly) restricted with the availability of libraries. 

Unless otherwise specified, Docker-based Airflow installation doesn't install libraries you might need other than default by Airflow.
Therefore, your go-to operation might not work as a result.

Fortunately, there's a few ways to install libraries (using `pip`). 

## For small number of libraries (docker-compose.yaml)

As outlined in the comment section of the **docker-compose.yaml** file, you can specify libraries you want to install in that file.
From below, modify the last line (`_PIP_ADDITIONAL_REQUIREMENTS`) by replacing **-** to the package you need.

```yaml
version: '3'
x-airflow-common:
  &airflow-common
  # In order to add custom dependencies or upgrade provider packages you can use your extended image.
  # Comment the image line, place your Dockerfile in the directory where you placed the docker-compose.yaml
  # and uncomment the "build" line below, Then run `docker-compose build` to build the images.
  image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.4.3}
  # build: .
  environment:
    &airflow-common-env
    AIRFLOW__CORE__EXECUTOR: CeleryExecutor
    AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    # For backward compatibility, with Airflow <2.3
    AIRFLOW__CORE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__BROKER_URL: redis://:@redis:6379/0
    AIRFLOW__CORE__FERNET_KEY: ''
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
    AIRFLOW__CORE__LOAD_EXAMPLES: 'true'
    AIRFLOW__API__AUTH_BACKENDS: 'airflow.api.auth.backend.basic_auth'
    _PIP_ADDITIONAL_REQUIREMENTS: ${_PIP_ADDITIONAL_REQUIREMENTS:-}
```

For instance, if you need **scikit-learn** library, it can be written as follows.

```yaml
version: '3'
x-airflow-common:
  &airflow-common
  # In order to add custom dependencies or upgrade provider packages you can use your extended image.
  # Comment the image line, place your Dockerfile in the directory where you placed the docker-compose.yaml
  # and uncomment the "build" line below, Then run `docker-compose build` to build the images.
  # image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.4.3}
  build: .
  environment:
    &airflow-common-env
    AIRFLOW__CORE__EXECUTOR: CeleryExecutor
    AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    # For backward compatibility, with Airflow <2.3
    AIRFLOW__CORE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__BROKER_URL: redis://:@redis:6379/0
    AIRFLOW__CORE__FERNET_KEY: ''
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
    AIRFLOW__CORE__LOAD_EXAMPLES: 'true'
    AIRFLOW__API__AUTH_BACKENDS: 'airflow.api.auth.backend.basic_auth'
    _PIP_ADDITIONAL_REQUIREMENTS: ${_PIP_ADDITIONAL_REQUIREMENTS:scikit-learn}
```

## For larger number of libraries (requirements.txt)

As usual, you might be curious if you can make use of **requirements.txt** to install libraries.
Sure it is, but you need an additional file, `Dockerfile` in addition to **requirements.txt** file.

So, you need three files to enable installation of large number of Python libraries, i.e, **requirements.txt, Dockerfile, docker-compose.yaml**.

### Dockerfile

Unless you need to use specific other than the latest version of **Airflow** available, the following specification suffices. 

```
FROM apache/airflow:latest
COPY requirements.txt .
RUN pip install -r requirements.txt
```

### requirements.txt

Be sure to check the compatibility with Python 3.7 as Airflow is based on that version (at least **Docker**-based one). 
Obviously, the following is just my example and you might use yours as long as each library in the specification supports Python version 3.7.

```
spacy==3.4.3
matplotlib==3.5.3
```

### docker-compose.yaml

Finally, we need to specify that we will use **Dockerfile** in the *docker-compose.yaml*.

```yaml
version: '3'
x-airflow-common:
  &airflow-common
  # In order to add custom dependencies or upgrade provider packages you can use your extended image.
  # Comment the image line, place your Dockerfile in the directory where you placed the docker-compose.yaml
  # and uncomment the "build" line below, Then run `docker-compose build` to build the images.
  # image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.4.3}
  build: .
```

In the original **docker-compose.yaml**, it uses the image section to specify which Airflow image to use. However, as we specified it in Dockerfile we comment that line and instead add the last line (`build: .`)


If you modified all three files, be sure to run `docker-compose up --build` to install libraries.
