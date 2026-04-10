---
title:  "Finetuning stopwords with spaCy - Named Entity Recognition"
date: 2022-02-20
tag: NLP
tags: [NLP, stopwords, spacy, NER]
description: How to use Named Entity Recognition for custom-tailored stopwords
---

## Text Preprocessing
In Natural Language Processing (NLP), preprocessing is the first and the foremost part of it. Recall the adage in Data Analysis and/or Data Science : "Garbage in, Garbage out". This is especially true in NLP. Without proper preprocessing, the subsequent text analyses would be inaccurate at best. 

## Stopwords
At the core of the proprocessing is to get rid of unnecessary words, digits or as such. In that regard, one of the most tricky works is to remove stopwords - so commonplace and meaningless words in many texts.  

## How to remove Stopwords

### Basic (NLTK)
Most NLP packages include predefined stopwords for English language. Therefore, if one is working with English texts, using that preset of words would be a good start.

```py
import nltk
# Stopwords files should be downloaded first
nltk.download('stopwords')

from nltk.corpus import stopwords
# Get a list of stopwords
stopwords = stopwords.words('english')
print(stopwords)
```

### Advanced (spaCy - Named Entity Recognition)
The above method is a good start, however, still there would be plenty of unnecessary words unremoved. For example, **Date, Time, Money**, and so on.

This is where **`Named Entity Recognition (NER)`** from `spaCy` can give hands. **NER** is usually useful for recognizing ***geographic entities, organizations and prominent figures***, to name a few.

However, it can also extract beforementioned unnecessary ***Date, Time*** and so on. Therefore, with NER, we can further remove stopwords.


```py
import spacy
# Load English Medium model
nlp = spacy.load('en_core_web_md')
# Analyze a sample text with the model
doc = nlp('Yesterday, NASDAQ Index plunged more than 100 points from the day before, erasing the gains.')
# Get Named Entities in the text
print(doc.ents)
```

```bash
(Yesterday, NASDAQ, more than 100, the day before)
```

Now, let's see how each entity is recognized.

```py
for ent in doc.ents:
    print(ent,ent.label_)
```

```bash
Yesterday DATE
NASDAQ ORG
more than 100 CARDINAL
the day before DATE
```

Voilà, given this information, we can filter out unnecessary entities.

## Concluding remarks
While `NER` method may not be perfect, I'm sure it can reduce the burden of preprocessing dramatically if used properly.