---
layout: post
title:  "Bring back remaining Battery hours in MacOS 10.12+"
last_modified_date: 2021-02-06
categories: [misc]
tags: [mac, Battery, SIP]
---

Unbeknown to Mac users who are still using *El Capitan* or earlier versions of Mac OS, Apple killed off **Remaining battery indicator** in the menu.
As a long-time user of that specific version, I was in the dark until I decided to update to *Mojave* this week.

While not so satisfactory compared to its responsive early sibling, I'm in the process of getting accustomed to this new environment.

However, no battery indicator could have been deal-breaker. Admittedly, while it can be unreliable, it's pretty useful and even essential one. I wouldn't care if I used the desktop version, either *Mac Mini* or *iMac*, but I'm not using them.

Thankfully, after some researching, I found out that I copy the file from *El Capitan* or earlier version, I can enjoy the same functionality as before.

Procedures are simple enough.

* Back up `Battery.menu` file from previous version, which is located at `System/Library/CoreServices/Menu Extras`.
* Restart Mac in *Recovery mode* (`⌘+R`) and **Disable SIP** by running `csrutil disable` in **terminal** (Enable after copying).
* Restart and copy `Battery.menu` file into `System/Library/CoreServices/Menu Extras`.
* Run `killall SystemUIServer`, which will reload menu items.

![](https://github.com/staedi/staedi.github.io/raw/main/images/BatteryMenu.png)

Done.
Et voila!
