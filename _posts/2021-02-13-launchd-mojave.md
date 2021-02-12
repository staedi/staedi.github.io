---
layout: post
title:  "Using Launchd on Mojave or later"
categories: [dev]
tags: [mac, launchd]
---

In previous [article]({% post_url 2020-09-03-launchd %}), I mentioned the use of `launchd` on Mac in place of `crontab`.

In that post, I showed how one create the `.plist` file and register with `launchd`. 

While it worked perfectly on **El Capitan**, after I installed **Mojave**, the same script complained about ownerships.

That is, it displayed the following message.

> Path had bad ownership/permissions

WHAT? I've never seen messages like this on Mojave.

It turned out that Apple beefed up the security, thereby annoying users requiring strict permissions than on its precedessors.

Both the culprit and solution were simple. The `.plist` files I copied from El Capitan had **Read & Write** permissions for non-user, not **Read** only. 

![Before](https://github.com/staedi/staedi.github.io/raw/main/images/readwrite.png)

Naturally, the solution was stripping **Write** permission away from non-owner.

![After](https://github.com/staedi/staedi.github.io/raw/main/images/read.png)