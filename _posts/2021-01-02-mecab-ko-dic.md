---
layout: post
title:  "Deploying user-dict (mecab-ko-dic) in Python eunjeon (은전) module"
last_modified_date: 2021-02-06
categories: [dev]
tags: [python, Mecab, mecab-ko-dic, mecab-ko, eunjeon]
---

`nltk`, Natural Language Processing Toolkit, is a powerful module for NLP. However, unfortunately, in Korean language, it's not so effective. The main difference is Part-of-Speech(PoS) tagging is at the core of the preprocessing Korean texts for NLP purposes. Because of this, various tools which have been developed to tackle the issues.


## Mecab

Mecab, a NLP module based on Japanese NLP one, definitely stands out among others, due to its high performance. Unlike many others, it doesn't depend on JDK. I was mind-blown when I first switched from `Komoran`, a JDK-based module to `Mecab`. The running time of analyses with the same documents, was from a few hours to less than 5 minutes!

However, Mecab isn't available on Windows as the installation process includes *nix shell scripts.


## Eunjeon (은전)

One notable module which aims to make Mecab run on Windows is `pyeunjeon`. Like many other modules, once installed, it is recognized by `eunjeon` in Python just as below. 

```py
import eunjeon
```

On windows, you just install python module, and you're ready to go. (As it wouldn't be possible in Windows system to run shell scripts made for *nix platforms.)


## Any catch?

As the title implies, there's a catch obviously. With `eunjeon` module, you can't build your own dictionary. It is usually the role of `mecab-ko-dict`, which is excluded in `eunjeon`.


## No workarounds?

Absolutely not. Given that you have a *nix machine including Mac, you can compile your custom dictionary on that system, and copy the resultant files back to Windows.
After compilations, `mecab-ko-dic` produces five fresh dictionary files.

* char.bin
* matrix.bin
* model.bin
* sys.dic
* unk.dic

By transferring these, you can enjoy the same user dictionary as in Mac or *nix-based systems.
