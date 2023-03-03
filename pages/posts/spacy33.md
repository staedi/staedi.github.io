---
title:  "Using spaCy for Korean PoS tagging"
date: 2022-05-04
tag: NLP
tags: [NLP, spacy, Korean, mecab]
description: A PoS example with spaCy 3.3 for Korean language
---

While `spaCy` has been around for a while and it does a good job with its available pipelines, for Korean language jobs, it was out of option for a while.

However, with the version **3.3** official release, the wait is over! This is the first version it is shipped with Korean language pipelines. In other words, it natively supports Korean language model and therefore no need to use external module for that purpose (`mecab` for instance).

While it might not be perfect nor provides an integrated analysis method for all languages, I believe it is a big step to take advantage of the `spaCy` toolkit.

For a stint of experiment, I found the following as pros and cons of this new release.

### Pros
* Streamlined import - Importing `konlpy` or even `mecab` no longer required just for Korean language analyses
* Can take advantage of **Name Entity Recognition (NER)** in `spaCy` to better preprocess the text
* Dependency analyses - While I'm in the early stage of experimenting this, this could be proved to be beneficial

### Cons
* Lemmas - Manual separation of words components are required (e.g., 한국은 -> 한국+은)
* Different entity name - Entity names in the **NER** (`ents`) are different from that of English.


Unless the explosion team will standardize the different naming for **NER**, manual conversion is still be required (plus manual separation of core words such as *VERBS* or *NOUNS*). However, with few works added, this will open the door for more convenient analyses.