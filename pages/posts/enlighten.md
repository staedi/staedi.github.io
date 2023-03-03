---
title:  "Enlighten, compatible with Airflow real-time logging"
date: 2022-12-24
tag: Development
tags: [enlighten, tqdm, airflow, logging, print]
description: An introduction to enlighten module, a tqdm replacement for real-time logging in Airflow
---

## What is the problem?

In a [post](avoid-print) about **logging in Airflow**, I mentioned the performance deterioration of `tqdm` in **Airflow logging**. 

To recap, inside an **Iterator**, **logging** using `print()` is deferred until the end of that iteration. Therefore, despite **Airflow**'s ability to produce real-time logs, I couldn't view the real time log productions before switching to `logging` module. Also, more importantly, in terms of **logging purposes**, `tqdm` module operates as `print()`. In other words, iteration progress couldn't be tracked real-time with `tqdm`.

This was one of the biggest drags, as `tqdm` is the go-to module for many Python developers who would like to track progress with iterations. Importantly, without that progress tracking, I couldn't know if the program was running or not.


## Solution?

As I mentioned in the past, the tinier module `enlighten` does its essential job very well. After switching to this, I could track the real-time logging in **Airflow** as if running in the console.

The only caveat is that its lack of additional helpful functions available in `tqdm` (e.g., `progress_apply()` for `pandas` *apply*). 
However, it can be implemented with the custom functions and in fact, `progress_apply()` function is also just a shorthand function.


## How to use?

### Installation

```bash
pip install enlighten
```

### Initialization

```py
import logging
import enlighten

logging.basicConfig(format='%(message)s',level=logging.INFO)
logger = logging.getLogger()

manager = enlighten.get_manager()
progress_bar = manager.counter(total=100,desc='Iterating Loops',unit='ticks',count=1)
```

Here, `enlighten.get_manager()` is required to handle writing to logs in addition to progress updates.
As can be easily expected, progress_bar is what stores current progress. 

While other parameters are easier to guess, the one that matters is **count**. Default value at **0**, this parameter determines the starting index of counting. By setting to 1, it starts counting from 1 to the value of **total** parameter.


### Simple iteration (For loop)

```py
import logging
import enlighten

logging.basicConfig(format='%(message)s',level=logging.INFO)
logger = logging.getLogger()

manager = enlighten.get_manager()
progress_bar = manager.counter(total=100,desc='Iterating Loops',unit='ticks',count=1)
tick = 10

for idx in range(100):
    if idx % tick == (tick-1):
        logger.info(progress_bar.format())
    progress_bar.update()
```

In this way, the progress bar is printed every 10 step (for every 10% in this example).

```bash
Iterating Loops  10%|██▎                   |  10/100 [00:39<06:31, 0.23 ticks/s]
Iterating Loops  20%|████▍                 |  20/100 [00:39<02:45, 0.49 ticks/s]
Iterating Loops  30%|██████▋               |  30/100 [00:39<01:35, 0.75 ticks/s]
Iterating Loops  40%|████████▊             |  40/100 [00:39<01:01, 1.01 ticks/s]
Iterating Loops  50%|███████████           |  50/100 [00:39<00:40, 1.27 ticks/s]
Iterating Loops  60%|█████████████▎        |  60/100 [00:39<00:27, 1.52 ticks/s]
Iterating Loops  70%|███████████████▍      |  70/100 [00:39<00:17, 1.78 ticks/s]
Iterating Loops  80%|█████████████████▋    |  80/100 [00:39<00:10, 2.04 ticks/s]
Iterating Loops  90%|███████████████████▊  |  90/100 [00:39<00:05, 2.30 ticks/s]
Iterating Loops 100%|██████████████████████| 100/100 [00:39<00:00, 2.56 ticks/s]
```

### Advanced application (Pandas apply)

Now, time to get serious.
As I wrote earlier, although it does not provide a direct way to apply to `pandas` **apply**, `enlighten` can be used to track progress of it.

To imitate the operation of `tqdm.progress_apply()`, I first made a wrapper function called **progress_apply()** which is the outermost function to be applied within the `apply`, which will delegate progress bar updates to `update_progress_bar()` function.


```py
def update_progress_bar(progress_bar,idx,ticks,logger):
    if idx in ticks:
        logger.info(progress_bar.format())
    progress_bar.update()

## Mimic tqdm.progress_apply
def progress_apply(cols,func,progress_bar,ticks,logger):
    update_progress_bar(progress_bar=progress_bar,idx=cols[-1],ticks=ticks,logger=logger)
    return func(cols)
```

Here, *func* is the (lambda) function to be applied within **map/apply**, As expected, *progress_bar* and *logger* are previously defined **progress_bar** and **logger variables**, respectively. 

Finally, *ticks* is the new parameter, which is the list of ticks. For instance, if I have a DataFrame of 100 rows and tick unit of 10, ticks parameter is [9,19,29,39,49,59,69,79,89,99]. 


Additionally, I also made a function to generate tick lists specifically.


```py
def get_ticks(data,tick):
    return [round((len(data)/tick)*(n+1)-1) for n in range(tick)]
```


Finally, let's plug-in to the `apply`.


```py
import logging
import enlighten
import pandas as pd

logging.basicConfig(format='%(message)s',level=logging.INFO)
logger = logging.getLogger()

data = pd.DataFrame({'a':[i for i in range(100)]})

manager = enlighten.get_manager()
progress_bar = manager.counter(total=len(data),desc='Iterating DataFrame Apply',unit='ticks',count=1)
tick = 10

def update_progress_bar(progress_bar,idx,ticks,logger):
    if idx in ticks:
        logger.info(progress_bar.format())
    progress_bar.update()

## Mimic tqdm.progress_apply
def progress_apply(cols,func,progress_bar,ticks,logger):
    update_progress_bar(progress_bar=progress_bar,idx=cols[-1],ticks=ticks,logger=logger)
    return func(cols)

def get_ticks(data,tick):
    return [round((len(data)/tick)*(n+1)-1) for n in range(tick)]

def lambda_func(cols):
    return cols[0]*2

data['idx'] = data.index
data['b'] = data[['a','idx']].apply(lambda x:progress_apply(cols=x,func=lambda_func,progress_bar=progress_bar,ticks=get_ticks(data,tick),logger=logger),axis=1)
```

```bash
Iterating DataFrame Apply  10%|█▎          |  10/100 [00:04<00:38, 2.39 ticks/s]
Iterating DataFrame Apply  20%|██▍         |  20/100 [00:04<00:16, 5.04 ticks/s]
Iterating DataFrame Apply  30%|███▋        |  30/100 [00:04<00:09, 7.69 ticks/s]
Iterating DataFrame Apply  40%|████▍      |  40/100 [00:04<00:06, 10.34 ticks/s]
Iterating DataFrame Apply  50%|█████▌     |  50/100 [00:04<00:04, 12.99 ticks/s]
Iterating DataFrame Apply  60%|██████▋    |  60/100 [00:04<00:03, 15.63 ticks/s]
Iterating DataFrame Apply  70%|███████▊   |  70/100 [00:04<00:02, 18.27 ticks/s]
Iterating DataFrame Apply  80%|████████▊  |  80/100 [00:04<00:01, 20.91 ticks/s]
Iterating DataFrame Apply  90%|█████████▉ |  90/100 [00:04<00:00, 23.55 ticks/s]
Iterating DataFrame Apply 100%|███████████| 100/100 [00:04<00:00, 26.19 ticks/s]
```

```bash
     a  idx    b
0    0    0    0
1    1    1    2
2    2    2    4
3    3    3    6
4    4    4    8
..  ..  ...  ...
95  95   95  190
96  96   96  192
97  97   97  194
98  98   98  196
99  99   99  198

[100 rows x 3 columns]
```

Voilà!

While it accomplishes the mission of `apply` (look at the new column **b**), with the help of `enlighten` library, the progress is tracked as well.

One thing to note is the recording of row index to *idx* column. This is done to track current iteration index and to print out progress with given the tick unit. That is, if current iteration index is within the ticks list, the progress will be logged.


## Final note

While I didn't mention earier, `enlighten.manager()` can be customized to modify the format of the progress bar. In my opinion, for normal console out, it doesn't matter much. 

However, in Airflow logs, where additional information (e.g., time, log level and name) are added, default format of the progress bar may feel like too much. In other words, do we really need to have progress indicator at the log files?

The following is the modification of the format not to include that indicator with **bar_format** parameter.

```py
import enlighten

manager = enlighten.get_manager(bar_format='{desc}{desc_pad}{percentage:3.0f}%| {count:{len_total}d}/{total:d} [{elapsed}<{eta}, {rate:.2f}{unit_pad}{unit}/s]')
```