---
title:  "Bringing back remaining Battery time in Mac OS 10.12+ (not in 11.x)"
date: 2023-06-16
tag: Miscellaneous
tags: [mac, battery, sip]
description: How to let Mac OS to show remaining Battery time
---


> Disclaimer: Seeing how many years have passed since the debut of Big Sur (Mac OS 11.0), this article seems pretty old (originally, this was written in 2020). However, I hope it might be helpful for someone (incluing myself).


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

![](/images/BatteryMenu.png)

Done.
Et voila!