---
title:  "Dual axis on ggplot2"
date: 2021-02-15
tag: Data Visualization
tags: [dataviz, R, ggplot2, dualaxis]
description: An instruction to use dual axis on ggplot2
---

## Dual Axis
Dual axis is a feature that yields serious-looking charts so that advanced-level are expected to know how to produce them. In the same time, it's controversial among practitioners that many try to make less use of.

## Why controversial?
While Dual axis chart looks more condensed by combining multiple graphs in one place, it also brings about the critical drawback. With dissimilar measure units, it's especially hard to grasp the chart easily. 

## Why not just avoiding it?
Despite its drawbacks, clearly, there are situations that we can't just ditch the use of dual-axis. For instance, we often want to investigate the relationships between two different features. It's not so effective when we have two separate plots as our eyes have to roll between them.

## Dual axis on `ggplot2`
`ggplot2`, a popular graphic library in `R` is my favorite one. While I don't use `R` on a daily basis, `ggplot` keeps me from abandoning `R` entirely and jumping to `Python`. Not to mention *seaborn* or *matplotlib*, no graphing tools can win over `ggplot2` for its visual appeal and straightforward grammar.

However, unlike other popular graphing tools, `ggplot2` doesn't provide an automatic way to create dual axis. In other words, when implementing it, one has to transform the range of one axis to that of the other. This is not how other tools make dual axis. In Excel for instance, when you add an additional y-axis, the range is automatically adjusted with the selected data.


### Calculating the range
So, how to adjust the range for the axes?
Conceptually, the adjustment is done as follows. (Making the **larger-range** dataset to be on *secondary axis*, the other on *primary one*)

1. Get the range of two y-axes
2. Transform the data with larger ranges to that of smaller ones (Not necessarily, but it is done in this way usually)
    * Scale_factor: Calculate the scale_factor which is the multiplier of the larger one to the smaller one
    * Shift_factor: If the range of one isn't from zero, then we calculate the difference between the minimum of two ranges (smaller one and scaled_down version of the other one).
3. Transform the secondary axes back to the original (**multiply** by *scale_factor* and **add** *shift_factor*)


### How it's done in `ggplot2`
Enough for the theory. <br />
To transform the process, the last step involves making use of `sec.axis` inside `scale_y_continuous`. Obviously, `sec.axis` means secondary axis.

The syntax is as follows.
```r
    ...
    ggplot2::scale_y_continuous(
      name = 'Primary axis',
      sec.axis = ggplot2::sec_axis(~(.+shift_factor)*scale_factor,name='Secondary axis',labels=scales::comma)
    ) +
    ...
```

Note that the transformed one, i.e., having larger-range dataset, is to be on secondary axis.