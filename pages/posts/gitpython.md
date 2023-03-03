---
title:  "GitPython"
date: 2020-09-03
tag: Development
tags: [python, git]
description: How to use Git in Python
---

I believe the title exactly tells what I'll talk about - using `Git` on `Python`. As one knows, `Python` is an open-source software, with a bunch of libraries developed and distributed by a huge community. 

In fact, nearly everything you can think about already exists on Python. As an avid `ggplot2` user, I remember the day that I was so thrilled when I found out most functionalities of the graphing library are available with [plotnine](https://plotnine.readthedocs.io/en/stable/).

That being said, it is pretty predicted and inevitable that there should be tools to support `Git` on `Python`.`Git` is at the core of distribution of open-source software.

So, [GitPython](https://gitpython.readthedocs.io) does the work.

First install as usual.

pip users:
`pip install gitpython`
anaconda users:
`conda install gitpython`

__Note__: *conda-forge* has newer versions, but I don't think the version difference is meaningful in terms of its core operations.

Codes below are sample from my own, and I believe basic commit and push operations will be similar.

```py
from git import Repo

repo_dir = '/Users/minpark/Documents/Github/nCOV-summary'
repo = Repo(repo_dir)
file_list = ['file_to_be_pushed.txt']
msg = 'commit from python'

commit_message = msg
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.pull()
origin.push()
```

As it turns out, the module name is **git**! This means it will likely be the first tool for `git` operations on `Python`.

As described in the codes above, the basic steps are fairly standard.
```
1. Import git module
2. Set local git repository folder
3. Set files to be committed and commit msg
4. Do commit by `repo.index.add` and `repo.index.commit`
5. Set remote git repository
6. Pull remote repository to local
7. Push committed changes to remote repository
```

The most important part is **pull** command. When I tried to `commit` and `push` without `pull` even when I hadn't made changes remotely beforehand, this operation were rejected. Only after I added `pull` operation before `push` in my code, it worked.

While it should be a straightforward step to register this on `crontab` to automate regular `git` operation, it didn't work to my favor. I resorted to `launchd` instead, about which I wrote in a separate [article]({% post_url 2020-09-03-launchd %}).
