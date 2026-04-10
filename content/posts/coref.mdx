---
title:  "Using Coreference Resolver with [spacy-experimental]"
date: 2023-02-17
tag: NLP
tags: [NLP, spacy, spacy-experimental, coreference]
description: A brief introduction to Coreference Resolver with spacy-experimental
---

## Coreference?

Coreference is one the most common practices we do every time (at least for many western language users). Literally, it is to find out what multiple words (or phrases) represent in the text.
That technique is so crucial as we often (and always in written texts) change the same word to other equivalent synonyms to avoid repetitions 
(Have you ever heard of Thesaurus dictionary? Of course you have!) 

As you know well, the concept is as follows.

``` txt showLineNumbers
Yesterday, **Google** announced its own **_AI chatbot_**, _**Bard**_, _**a competitor**_ to ChatGPT developed by OpenAI.
However, **the tech giant** embarrassed itself by sharing an inaccurate information generated with the new platform.
As a result, **the company**'s stock plunged pretrading before recouping **its** losses during the day.
```
Here, all **bold w/o italics** mean **Google** while _**bold w/ italics**_ do _**Bard**_.

For this simple example, it seems fairly easy, maybe because we know the mechanism intrinsically or because the text does not involve a too complicate structure complicating the process.
Whatever is true, perfect coreference with machine has been an illusion in the NLP domain.

## Why `spacy-experimental`?

*Disclaimer*: I'm not an employee of **Explosion.AI** or a contributor to `spaCy`.

Since I came across `spaCy` and after its release of Korean language model pipleine, I never looked back. Until now, I've been pleased with stable version (not _experimental_ one).
In terms of **Coreference**, various solutions or (`Python`) modules have been proposed.

From my own experience, most weren't for me.

Putting asise the quality of the result, most critical snag was the version compatibility of `spaCy`.
Most tools depend on both `AllenNLP` and `spaCy`. However, most rely on previous versions of `spaCy`, some of which are caused by their reliance on previous versions of `AllenNLP`. 
As I needed `spaCy` version 3.3 at the least, most of them were out of the option.

Then, with version 0.6, `spacy-experimental` started to offer **Coreference Resolver** with its `transformer`-based pipeline.
Upon testing on some texts, I was quickly into it.


## How to use?

### Installation

Obviously, installing `spacy-experimental` is required. Even `spaCy` hasn't been installed, the installer will install `spaCy` as one of dependencies.
Also, model pipeline capable of **Coreference Resolver** is needed as well (or you can train it but I do not recommend). 

```bash
pip install spacy-experimental
pip install https://github.com/explosion/spacy-experimental/releases/download/v0.6.1/en_coreference_web_trf-3.4.0a2-py3-none-any.whl
```

### Action!

Note that we do NOT IMPORT `spacy-experimental`, rather indirectly by importing `spacy` as usual. Only difference is the model to load.
Also, to check the result, see contents of `doc.spans`.

```py
import spacy
coref = spacy.load('en_coreference_web_trf')
text = "Yesterday, Google announced its own AI chatbot, Bard, a competitor to ChatGPT, developed by OpenAI. However, the tech giant embarrassed itself by sharing an inaccurate information generated with the new platform. As a result, the company's stock plunged pretrading before recouping its losses during the day."
doc = coref(text)
print(doc.spans)
```

And here is the result.

```py
{'coref_clusters_1': [Google, its, the tech giant, itself, the company's, its], 'coref_clusters_2': [its own AI chatbot, Bard, a competitor to ChatGPT, developed by OpenAI, the new platform]}
```

As you can see, the resolved coreferences are in the same **coref_clusters_{number}**. In other words, the model concludes that items within a cluster represents the same. 
For coref_clusters_1, **Google, its, the tech giant, itself, the company's, its**
and for coref_clusters_2, _**its own AI chatbot, Bard, a competitor to ChatGPT, developed by OpenAI, the new platform**_
.

Looks good, isn't it?

Overall, it seems pretty decent. The only drags are its limited support of language and heavy model (transformer-trained).
