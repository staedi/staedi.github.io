---
layout: post
title:  "Using R with Jupyter Notebook"
categories: [dev]
tags: [R, python, jupyter, notebook, ipynb]
nav_order: 10
parent: Dev
grand_parent: Posts
---

Many people who have been using `Python` and/or **Jupyter Notebook** would agree with the claim that it has revolutionized the way of *data analytics*, step-by-step interactive way rather than running the whole code. Additionally, it was the same reason why `Python` gained so much popularity, as it was the only primary language enabled in the *Notebook* by default.

Little known is, to many, including myself, another popular analytics language `R` can be made available in *Notebook* as well.

This is done by installing a package called `IRkernel`.

```r
install.packages('IRkernel')
```

After installing `IRkernel` package, one must notify Jupyter Notebook of this package by calling the following command in **terminal** **(NOT in *RStudio*)**. 

```r
> IRkernel::installspec()
```

If this functionality should be shared by all users in the machine, try the following instead.

```r
> IRkernel::installspec(user = FALSE)
```

Then, Notebook can now recognize `R` once restarted.

*Voila!*
`R` is now enabled in the Jupyter Notebook

![](https://github.com/staedi/staedi.github.io/raw/master/images/r_notebook.png)
