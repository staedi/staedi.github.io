---
title:  "Using Airflow on Windows"
date: 2022-11-17
tag: Development
tags: [airflow, docker, windows, python]
description: How to use Docker to deploy Airflow on Windows
---


From version 2.3, [Airflow](https://airflow.apache.org) has been available in Apple Silicon. 

Unfortunately, using **Airflow** in Windows operating systems is a different matter as it doesn't natively support the Microsoft's operating system. 

However, it is not entirely true, as I learned that **Airflow** can be used with the [Docker](https://docker.com).
In a word, with `Docker WSL 2` installed (by default), Windows users can use the nix-based commands easily. In other words, **Airflow** commands can be used in **Windows** as well.


Below, assuming that you already installed Docker, I will just show deploy **Airflow** with **Docker** and an example of *Airflow CLIs*. 


## Deploying Airflow with Docker

### Get Ready

According to offical [Airflow website](https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html), you can deploy using `curl` command as below.

```bash
curl -LfO 'https://airflow.apache.org/docs/apache-airflow/2.4.3/docker-compose.yaml'
```

However, in Windows, unfortunately, that command didn't work for me.
And since curl command is downloading a file, you can simply copy the content of the *yaml* file to create one in **Docker** local directory (C:\Users\{user_name}\.docker) with filename `docker-compose.yaml`.


Also, just in case it doesn't work, it is advised to create a file named `.env` with adding the following line.

```
AIRFLOW_UID=50000
```

Now, you can deploy the **Airflow** as below.

* Note: Make you to start **Docker Desktop** before proceeding. Otherwise, docker commands are not recognized. 

### Initializing Airflow

```bash
docker-compose up airflow-init
```

Simple, heh?


### Running Airflow (Webserver)

```bash
docker-compose up
```

First, let's if the process is running.

```bash
(works) C:\Users\minpark\.docker>docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED        STATUS                            PORTS                    NAMES
7f54c4de8703   apache/airflow:2.4.3   "/usr/bin/dumb-init …"   31 hours ago   Up 2 seconds (health: starting)   8080/tcp                 docker-airflow-worker-1
dde3a7124f42   apache/airflow:2.4.3   "/usr/bin/dumb-init …"   31 hours ago   Up 27 seconds (healthy)           8080/tcp                 docker-airflow-scheduler-1
36103c149a6d   apache/airflow:2.4.3   "/usr/bin/dumb-init …"   31 hours ago   Up 27 seconds (healthy)           8080/tcp                 docker-airflow-triggerer-1
d9d8ddb4fd60   apache/airflow:2.4.3   "/usr/bin/dumb-init …"   31 hours ago   Up 27 seconds (healthy)           0.0.0.0:8080->8080/tcp   docker-airflow-webserver-1
3db3f96e4dc9   redis:latest           "docker-entrypoint.s…"   31 hours ago   Up 27 seconds (healthy)           6379/tcp                 docker-redis-1
150e86e38855   postgres:13            "docker-entrypoint.s…"   31 hours ago   Up 28 seconds (healthy)           5432/tcp                 docker-postgres-1
```

Looks good, with this, you can now access Airflow Admin GUI with https://localhost:8080.

![](public/images/airflow.png)

### Airflow CLIs (dags list)

Although you can access Admin GUI with the previous command, executing Airflow CLI commands is a little bit different.
Unlike installing Airflow locally, you cannot just run `airflow dags list` as **Airflow** runs under **Docker**.

To see a list of **dags**, you run the following command using the same **Docker** command.

```bash
docker-compose run airflow-worker airflow dags list
```

As you might have noticed, for the similar Airflow CLI commands, you need `airflow-worker` here.

Below, as you can see, we can use `Airflow CLIs` in **Windows**!

```bash
(works) C:\Users\minpark\.docker>docker-compose run airflow-worker airflow dags list
[+] Running 3/0
 - Container docker-redis-1         Running                                                                        0.0s
 - Container docker-postgres-1      Running                                                                        0.0s
 - Container docker-airflow-init-1  Created                                                                        0.0s
[+] Running 3/3
 - Container docker-redis-1         Healthy                                                                        0.5s
 - Container docker-postgres-1      Healthy                                                                        0.5s
 - Container docker-airflow-init-1  Started                                                                        1.2s

/home/airflow/.local/lib/python3.7/site-packages/airflow/configuration.py:367: FutureWarning: The auth_backends setting in [api] has had airflow.api.auth.backend.session added in the running config, which is needed by the UI. Please update your config before Apache Airflow 3.0.
  FutureWarning,
dag_id                                   | filepath                                                   | owner   | paused
=========================================+============================================================+=========+=======
dataset_consumes_1                       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_datasets.py                            |         |
dataset_consumes_1_and_2                 | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_datasets.py                            |         |
dataset_consumes_1_never_scheduled       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_datasets.py                            |         |
dataset_consumes_unknown_never_scheduled | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_datasets.py                            |         |
dataset_produces_1                       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_datasets.py                            |         |
dataset_produces_2                       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_datasets.py                            |         |
demo                                     | demo.py                                                    | airflow | True
example_bash_operator                    | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_bash_operator.py                       |         |
example_branch_datetime_operator         | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_datetime_operator.py            |         |
example_branch_datetime_operator_2       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_datetime_operator.py            |         |
example_branch_datetime_operator_3       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_datetime_operator.py            |         |
example_branch_dop_operator_v3           | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_python_dop_operator_3.py        |         |
example_branch_labels                    | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_labels.py                       |         |
example_branch_operator                  | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_operator.py                     |         |
example_branch_python_operator_decorator | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_operator_decorator.py           |         |
example_complex                          | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_complex.py                             |         |
example_dag_decorator                    | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_dag_decorator.py                       |         |
example_external_task_marker_child       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_external_task_marker_dag.py            |         |
example_external_task_marker_parent      | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_external_task_marker_dag.py            |         |
example_kubernetes_executor              | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_kubernetes_executor.py                 |         |
example_local_kubernetes_executor        | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_local_kubernetes_executor.py           |         |
example_nested_branch_dag                | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_nested_branch_dag.py                   |         |
example_passing_params_via_test_command  | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_passing_params_via_test_command.py     |         |
example_python_operator                  | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_python_operator.py                     |         |
example_short_circuit_decorator          | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_short_circuit_decorator.py             |         |
example_short_circuit_operator           | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_short_circuit_operator.py              |         |
example_skip_dag                         | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_skip_dag.py                            |         |
example_sla_dag                          | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_sla_dag.py                             |         |
example_subdag_operator                  | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_subdag_operator.py                     |         |
example_subdag_operator.section-1        | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_subdag_operator.py                     |         |
example_subdag_operator.section-2        | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_subdag_operator.py                     |         |
example_task_group                       | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_task_group.py                          |         |
example_task_group_decorator             | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_task_group_decorator.py                |         |
example_time_delta_sensor_async          | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_time_delta_sensor_async.py             |         |
example_trigger_controller_dag           | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_trigger_controller_dag.py              |         |
example_trigger_target_dag               | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_trigger_target_dag.py                  |         |
example_weekday_branch_operator          | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_branch_day_of_week_operator.py         |         |
example_xcom                             | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_xcom.py                                |         |
example_xcom_args                        | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_xcomargs.py                            |         |
example_xcom_args_with_operators         | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_xcomargs.py                            |         |
latest_only                              | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_latest_only.py                         |         |
latest_only_with_trigger                 | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/example_latest_only_with_trigger.py            |         |
tutorial                                 | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/tutorial.py                                    |         |
tutorial_dag                             | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/tutorial_dag.py                                |         |
tutorial_taskflow_api                    | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/tutorial_taskflow_api.py                       |         |
tutorial_taskflow_api_virtualenv         | /home/airflow/.local/lib/python3.7/site-packages/airflow/e | airflow | True
                                         | xample_dags/tutorial_taskflow_api_virtualenv.py            |         |
```
