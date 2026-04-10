---
title:  "Utilizing GPU on Google Colab [spacy-experimental]"
date: 2023-02-16
tag: NLP
tags: [NLP, spacy, rel_component]
description: How to use spacy-experimental on Google Colab with GPU on
---

## Using GPU on Colab?

Is that even a question?

You might think so. It might work smoothly but when I try to an experimental version of `spaCy` (`spacy-experimental`), it didn't.

There are two points worth mentioning.


## Overriding `local.getpreferredencoding()`

Without GPU on, Colab runs on the default (**UTF-8**) encoding. However, somehow, with GPU on, it changed to **ANSI_X3.4-1968**. And CUDA didn't work as a result.

Solution? Overriding the encoding.

```py
import locale
print(locale.getpreferredencoding())
def getpreferredencoding(do_setlocale=True):
  return 'UTF-8'
locale.getpreferredencoding = getpreferredencoding
```


## GPU option not sharing between cells 

As mentioned in the [post](spacy-m1), `spaCy` can utilize GPU either with `spacy.prefer_gpu()` or `spacy.require_gpu()`, from which I **prefer** the first one (No pun intended).

Howver, since GPU settings are not preserved between cells according to [spaCy](https://spacy.io/usage/v3#jupyter-notebook-gpu), extra care must be needed. 

In other words, after instructing `spaCy` to use GPU, model pipelines **SHOULD** be loaded on the **SAME CELL**.

That is, you SHOULD NOT do like this. (Each block represents separate cell)

```py
import spacy
gpu = spacy.prefer_gpu()
```

```py
coref = spacy.load('en_coreference_web_trf')
## Imagine "texts" is a list of str
doc = list(coref.pipe(texts))
```

Then, is this right?

```py
import spacy
gpu = spacy.prefer_gpu()
coref = spacy.load('en_coreference_web_trf')
```

```py
## Imagine "texts" is a list of str
doc = list(coref.pipe(texts))
```

Wait!

In fact, you shouldn't process the text in a separate cell after loading the pipeline. Therefore, try the following instead.

```py
import spacy
gpu = spacy.prefer_gpu()
coref = spacy.load('en_coreference_web_trf')
## Imagine "texts" is a list of str
doc = list(coref.pipe(texts))
```

Note: Once the text is processed, it is okay to use the `doc` in a separate cell after that.