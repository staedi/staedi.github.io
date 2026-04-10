---
title:  "spaCy performance enhancement on Apple Silicon"
date: 2023-02-15
tag: NLP
tags: [amx, mps, spacy, apple, macbook, m1, pytorch, transformer]
description: A simple instruction on speeding up spaCy performance on Apple Silicon-powered computers
---

These days, I have been working with `spaCy`'s `spacy-experimental` module. As this version includes a transformer-based pipeline, which was trained with GPU, the speed issue is pretty critical for non-CUDA users (or as many perceive).
Since the release of Apple Silicon models, many have been wondering how its built-in GPU can be used to speed up the ML processes (myself included).

According to spaCy's ***GPU Support Troubleshooting FAQ*** on [GitHub](https://github.com/explosion/spaCy/discussions/11436), with `Pytorch` version 1.13+ alongside `spacy-transformer` 1.18+, Apple Silicon users can take advantage of their GPUs.


## No special setup necessary?

Not really.
While not so complicated, it does not necessarily mean that you can automatically use GPU on `spaCy`. Some requirements and additional installations as well as initializing GPU on spaCy-side are needed.


### Not Available on Big Sur

The support of GPU of Apple Silicon on `Pytorch` is via **Metal Performance Shaders** (`MPS`), using Apple's **Metal** acceleration. However, according to [Apple's document](https://developer.apple.com/metal/pytorch/), the support of **MPS** on `Pytorch` requires the following.
* macOS **12.3**+ (macOS Monterey)
* Python 3.7+
* `Xcode` ***13.3.1***+
* Xcode command-line tool: `xcode-select --install`

This requirement is critical as whatever methods I tried except the upgrade of the OS, `spaCy` couldn't enable GPU.
I assume the requirement of macOS **12.3** is with the version of `Xcode`, as nearly every (major) version up of it has required newer version of Mac OS.


### Install spaCy with extras

To make `spaCy` use of the `MPS` (or other additional beneficial features), normal installation is not enough.
Rather, it should be done as follows (or install such dependencies manually).

```bash
pip install spacy[apple]
```


### Enabling GPU on spaCy

> Note: From my experience on **macOS Monterey** (minimum OS requirement), With `pytorch` **1.3.1**, MPS support is still experimental or not yet stable. Be advised and wait until a smooth-working version will be released. 

Same as in using NVIDA GPUs, `spaCy` needs to know which processing unit is to be used.
Namely, use `spacy.prefer_gpu()` or `spacy.require_gpu()` command.

Note that `spacy.prefer_gpu()` command outputs boolean without emitting any error message while the latter complains when GPU is not available on the machine.
Also be aware that when using Jupyter, `spacy.load()` and initializing GPU should be **in the same cell**.

```python
import spacy
spacy.prefer_gpu()
nlp = spacy.load('en_corerefence_web_trf')
```

## Semi-optimal optimization without MPS

For those refuses to (like me until recently) or cannot upgrade the macOS, (or MPS support is unstable to use) MPS utilization is out of the option. However, they can still make use of AMX Matrix Multiplication block.
This processing unit can reduce the time compared to solely relying on CPU.

Fortunately, the only requirement is to install `spaCy` with **AppleOps** extras (`pip install spacy[apple]`).
Other than that, no other tasks are required.

| Type | CPU | Acceleration | Time took |
| --- | --- | --- | --- |
| Desktop | Intel i5-9500 3GHz | N/A | 30 mins |
| M1 MBA | Apple M1 w/ 8 cores | AMX | **15 mins** |
| Colab (Free) | Unknown | GPU | 3 mins | 

Obviously, my M1 didn't beat Colab with GPU on, which is reasonable. 
From what I heard, MPS can speed up to 2x that of AMX. So, it might've taken 7 mins which is still more than twice slower than on Colab.

However, that's not entirely bad considering the fact that this model is the cheapest option (except memory bump to 16GB) among Apple Silicon-based family.
