---
title:  "Efficient unique list in Python"
date: 2021-10-20
tag: Development
tags: [python, list, set, dict]
description: How to extract unique elements from Python list efficiently
---

## Is that even a thing?
Unless you're not totally familiar with Python language, you probably know the answer already. Yes, the holy grail of Python, the `list comprehension`!

```py
src_list = ['A','B','C','D','E','common_A','common_B']
conditions = ['common_A','common_B']
taget = [el for el in src_list if el in conditions]
```

Of course, it is.

## Let's tweak a bit.
Let's say one of or both lists contain at least 1 million elements. Then, would you still use this method? Especially if you need to manipulate your `pandas` **DataFrame**, which has multiple columns to work with, what would you say? 

`Set` is here to help, right?

```py
src_list = ['A','B','C','D','E',..., 'common_A','common_B',...]
conditions = ['common_A','common_B',...]
taget = set(src_list) - set(conditions)
```

Well, maybe. It's the simplest solution but this high-performing `set` type is known to be **unordered**. If the original list is unordered and you need to preserve the ordering, you're in a big trouble.

## Dict is here to the rescue!
Another high-performing data type, `dict` can achieve this additional layer of requirement.
It's fast and don't mess with the ordering of the input.

`dict.fromkeys(list)` is the magic command for you. As the syntax implies, it constructs a dict object from the input (*list*) and value items are set to None (only key items in the order of presence in the input are added).
For the list ['A','B','C','D','E'], this command yields 

```
{'A':None,'B':None,'C':None,'D':None,'E':None}
```

To apply to the original problem,

```py
src_list = ['A','B','C','D','E',..., 'common_A','common_B',...]
conditions = ['common_A','common_B',...]
taget = [el for el in dict.fromkeys(src_list) if el in set(conditions)]
```

As an added bonus, we get the unique elements.
