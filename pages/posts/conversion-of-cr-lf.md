---
title:  "Converting CR/LF line ending for Unix-systems"
date: 2021-06-22
tag: Miscellaneous
tags: [vi, windows, unix]
description: How to convert line ending created in Windows for Unix-systems
---

## What's the problem?
Unknown to most end-users except (cross-platform) developers, Unix-based systems and Windows have adopted different sytems how they treat line ending of some texts. Technically, Unix-based systems (including Mac OS and Linux) use LF (Line Feed) while their counterparts use hybrid version called CR/LF (Carriage Return / Line Feed). CR/LF takes 2-byte chars while Unix's version use half of that.

Because of this, when a script authored in Windows deployed into Unix without any modifications, unexpected errors might occur. Specifically, Unix doesn't understand an additional special character which is used in Windows for line change (Carriage Return).


## Any solutions?
Fortunately, we don't need to open the editor to modify the ending to conform with Unix-style. Rather, we can just run this single script to remove carriage return (`\r`).

```bash
sed -i.bak 's/\r$//' file.sh
```

Here, `sed` command takes care of what we want to do. Given a shell script called *file.sh*, it removes carriage returns in-place (**-i**) and backs up to *.bak* extension files.

Source: https://askubuntu.com/questions/803162/how-to-change-windows-line-ending-to-unix-version
