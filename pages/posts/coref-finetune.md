---
title:  "Fine-tuning open-source LLMs for Coreference Resolutiom task using `mlx-lm`"
date: 2025-08-10
tag: NLP
tags: [NLP, spacy, spacy-experimental, coreference, llama, gemmma, mlx-lm, neuralcoref, lora]
description: Modernizing Coreference Resolution task with fine-tuning LLMs
---

## Coreference Resolution revisited

In the earlier [post](coref), I introduced the Coreference Resolution task along with [spacy-experimental](http://github.com/explosion/spacy-experimental), which provided decent outputs.

In short, Coreference Resolution is to restore the repetitive terms in the text where we replaced to others to avoid the repetitions.

For instance, take the following text.

> Paul went to a shop. He met Andy.

Without thinking, we replace the same words to different ones, mostly pronouns (i.e., **he** in the text).

This is the natural act of our brain, but it introduces ambiguities especially for computer programs (LLMs obviously are much smarter than before, though).

For basic NLP tasks, when deterministic approach is used (i.e., no Neural Network is utilized), it can struggle these replacements (just ignores).

By explicitly reverting back to what they really means, this gives the program helpful hints.


## Times have changed

Now we are nearing 2026, where multiple companies are developing and competing their AI models (aka LLMs) at breakneck speeds.

The emergence of highly intelligent AIs discouraged previously specialized models from developing continously.

Take Coreference Resolution capable models, for instance.

Previously available models, [spacy-experiemental](https://github.com/explosion/spacy-experimental), [neuralcoref](https://github.com/huggingface/neuralcoref), and others haven't been updated for years.
As a result, they aren't compatible with current [spaCy](https://spacy.io) version.


## Fine-tuning open-source LLMs

Naturally, the presence of LLMs led me to look for fine-tuning them.

* Flagship LLMs (not the ones which will be fine-tuned) can help the process by creating training data.
* LLMs can guide the steps for fine-tuning despite not always 100% up-to-date or factual.
* With few-shot approach (and tuning prompts), flagship LLMs can ouput the expected results.

### Models to use (`mlx-lm` compatible)

Since `mlx-lm`'s LORA tuning doesn't support all models available, notably T5 family (despite technically not LLMs), therefore, decoder-only models are considered.

While my first choice was [`gemma-3-4b-it`](https://huggingface.co/google/gemma-3-4b-it), it failed to pass the test of the financial text even with the tweaking of params and augmenting of datasets.

Interestingly, [Llama-3.2-3B-Instruct](https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct), despite its slightly smaller size, succeeded the test.

### Datasets used

As usual, the dataset was constructed to follow the chat prompt strucure.

```jsonl
{"messages": [{"role": "system", "content": "You are an expert at coreference resolution. Your task is to resolve all pronouns and descriptive references in text by replacing them with their specific entities."}, {"role": "user", "content": "Please resolve all coreferences in this text: Microsoft announced its quarterly earnings yesterday. The tech giant reported strong growth in cloud services, and it exceeded Wall Street expectations."}, {"role": "assistant", "content": "Microsoft announced Microsoft's quarterly earnings yesterday. Microsoft reported strong growth in cloud services, and Microsoft exceeded Wall Street expectations."}]}
```

### Training process

In `mlx-lm`, training process is surprisingly simple.

With the dataset and configuration file (`.yaml`) ready, no daunting training loop is required.
In fact, those details are hidden when calling the `mlx_lm.lora` command for fine-tuning.

For instance, if the configuration file is `training_config.yml`, training is done by the following command.

```bash
mlx_lm.lora --config training_config.yml
```

Training configurations including data directory are defined in this config file.


### Inference with the tuned model

Text I used:

> "Also dragging on spirits was disappointment over Amazon's earnings released late Thursday. The performance of its AWS cloud unit failed to live up to lofty expectations set by rivals Google and Microsoft, sending its shares down over 8%. But Apple stock rose after its results beat expectations, boosted by surprisingly strong iPhone sales."

Using `mlx_lm.generate` command with the fused model (via `mlx_lm.fuse`) saved in the `mlx_model` directory, Inference can be done.

```bash
mlx_lm.generate --model mlx_model --prompt "Resolve coreferences in the following text by replacing pronouns and descriptive references with their original entities. Maintain the same meaning and structure while making all references explicitly: \n Also dragging on spirits was disappointment over Amazon's earnings released late Thursday. The performance of its AWS cloud unit failed to live up to lofty expectations set by rivals Google and Microsoft, sending its shares down over 8%. But Apple stock rose after its results beat expectations, boosted by surprisingly strong iPhone sales."
```

The tuned model nailed the task as below!

```text
==========
Also dragging on spirits was disappointment over Amazon's earnings released late Thursday. Amazon's AWS cloud unit failed to live up to lofty expectations set by rivals Google and Microsoft, sending Amazon's shares down over 8%. But Apple stock rose after Apple's results beat expectations, boosted by surprisingly strong iPhone sales.
==========
Prompt: 127 tokens, 130.615 tokens-per-sec
Generation: 61 tokens, 27.020 tokens-per-sec
Peak memory: 2.109 GB
```text