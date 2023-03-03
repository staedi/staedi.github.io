---
title:  "Using Launchd on Mojave or later"
date: 2021-02-13
tag: Miscellaneous
tags: [mac, launchd]
description: An introduction to use Launchd on macOS 10.3+
---

In previous [article](launchd), I mentioned the use of `launchd` on Mac in place of `crontab`. In that post, I showed how one create the `.plist` file and register with `launchd`. 

While it worked perfectly on **El Capitan**, after I installed **Mojave**, the same script complained about ownerships.

That is, it displayed the following message.

> *Path had bad ownership/permissions*

WHAT? I've never seen messages like this on **El Capitan**.

It turned out that Apple beefed up the security, thereby annoying users requiring strict permissions than on its precedessors. (System Integrity Protection, or **SIP** for instance)

Both the culprit and solution were simple. The `.plist` files I copied from El Capitan had **Read & Write** permissions for non-owner, not **Read** only. 

![Before](https://github.com/staedi/staedi.github.io/raw/main/images/readwrite.png)

Naturally, the solution was stripping **Write** permission away from but the owner.

![After](https://github.com/staedi/staedi.github.io/raw/main/images/read.png)