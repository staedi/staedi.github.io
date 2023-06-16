---
title:  "Fixing iCal duplicates in MacOS"
date: 2023-05-29
tag: Miscellaneous
tags: [mac, ical, icloud]
description: Fix iCal duplicates with iCloud on
---

Thanks to *iCloud* and many other cloud providers, **iCal** is the go-to app to manage one's schedule both professional and personal for Apple Users. That very fact means that you can view the up-to-date schedule on your *MacOS* you've added on your *iPhone* or vice versa.

However, it has come to my attention that some of schedules on *Mac* were in duplicates, which didn't happen in my iPhone, only in MacOS.

After, searching the internet, I found the procedures as follows.

* Uncheck **Enable this account** from **Account Information** tab in *iCal*
* Quit *iCal*
* Run the following commands in *terminal*.
* Reopen *iCal*

```bash
sudo rm -Rf ~/Library/Calendars/*
sudo rm ~/Library/Preferences/com.apple.iCal.plist
sudo rm -Rf ~/Library/Caches/com.apple.iCal
```

Done.
Et voila!