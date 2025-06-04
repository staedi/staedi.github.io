---
title:  "Using ollama for AI Agents"
date: 2025-06-04
tag: NLP
tags: [ollama, agent, tool, vision, thinking]
description: A simple instruction to Ollama focusing on the availabity of the tools, vision and thinking
---


## `ollama` - A companion to local LLMs

`Ollama` might not be the only available tool out there for local LLMs but is arguably one of the crucial players.

### Why?

As a Apple Silicon user, lack of `CUDA` and the fact that many tools requiring or assuming `CUDA` to make use of GPU acceleration had been a deal breaker for me.

Admittedly, [`PyTorch`](https://pytorch.org) started to support Apple Silicon via the [`MPS`](https://developer.apple.com/metal/pytorch/) (Metal Performance Shader).

However, its use was not so straightforward and has been subpar than our solutions including [`MLX`](https://github.com/ml-explore/mlx) or `Ollama`.

### Why not `MLX`, then? 

As explained in the previous [post](smolagents-with-ollama), `MLX` is not supported well in Huggingface's [`smolagents`](https://huggingface.co/docs/smolagents/index) framework, which is my current default choice for AI Agents use.

In contrast, `Ollama`, powered by `LiteLLM` via [`LiteLLMModel`](https://huggingface.co/docs/smolagents/v1.16.1/en/reference/models#smolagents.LiteLLMModel), smoothly supports most frameworks including `smolagents` and `llamaindex`.

Most importantly, as with the `MLX`, `Ollama` correctly uses Apple Silicon's GPU without even noticing.


## Take notice of tags

While you can use most of the [models](https://ollama.com/search) available in `Ollama` for AI Agents uses, there should be considerations.

In the age of Tool-based AI Agents, it is highly likely that one would create or play with **tool-capable** AI Agents.

In turn, using a **tool-capable** LLM models.

![](/images/ollama.png)

`Ollama` tags tool-capable models as `tools`, while one without that tag cannot be used to use tools in an AI Agents project.

Additionally, for vision- or thinking-capable models, each is tagged as `vision` or `thinking`.

For instance, `gemma3`, which is capable of visions is tagged as `vision` and `qwen3` is with `thinking`.