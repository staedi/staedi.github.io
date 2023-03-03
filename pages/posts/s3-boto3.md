---
title:  "Text Analytics - Using AWS S3 in Python"
date: 2021-10-22
tag: NLP
tags: [python, aws, boto3, tfidf, word2vec, gensim, pandas]
description: How to empower Text Analytics with AWS S3 in Python (boto3)
---

## Why Cloud Storage?
If you do text analytics with a number of texts but hate to be inundated with endless files in your local drive, cloud storage is the clear option you can try. One might argue, "Why don't you just use **database** which is easier to organize?" Well, the answer is, what if we have huge number of model files (Word2Vec for instance) and we hate them to be stored locally. 

## boto3 library (AWS S3)
If you use AWS S3, you can use `boto3` library to access (read and write) files in your S3 buckets.

### Initialize
```python
'''
region_name: Your S3 region name (e.g., us-east-1)
aws_access_key_id: AWS Access key (required for API access)
aws_secret_key: AWS Secret key (required for API access)
'''

import boto3
s3_client = boto3.client('s3',region_name=region_name,aws_access_key_id=access_key,aws_secret_key=secret_key)
```

To access S3 objects with `boto3`, you can initialize S3 client like above. I assumed no aws config files (*config* and *credentials* in **.aws** directory) exist.
Otherwise, you can simply initialize with

```python
import boto3
s3_client = boto3.client('s3')
```

### Access CSV Files (pandas)
Arguably, CSV file format is one of the most widely used one, especially in the `pandas` universe.
In that sense, it's essential to know how to access this file format.

```python
import os
import pandas as pd

'''
bucket: AWS S3 bucket name (e.g., aws-s3-data)
path: Full path of file name (e.g., data/file.csv)
'''

obj = s3_client.get_object(Bucket=bucket,Key=path)
data = pd.read_csv(io.BytesIO(obj['Body'].read()))
```

**Caution**: Here, `obj` variable is for one-time use. In other words, once S3 object is read into that variable and you failed to successfully create **pandas DataFrame** variable `data` here, you have to start over from `obj` variable assignment.

### Word Embedding (gensim.Word2Vec)
Among all methods to read S3 objects I laid out here, this is the easiest.

```python
import gensim.models import Word2Vec, KeyedVectors

'''
model_path: Full path of embedding model (e.g., embedding/model/2021_34.model)
result_path: Full path of embedding result [**KeyedVectors**] (e.g., embedding/result/2021_34.wv)
'''

embedding_model = Word2Vec.load(model_path,mmap='r')
embedding_result = KeyedVectors.load(result_path,mmap='r')
```

If you want to save model to S3, the syntax is same as doing to local drive.

```python
embedding_model.save(model_path)

embedding_result = embedding_model.wv
embedding_result.save(result_path)
```

### TfidfVectorizer (sklearn.feature_extraction.text)
Loading tfidf models and/or results with S3 are practically the same to that of *CSVs*.
* 1) Load S3 objects with `get_object()` method
* 2) Use `pickle.load()` to load saved files

```python
import pickle

'''
model_path: Full path of tfidf model (e.g., tfidf/model/2021_34.pkl)
result_path: Full path of tfidf result (e.g., tfidf/result/2021_34.pkl)
'''

model_obj = s3_client.get_object(Bucket=bucket,Key=model_path)
tfidf_model = pickle.loads(model_obj['Body'].read())

result_obj = s3_client.get_object(Bucket=bucket,Key=result_path)
tfidf_result = pickle.loads(result_obj['Body'].read())
```

To save into S3 bucket, the process is reverse.
* 1) Tfidf Analyses (`TfidfVectorizer()` and `fit_transform()`) <br/>
* 2) Use `pickle.dumps()` to dump files <br/>
* 3) Write S3 objects with `put_object()` method

```python
from sklearn.feature_extraction.text import TfidfVectorizer

'''
dataset: A list of text collections to be fed into tfidf
'''

tfidf_model = TfidfVectorizer()
tfidf_result = tfidf_model.fit_tranform(dataset)

tfidf_model_dump = pickle.dumps(tfidf_model)
s3_client.put_object(Bucket=bucket,Key=model_path)

tfidf_result_dump = pickle.dumps(tfidf_result)
s3_client.put_object(Bucket=bucket,Key=result_path)
```

