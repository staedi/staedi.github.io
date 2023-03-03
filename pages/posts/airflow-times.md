---
title:  "Time concepts in Airflow"
date: 2022-12-05
tag: Development
tags: [airflow, datainterval, runafter]
description: A simple introduction of confusing time concepts in Airflow
---

In the last [post]({% post_url 2022-11-17-airflow-docker %}), I showed how to use [Airflow](https://airflow.apache.org) in Windows OS with [Docker](https://docker.com).

So, you're ready to dive into the world of **Airflow**. Basically, it provides you a way to better manage schedules (enabling more sophisticated scheduling than `crontab`). 

Caveat is, it does its job well, as long as you understand how it processes the time. Even before considering complex schedules, one thing that discourages wanna-be user is its concept of time.

In fact, from the start, users have been quite confused with its concept of time, who just wishes set up the scheduling.

## Essential dates in Airflow

Although there are several concepts in **Airflow**, two concepts, confusing, are the most important to know. Namely, `DataInterval` and `run_after`.


### DataInterval

Throughout the whole **Airflow** system, `DataInterval` is the time concept mentioned the most (and confusing). As name implies, it's not just a single date or time. Rather it is composed of two time (`startdate` and `enddate`). 

Hearing the term `startdate`, you might think that it's the time when your schedule starts working (on your machine).

Unfortunately not. It's the start of data gathering. What the heck?
Theoretically, as **Airflow** is best used for ETL processes, this concept fits that purpose. In other words, `DataInterval` means the range of data the run should cover.

However, I'm not so sure that it really matters in reality. For instance, if I run the web scraping script along with DataInterval from yesterday, does that ignore the scraping dated earlier than `startdate`? I don't think so. 

Therefore, this was the most tricky concept for me.


### run_after

If you're like me, this is the concept that you might be the most interested in. It's the time when the run starts (period). While it's the concept I only care about, the confusing concept `DataInterval` is closely related with this.

The time of `run_after` is the same of the `enddate` of `DataInterval`. 

I'm not sure if I can set `run_after` later than `enddate` of `DataInterval`, so I'm just sticking to the standard (`end_date` = `run_after`).

If you understand the concept of `DataInterval`, the way `run_after` is set as the same of the `enddate` of `DataInterval` makes sense. 

The time range we like to gather data has passed, so we now start the process.


### Let's summarize

To sum up, these concepts can be drawn as follows.

![](https://github.com/staedi/staedi.github.io/raw/main/images/airflow_time.png)

Extending these concepts, when you see `last_start`, `last_end` or `next_start`, `next_end`, be mindful that all of these are part of `DataInterval`.

Specifically, `next_end` == `run_after` and `last_end` == `next_start`

These concepts are crucial if you plan to customize the schedule using `timetable`. 

Be sure to have concrete understanding of them before diving.