---
layout: post
title:  "Fixing iCal duplicates in Mac OS"
last_modified_date: 2021-02-06
categories: [misc]
tags: [mac, iCloud, iCal]
---

Thanks to *iCloud* and many other cloud providers, **iCal** is the go-to app to manage one's schedule for both professional and personal uses (Apple Devices Users only, obviously). That very fact means that you can view up-to-date schedule you've added on my *iPhone* and you can add in iCal on *MacOS* to view in your *iPhone* too.

However, recently, it came to my attention that every calendar of iCloud were in duplicates, which didn't happen in my iPhone, only in Mac OS.

More specifically, it only happened after I upgraded to Mojave from El Capitan, lately.

After, searching the internet, I found the procedures as follows.

* Uncheck **Enable this account** from **Account Information** tab in *iCal*
* Quit *iCal*
* Run the following commands in *terminal*.
* Reopen *iCal*

Done.
Et voila!
