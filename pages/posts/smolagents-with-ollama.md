---
title:  "Using smolagents on the Apple Silicon device"
date: 2025-03-22
tag: NLP
tags: [mlx, mps, transformer, ollama, apple, transformer, huggingface, smolagents, litellm]
description: A simple instruction to use the Model locally with the `smolagents`, a small Agents framework by Huggingface
---


## `smolagents` - A small but decent framework

Recently, I started to keep abreast of the industry, and thankfully, there is an ongoing course for the AI Agents from the Huggingface.

In its offering, [`smolagents`](https://huggingface.co/docs/smolagents) framework is given the priority, understandably its being developed by the same organization (Huggingface).

While I'm currently in the early learning stage, this tool is good enough for starters like me or someone who doesn't want to be flooded with the complexities.


## On the Apple Silicon

Now, the hard part (as usual).

Since the debut of the Apple Silicon, utilizing the full potential of its GPU has never been easy.
While it has been going better since the adoption of the **Metal Performance Shaders** (`MPS`) in the Transformer library via Pytorch, it has never been straightforward as with `cuda`.

Specifically, when I got back on track to practice with LLMs, the OS version to utilize the `MPS` has been changed, initially from Monterey (MacOS 12) to Sonoma (MacOS 14).

While I have no concrete benchmarks using the Transformers other than alternatives (`ollama`, `llama.cpp` and `mlx-lm`), I have been feeling this is suboptimal.

Using Transformers within the `smolagents` has been frustrating as well, considering my stingly MacBook Air M1 with 16GB RAM.


## Alternatives other than Transformers

Thankfully, the `smolagents` has alternatives to define local Model other than ***Transformers***.

In fact, its default is `HfApiModel()`, which uses the Huggingface Inference Model with a strict monthly quota if you aren't careful (for learning purposes, it's hard not to reach the quota').


### MLXModel

First option is `MLXModel`, as the name implies, it uses the `ml-mlx` backend.

This was my first choice since I've had high hopes for the `ml-mlx`.
In fact, `ml-mlx` is the library which comes up often regarding running LLMs within the Apple Silicon devices.

Unfortunately, for now, it isn't usable due to the error with the `found_stop_sequence` (A [PR](https://github.com/huggingface/smolagents/pull/999) tries to resolve the issue).


### Ollama

In my earlier testing using the LLM along with the `MPS`, I concluded three possibilites.

1) Transformers (`device_map="mps"`)
2) MLX (`mlx-lm`, specifically)
3) Ollama / llama.cpp
4) LMStudio (UI)

Since the `ollama` showed the favorable performance (or maybe because using the `ollama` cli, the results come in by streaming mode), this is the next choice.

Using the `ollama` in the `smolagents` is supported on top of the [`LiteLLM`](https://docs.litellm.ai/docs/), which supports 100+ LLMs.

As Ollama doesn't require users to set any device options to make use of the `MPS`, using the `LiteLLM` backend doesn't require it, either.

A sample code snippet from the `smolagents` document is as below.

```py
# !pip install smolagents[litellm]
from smolagents import CodeAgent, LiteLLMModel

model = LiteLLMModel(
    model_id="ollama_chat/llama3.2", # This model is a bit weak for agentic behaviours though
    api_base="http://localhost:11434", # replace with 127.0.0.1:11434 or remote open-ai compatible server if necessary
    api_key="YOUR_API_KEY", # replace with API key if necessary
    num_ctx=8192, # ollama default is 2048 which will fail horribly. 8192 works for easy tasks, more is better. Check https://huggingface.co/spaces/NyxKrage/LLM-Model-VRAM-Calculator to calculate how much VRAM this will need for the selected model.
)

agent = CodeAgent(tools=[], model=model, add_base_tools=True)

agent.run(
    "Could you give me the 118th number in the Fibonacci sequence?",
)
```

However, for more detailed instructions, it might be better to look at a [PR](https://github.com/huggingface/agents-course/pull/327/files) since this requires downloading the model (`ollama pull [model]`) and running the `ollama` server (`ollama run`) beforehand.


## Model sizes

While `ollama` seemed to output the results in decent time, the initial results weren't so satisfactory, i.e., unnecessary multiple steps before generating the final output.

That was due to my choice of the deliberate stingy models, e.g., `llama3.2-3b-instruct`, `qwen2.5-coder:3b-instruct`.
As expected, small models aren't powerful enough to process the requests with minimal steps.

This issue was resolved when I turned to larger models such as `llama3.1:8b-instruct-q4_0` and `qwen2.5-coder:7b-instruct`.

While I had worried the model might be too large to be loaded in my machine, it didn't happen at least for the previously mentioned small requests.

Sample code is as follows using the same action as below.

```py
# !pip install smolagents[litellm]
from smolagents import CodeAgent, LiteLLMModel

model_lists = {
    'llama3.1': 'llama3.1:8b-instruct-q4_0',
    'qwen2.5-coder': 'qwen2.5-coder:7b-instruct'
}

model = LiteLLMModel(
    model_id=f"ollama_chat/{model_lists['llama3.1']}",
    api_base="http://localhost:11434",
    num_ctx=8192,
    )

agent = CodeAgent(
    model=model, 
    tools=[], 
    add_base_tools=True,
    )

agent.run(
    "Could you give me the 118th number in the Fibonacci sequence?",
    )
```

While the LLM is not guaranteed to output the same results, the following is one of such tries.

![smolagents](/images/smolagents.png)