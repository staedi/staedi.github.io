---
title:  "Difference between loc and iloc for Pandas DataFrame indexing"
date: 2022-08-06
tag: Development
tags: [pandas, iloc, loc, indexing]
description: A simple instruction of using Pandas DataFrame indexing
---

## Are you serious? loc and iloc?

As you see this topic, you might scoff at it. Isn't using **loc** and **iloc** one of the common subjects in `Pandas`?

Well, maybe. 

As a whatever-you-might-you-call-it-practitioner who uses `Pandas` on a daily basis, we all know how to use **loc** and **iloc**.


## Are you sure about that?

In most cases, many of us use each for separate purposes. 

First, **loc**, more versatile tool is often used to subset or filter of the given DataFrame based on certain conditions. For **iloc**, it is obvious that it is used to get data with given range of indices.

In summary, we often use these two for separate reasons, not for the same reason. In other words, we can use **loc** to get data with given range of indices as **iloc** does.


## Okay, so?

Unfortunately, these two doesn't handle the indexing in the same way.

### `iloc`

As the name implies, **iloc** is specialized in indexing a DataFrame. Therefore, it works the same way as we deal with other data structures (e.g., lists).

The only caveat, or rather a difference from its counterpart , **loc**, is it handles index as if they are already resetted.

Look at the following example.

```
>>> a = pd.DataFrame({'a':[1,2,3],'b':[3,5,6]})
>>> b = a.loc[a.a != 2]
   a  b
0  1  3
2  3  6
```

What do you expect the result from `b.iloc[1]`?

```
>>> b.iloc[1]
a    3
b    6
Name: 2, dtype: int64
```

And, if run `b.iloc[-1]`, it returns the last element of the DataFrame. (In this case, same as `b.iloc[1]`)

```
>>> b.iloc[-1]
a    3
b    6
Name: 2, dtype: int64
```

Finally, let's do this seemingly obvious one before turning the page to **loc**.

```
>>> b.iloc[:0]
Empty DataFrame
Columns: [a, b]
Index: []
```

Now, let's see how **loc** works.


### `loc`

Now, **loc** works very differently. First, it doesn't reset the index so you'll get the result by specifying the index from the subset DataFrame. 

```
>>> a = pd.DataFrame({'a':[1,2,3],'b':[3,5,6]})
>>> b = a.loc[a.a != 2]
   a  b
0  1  3
2  3  6
>>> b.loc[2]
a    3
b    6
Name: 2, dtype: int64
```

Next, indexing by **-1** doesn't work for **loc**.

```
>>> b.loc[-1]
Traceback (most recent call last):
  File "/Users/minpark/opt/miniconda3/lib/python3.7/site-packages/pandas/core/indexes/base.py", line 3080, in get_loc
    return self._engine.get_loc(casted_key)
  File "pandas/_libs/index.pyx", line 70, in pandas._libs.index.IndexEngine.get_loc
  File "pandas/_libs/index.pyx", line 101, in pandas._libs.index.IndexEngine.get_loc
  File "pandas/_libs/hashtable_class_helper.pxi", line 1625, in pandas._libs.hashtable.Int64HashTable.get_item
  File "pandas/_libs/hashtable_class_helper.pxi", line 1632, in pandas._libs.hashtable.Int64HashTable.get_item
KeyError: -1

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/minpark/opt/miniconda3/lib/python3.7/site-packages/pandas/core/indexing.py", line 895, in __getitem__
    return self._getitem_axis(maybe_callable, axis=axis)
  File "/Users/minpark/opt/miniconda3/lib/python3.7/site-packages/pandas/core/indexing.py", line 1124, in _getitem_axis
    return self._get_label(key, axis=axis)
  File "/Users/minpark/opt/miniconda3/lib/python3.7/site-packages/pandas/core/indexing.py", line 1073, in _get_label
    return self.obj.xs(label, axis=axis)
  File "/Users/minpark/opt/miniconda3/lib/python3.7/site-packages/pandas/core/generic.py", line 3738, in xs
    loc = index.get_loc(key)
  File "/Users/minpark/opt/miniconda3/lib/python3.7/site-packages/pandas/core/indexes/base.py", line 3082, in get_loc
    raise KeyError(key) from err
KeyError: -1
```

Finally, a weird operation for indexing when we do index ranging by **[int_a:int_b]**. In **Python** indexing, we expect the data at the second range to be excluded (and in many other languages too). 

However, with **loc**, it doesn't work in that way. it includes the data at that row as well.

```
>>> a.loc[:0]
   a  b
0  1  3
```


Therefore, using these for indexing purposes, if need to be more careful at least than subsetting, which is much more familiar to us. 