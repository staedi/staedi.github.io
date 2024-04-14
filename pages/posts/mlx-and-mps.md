---
title:  "MLX - An even better performance enhancer on Apple Silicon"
date: 2024-04-14
tag: NLP
tags: [mlx, amx, mps, transformer, apple, pytorch, transformer]
description: A simple instruction to MLX library, which speeds up performance on Apple Silicon-powered computers
---

## MPS - Recap

In an earlier [post](spacy-m1), I introduced **Metal Performance Shaders** (`MPS`), for the Transformer-based NLP model performance boost.

In today's deep learning models, Pytorch and Transformer (by [Huggingface](https://huggingface.co)) is the default destination to go.

With the MPS, Apple Silicon Users can handle (train/predict) deep learning using their GPUs, albeit not at the same level as SOTA NVIDIA GPUs. 

In my own testing with `spacy-experimental` module, it showed twice performance of the same job in Intel i5-9500 3GHz Machine.

At the time of that writing, MPS was supported from **macOS 12.3 (Monterey)**. 

However, as it happens, now the essentially minimum macOS version has been bumped to **macOS 13.3 (Ventura)** to reliably support most LLMs in the market.

While technically being supported, Pytorch in **Monterey** with MPS show the following warnings. 

```
RuntimeError: MPS does not support cumsum op with int64 input. Support has been added in macOS 13.3

MPS: no support for int64 min/max ops, casting it to int32
```


## MLX - An Framework by Apple ML research

In today's AI world, nothing is constant as we've witnessed how the tech world has been revolutionized since November, 2022.

Apple ML researched has released an array framework, [MLX](https://ml-explore.github.io/mlx/) for an optimized ML operation on Apple Silicon machines.

```bash
pip install mlx
```

### An array framework? Why?

You might be asking, an array framework? What's the big deal?

In ML, unstructured data such as text or image are converted to numeric arrays for complex computations.
In fact, both `Tensorflow` and `Pytorch` are based on the concept of **tensor**, which enables us to handle all sorts of deep learning models.

It would be easier to understand that `numpy` library is the required for many ML-based libraries.

### What's with LLMs

As MLX is provided as a framework, using it out of the box with the SOTA LLMs might be a bit challenging.

We don't care or intend to develop a model from scratch. We care how to use LLM models seemlessly and faster.

Sure!

They provide `MLX-LM` library, with which we can inference or fine-tune the LLMs.

```bash
pip install mlx-lm
```

As I'm currently testing out a few models from which I plan to fine-tune for my own purposes, I haven't got to the point of model fine-tune yet.

### Example with Google Gemma

My recent interest has been Google's [Gemma model](https://ai.google.dev/gemma/docs), therefore it was my obvious choice to try with `MLX-LM`.

1) Library installation

```bash
pip install mlx-lm
```

2) Text Generation

```py
from mlx_lm import load, generate

model, tokenizer = load("google/gemma-1.1-2b-it")

response = generate(model, tokenizer, prompt="hello", verbose=True)
```

### MPS and MLX

The apparent question between `MPS` and `MLX` is if we need another optimization toolkit for deep learning.
Don't we already have the ability with `MPS` in `Pytorch`?

It could be.

With `MPS`, we can leverage Apple Silicon's GPU on `Pytorch`. However, most advanced features are or has been developed with **CUDA** in mind.

Take `bitsandbytes` quantization library for example. As of this writing, it doesn't support Apple Silicon yet while it is planning to in the near future.

Therefore, while we can leverage same syntax of `Pytorch` with `MPS`, not all functionalities are supported yet.

`MLX`, however, is an independent library, not a part of `Pytorch`. Therefore, the same problem with Pytorch-side might not happen, besides a learning curve to learn a separate package.