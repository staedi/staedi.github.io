---
title:  "Long/wide-form data transformations"
date: 2020-09-20
tag: Development
tags: [R, python, tidyr, pandas, pivot, spread]
description: A guide to long/wide-form data transformations in R and Python
---

Two leading data analytics program, *Python* and *R* can do almost the same jobs despite different terms or ways to accomplish them.

The title of this article totally fits into this category and from what I learned about *R*, `gather` and `spread` are two basic tools in data analytics. However, in *Python*, unless one is going to do some data analysis work, the equivalent arsenals aren't so familiar.


### Wide to long-form
This is rather straightforward. Both tools have the same coined function, `melt` although it's not the only one. Whether we use `melt` or not, the syntax seems pretty similar in both languages.

```r
# R - Wide to long-form (tidyr::gather)
tidyr::gather(data,key='item_type',value='item_value',-Excepted)
```

```py
# Python - Wide to long-form (pandas.melt)
pandas.melt(data,id_vars=['Excepted'])
```

As can be seen above, `gather` takes names of columns to be index ones with **-** *prefix*, and set the resulting column names on-the-fly. On the other hand, *Python*'s `melt` just takes index columns only. 


### Long to wide-form
This is where *R* shines, as it's rather easier than its counterpart. The counterpart of `gather` from **tidyr** library, `spread` does with the simple syntax, while it may not be so simple in *Python* universe.

```r
# R - Long to wide-form (tidyr::spread)
tidyr::spread(data,item_type,item_value)
```

However, in *Python*, the action involves a little follow-ups. It is generally done with **pandas**'s `pivot`, which is the scaled-down version of its powerful brother, `pivot-table`, which is capable of aggregations, while `pivot` isn't.


```py
# Python - Long to wide-form (pandas.pivot)
index_cols = list(data.columns)
index_cols.remove('item_type')
index_cols.remove('item_value')

pandas.pivot(data,index=index_cols,columns='item_type',values='item_value').reset_index()
```

As `pivot` and `pivot_table` generates index columns, **reset_index()** should be followed to make the dataframe to the R-equivalent version.
