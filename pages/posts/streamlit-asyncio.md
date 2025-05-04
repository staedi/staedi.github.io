---
title:  "Debugging `RuntimeError: no running event loop` error within Streamlit "
date: 2025-05-04
tag: NLP
tags: [streamlit, torch, llamaindex, smolagents, asyncio]
description: A simple workaround to deal with the `RuntimeError: no running event loop` with a (possibly) multi-page Streamlit app

```
RuntimeError: Tried to instantiate class '__path__._path', but it does not exist! Ensure that it is registered via torch::class_
```
---


## Streamlit + LLM

As a long-time Streamlit user (admittedly, there has been a hiatus), this is my go-to tool for a quick prototyping.

Given its emphasis on the LLMs and the current interests on them, it's natural for me to come back to this tool. 

No need to mention that I use Jupyter notebook largely for initial learning purposes.


## Streamlit vs. Jupyter

However, while Jupyter takes care of typical async issues, (i.e., no need to apply `nest_asyncio.apply()`), Streamlit doesn't seem to.

While Streamlit uses `tornado` library just like Jupyter, as many posts have pointed out, native async managements doesn't seem to have arrived yet.

Therefore, for simple apps with async methods (e.g., using `llama_index`), applying such typical methods can work.

While the following code isn't a complete one, the typical (sometimes not error-proof) way is to use `nest_asyncio.apply()` coupled with `asyncio.get_event_loop()` (which is being pass to run_until_complete()).

```py
import asyncio
import nest_asyncio

nest_asyncio.apply()

import streamlit as st

with st.sidebar as sidebar:
    st.header('Agent Example')

    st.text('Framework is fixed to llamaindex')
    framework = st.selectbox('Choose Framework',options=['smolagents','llamaindex'],index=1,disabled=True)

    llm_selected = st.selectbox('Choose LLM',options=agent.model_lists.keys(),index=0)

    init_agent = st.button('Init Agent')
 
    if init_agent:
        agent.create_agent(llm_selected,init_agent)

    st.selectbox('Choose a query',sample_queries)


if "agent" in st.session_state:
    st.subheader('Agent is ready')

    if "messages" not in st.session_state:
        st.session_state.messages = []

    for message in st.session_state.messages:
        with st.chat_message(message['role']):
            st.markdown(message['content'])

    query = st.chat_input('Enter a query.')

    if query:
        with st.chat_message("user"):
            st.write(query)
            st.session_state.messages.append({'role':'user','content':query})

        with st.chat_message("assistant"):
            loop = asyncio.get_event_loop()
            try:
                loop.run_until_complete(
                    agent.await_result(query)
                )
            except Exception as e:
                st.error(f"An error occurred")
```


## Async but non-async issue 

Now to the main issue of this article.

The aforementioned method is quite a standardized way to cope with the async calls.

However, that was not main focus of this article.

### Mysterious error

Rather, the following console error is pretty much unavoidable with almost all async mitigation methods I've tried.

That being said, the Streamlit UI is not affected, as it continues to work normally.

```
Traceback (most recent call last):
  File "/Users/***/miniforge3/envs/llm/lib/python3.12/site-packages/streamlit/web/bootstrap.py", line 347, in run
    if asyncio.get_running_loop().is_running():
       ^^^^^^^^^^^^^^^^^^^^^^^^^^
RuntimeError: no running event loop

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/Users/***/miniforge3/envs/llm/lib/python3.12/site-packages/streamlit/watcher/local_sources_watcher.py", line 217, in get_module_paths
    potential_paths = extract_paths(module)
                      ^^^^^^^^^^^^^^^^^^^^^
  File "/Users/***/miniforge3/envs/llm/lib/python3.12/site-packages/streamlit/watcher/local_sources_watcher.py", line 210, in <lambda>
    lambda m: list(m.__path__._path),
                   ^^^^^^^^^^^^^^^^
  File "/Users/***/miniforge3/envs/llm/lib/python3.12/site-packages/torch/_classes.py", line 13, in __getattr__
    proxy = torch._C._get_custom_class_python_wrapper(self.name, attr)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
RuntimeError: Tried to instantiate class '__path__._path', but it does not exist! Ensure that it is registered via torch::class_
```

While not being confirmed, I only came across this error when I used the [multi-page app](https://docs.streamlit.io/develop/concepts/multipage-apps).

In contrast, in using a single-page app, whether I used [smolagents](https://huggingface.co/docs/smolagents/index) or [llama-index](https://docs.llamaindex.ai), this error didn't happen.

### Workarounds

As being discussed in the [Streamlit GitHub thread](https://github.com/streamlit/streamlit/issues/10992#issuecomment-2816874398), the quick fix is to add the following codes.

```py
import torch
torch.classes.__path__ = []
```

I could only guess that this might be due to the fact that dealing with LLMs involve `PyTorch`. 

Additionally, this error only happened in the initial call of the LLM or the Agent intialization calls (in [multi-page app](https://docs.streamlit.io/develop/concepts/multipage-apps)).

While this error didn't happen in a single page app, since I only implemented a single agent in that app, rather than incorporating all agents in a single page, I wouldn't delcare it with a [multi-page app](https://docs.streamlit.io/develop/concepts/multipage-apps) issue.