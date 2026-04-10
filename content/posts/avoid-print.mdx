---
title:  "AVOID PRINT AT ALL COST! (Feat. Airflow)"
date: 2022-12-12
tag: Development
tags: [airflow, logging, print]
description: "It's time to use logging especially for Airflow"
---

It's been about a month since I delved into **Airflow**. Overall, I am satisfied (or overwhelmed) by the vast functionality it opened the door for me.

Having said that, **Airflow** is never an easy solution to begin with. Rather, it requires its users to be equipped with its weird (at least for me) sense of time concept. See my last [post](airflow-times) about that.

Unfortunately, it's not the only hardship at all.


## Logging

Initially, one of the reasons why I switched to **Airflow** was its ability to record all the logs without any hassle.

All the `print()` outputs on the `stdout` are recorded into the **Airflow** without any effort. Looks cool, Huh?

Well, there's a catch. Even bigger if you want the real-time log monitoring.


### No real-time print()

While I type `tail -f attempt=1.log` to monitor a program run with **Airflow**, some outputs are logged in burst rather than in real-time. 

All of them are with **Iterator**. 

**Airflow** recorded the `print()` within an **Iterator** only when the it is completed. It was bugging me as it often involved more than thousands of rows. The famous `tqdm` had the same effect as `print()` in terms of non real-time log fetching.

As the use of `tqdm` was essential for my program (dealing with some thousands of rows), I tested various methods including `yield` command hoping to have the desirable real-time log fetching to no avail.


### logging to the rescue

It turned out that logging was the game changer.

As I replaced `print()` with `logging.info()`, the delayed log fetching went away.

When it comes to `tqdm`, I couldn't find the equivalent way to resolve the issue with the module. 

However, `enlighten` module, albeit tinier functionalities provided, can be used to employ `logging.info()` with the equivalent output as in `tqdm`. 

*This will be posted in a separate post.*


### logging within a program 

For simplicity, one can just use the syntax `logging.info()`.
However, as that log is recorded within the **Airflow** log, this method will complicates the log by added field of *log level*, *log name* in addition to the **core message** to be recorded.

Therefore, I would recommend to include the **message** only.

```py
import logging

logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger()
logger.info('Some message to be logged.')
```

```bash
[2022-12-06T12:32:20.334+0000] {logging_mixin.py:137} INFO - Some message to be logged.
```