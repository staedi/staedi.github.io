---
title:  "Resolving abrupt error with Streamlit Cloud (module click)"
date: 2022-04-21
tag: Miscellaneous
tags: [streamlit, click, requirements.txt]
description: How to solve the Streamlit Cloud deployment error (module click version issue)
---

## What's the problem?

Recently, [Streamlit Cloud](https://share.streamlit.io) stopped working for my application, rather complaining an error message.

```
2022-04-21 13:05:06.062 An update to the [server] config option section was detected. To have these changes be reflected, please restart streamlit.
Traceback (most recent call last):
  File "/home/appuser/venv/bin/streamlit", line 8, in <module>
    sys.exit(main())
  File "/home/appuser/venv/lib/python3.7/site-packages/click/core.py", line 1130, in __call__
    return self.main(*args, **kwargs)
  File "/home/appuser/venv/lib/python3.7/site-packages/click/core.py", line 1055, in main
    rv = self.invoke(ctx)
  File "/home/appuser/venv/lib/python3.7/site-packages/click/core.py", line 1657, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
  File "/home/appuser/venv/lib/python3.7/site-packages/click/core.py", line 1404, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "/home/appuser/venv/lib/python3.7/site-packages/click/core.py", line 760, in invoke
    return __callback(*args, **kwargs)
  File "/home/appuser/venv/lib/python3.7/site-packages/streamlit/cli.py", line 207, in main_run
    _main_run(target, args, flag_options=kwargs)
  File "/home/appuser/venv/lib/python3.7/site-packages/streamlit/cli.py", line 228, in _main_run
    command_line = _get_command_line_as_string()
  File "/home/appuser/venv/lib/python3.7/site-packages/streamlit/cli.py", line 217, in _get_command_line_as_string
    cmd_line_as_list.extend(click.get_os_args())
AttributeError: module 'click' has no attribute 'get_os_args'
```

I'd never heard of nor known of this `click` module. From the log, it was apparent that it had nothing to do with any of my codes, as it was with initial streamlit runner script. (Also, I haven't made any changes to the code for a while.)

## Give me a solution

So, the solution is simple.
-> Set the specific version of `click` module.

While it was also recommended to install `streamlit` version of at least **1.8.1**, this approach didn't work for me as it just showed a blank screen.

So, my choice was to fix the version of `click` module to 8.0. The following is my ***requirements.txt*** file.

```
numpy==1.19.1
pandas==1.1.1
streamlit==0.80.0
click==8.0
```

Here, versions of first two modules (`numpy` and `pandas`) aren't crucial as I havent' changed it as these are the versions which work just fine.
Next, I set the version of `streamlit` to this specific version as it was the last version I had been using before the error message appeared.
