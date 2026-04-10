---
title:  "Customizing logging format in Scrapy (Feat. Airflow)"
date: 2022-12-13
tag: Development
tags: [airflow, logging, scrapy]
description: A simple instruction on logging
---

In the last [post](avoid-print), I showed that it's imperative to avoid `print()` in **AirFlow** for real-time log fetching. I also presented a code snippet to change log format for `logging` of **DAGs** within the Airflow.

Even then, I still got somehow strange logging behavior.

```bash
[2022-12-12T12:12:20.314+0000] {subprocess.py:93} INFO - 2022-12-12 12:12:20 [root] INFO: 2022-12-02 000220 2022-12-07 2022-12-11 Yahoo Finance
```

Although I changed the logging format only to include `%(message)s`, it still displayed **log level** and **log name**.


## Why?

After comparing with the logs which ran as expected, I found out that all the logs within `scrapy` DID include these fields.

As I passed the `logging.info()` into `scrapy`, which has its own logging format, it became clear to me that the answer lied in the **scrapy setting**.


## Where?

According to scrapy documentation, there are several logging options available in the `scrapy`.

However, as it did not specifically specify which file to modify and the `setting.py` file, the *No.1 suspect*, did not have the fields specified in the documentation, I got confused.

Luckily though, it turned out that I just needed to insert these fields into the `setting.py` file.

For changing logging format, one just needs to add **LOG_FORMAT** field.
Below is the sample how I inserted into the `setting.py` file not to display **datetime**.

```text
LOG_FORMAT = [%(name)s] %(levelname)s: %(message)s'
```

Note: I left other fields untouched because I still need to see **levelname** and **scrapy engine module name**.

With this new setting, the above log would have been changed as below.

```bash
[2022-12-12T12:12:20.314+0000] {subprocess.py:93} INFO - [root] INFO: 2022-12-02 000220 2022-12-07 2022-12-11 Yahoo Finance
```

