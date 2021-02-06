---
layout: post
title:  "Fixing iCal duplicates in MacOS"
categories: [misc]
tags: [mac, iCloud, iCal]
nav_order: 14
parent: Posts
---

Thanks to *iCloud* and many other cloud providers, **iCal** is the go-to app to manage one's schedule both professional and personal. That very fact means that you can view up-to-date schedule you've added on my *iPhone* and you can add in iCal on *MacOS* to view in your *iPhone* too.

However, it has come to my attention that every calendar of iCloud were in duplicates, which didn't happen in my iPhone, only in MacOS.

More specifically, it only happened after I upgraded to Mojave from El Capitan, lately.

After, searching the internet, I found the procedures as follows.

* Uncheck **Enable this account** from **Account Information** tab in *iCal*
* Quit *iCal*
* Run the following commands in *terminal*.
* Reopen *iCal*

Done.
Et voila!
