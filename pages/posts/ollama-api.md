---
title:  "Using Ollama API endpoints"
date: 2025-06-06
tag: NLP
tags: [ollama, api, endpoint, gemma3, vision]
description: A simple instruction to Ollama endpoints without depending on the Python SDK
---

Recently, I posted mostly regarding `ollama`, partly because I use it so often and also because I love it.

Obviously, this is also an extension of that line.

## Ollama API

For many use cases involving local LLMs, initializing via `LiteLLM` (for many frameworks including [`smolagents`](https://huggingface.co/docs/smolagents)) or `Ollama` (in case of [llamaindex](https://docs.llamaindex.ai)) work mostly.

However, in the age of Tool-calling AI Agent, we often need a tool which might make use of specific features not readily available with the loaded LLMs.

For instance, image capability can only be supported by ones which are equipped with vision, i.e., [vision-tagged models](https://ollama.com/search?c=vision) in case of `ollama`. 

In this case, calling API endpoints can come into play.

## Sample Call

[Ollama's GitHub page](https://github.com/ollama/ollama/blob/main/docs/api.md) has the comprehensive explanation.

Here, I'll focus on the image understanding example using the `gemma3` model, which is one of the smallest ones capable of vision understanding.

While `ollama` supports OpenAI-compatible API endpoints, since I don't feel to comply with those standards, the following is a non-OpenAI / non-Streaming request example. 

```py
def analyze_image(url: str) -> str:
    """
    Process an image file.
    Args:
        url: URL of the file to be analyzed from
    """
    try:
        import requests
        import base64

        # Get the response
        response = requests.get(url)
        response.raise_for_status()

        # Get the content
        image_content = response.content
        base64_image = base64.b64encode(image_content).decode('utf-8')

    except Exception as e:
        return f"Error downloading image: {str(e)}"

    # Call image processing endpoints
    api_url = "http://localhost:11434/api/generate"
    headers = {"Content-Type": "application/json"}

    payload = {
        "model": "gemma3",
        "prompt": "Describe this image in detail. Include any text, objects, people, actions, and overall context.",
        "stream": False,
        "images": [base64_image]
    }

    try:
        # Get the response
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

        if "response" in data and isinstance(data['response'],str):
            return data['response']
        else:
            return "No description generated"

    except Exception as e:
        return f"Error processing image file: {str(e)}"
```

If `gemma3` can successfully analyzes the image, the result will be retruned accordingly.