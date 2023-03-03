---
title:  "Using dictionary with parquet-saved (pyarrow) DataFrame"
date: 2022-08-06
tag: Development
tags: [pandas, pyarrow, parquet]
description: How to use dictionary within .parquet file
---

Despite the convenience and popularity of `.csv` filetype, it has inherent drawbacks in terms of big data analyses. Notable examples include ***larger file sizes***, ***column type losses*** to name a few. In fact, I have experienced an error when trying to load `.csv` file in `PySpark`. 

To tackle the issue with this filetype, many practitioners have turned to alternatives like `.parquet` among others. Among available options, `.parquet` has been popular since it is natively supported by `pandas`.


## No caveat, heh?

If that's all, this is too good to be true. Besides being unable to read by a text reader, some data types saved with `.parquet` (at least with `pyarrow` engine for sure) converts the original **DataFrame** to another. Specifically, when a Series in the DataFrame has dictionaries with ***different keys***, the resultant parquet-saved DataFrame has Series with all-encompassing dictionaries.

```
>>> import pandas as pd
>>> data = pd.DataFrame({'id': ['a', 'b', 'c'], 'json': [{'a': 'json_a'}, {'b': 'json_b'}, {'c': 'json_c'}]})
  id             json
0  a  {'a': 'json_a'}
1  b  {'b': 'json_b'}
2  c  {'c': 'json_c'}
>>> data.to_parquet('sample.parquet')
>>> pd.read_parquet('sample.parquet')
  id                                   json
0  a  {'a': 'json_a', 'b': None, 'c': None}
1  b  {'a': None, 'b': 'json_b', 'c': None}
2  c  {'a': None, 'b': None, 'c': 'json_c'}
```

```
>>> data.to_csv('sample.csv',index=False)
>>> pd.read_csv('sample.csv')
  id             json
0  a  {'a': 'json_a'}
1  b  {'b': 'json_b'}
2  c  {'c': 'json_c'}
```

Here, while `.csv` preserves the Series with single key for each dictionary, `.parquet` does not, i.e., ***the resultant Series has dictionaries with all three keys***.


## How to solve?

Since the problem was with dictionary, the solution is pretty simple. Instead of saving as dictionary, converting it into str and later putting back to dictionary (`json` module comes to the rescue).

```
>>> import json
>>> data['json'] = data['json'].apply(lambda x:json.dumps(x))
>>> data.to_parquet('sample.parquet')
>>> data_parquet = pd.read_parquet('sample.parquet')
>>> data_parquet
  id             json
0  a  {"a": "json_a"}
1  b  {"b": "json_b"}
2  c  {"c": "json_c"}
>>> data_parquet['json'] = data_parquet['json'].apply(lambda x:json.loads(x))
>>> data_parquet
  id             json
0  a  {'a': 'json_a'}
1  b  {'b': 'json_b'}
2  c  {'c': 'json_c'}
```

Voilà! The resultant `DataFrame` is the same with the original now while being able to taking advantage of `.parquet` filetype.