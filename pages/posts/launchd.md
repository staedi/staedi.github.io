---
title:  "Using Launchd on Mac!"
date: 2020-09-03
tag: Miscellaneous
tags: [mac, git, launchd, crontab]
description: An intelligent way to schedule jobs on Mac
---

It is often said that `crontab` is the simplest tool to set up a scheduling job on Unix-based systems including Mac. However, from my own experience, I learned a lard lesson that how could that supposedly simple job is not indeed.  

Obviously, it should be. The process should be as straightforward as the word simple says.

The culprit was the way how `crontab` works.

Specifically, It doesn't respect the **PATH** you set on `bash.sh` nor the location where your desired script is located. More importantly, using **Git** was pain in my neck.

Despite my efforts to make it work, I couldn't let the script to make **simple** *pull* and *push* operation.


So, here comes `launchd` on Mac.

The main idea is the same - make a `.plist` extension file detailing scheduling jobs information into `~/Library/LaunchAgents` folder. Then, use `launchctl load` command to load the job into the scheduler.


First off, plist file structure are as below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.launchd.cron</string>
    <key>ProgramArguments</key>
        <array>
            <string>bash</string> <!-- This line isn't required if *.sh is already executable -->
            <string>/Users/minpark/Documents/Github/nCOV-summary/cron_nCOV.sh</string>
        </array>
    <key>StartCalendarInterval</key>
    <dict>
      <key>Hour</key>
      <integer>15</integer>
      <key>Minute</key>
      <integer>00</integer>
    </dict>
  </dict>
</plist>
```

As the **StartCalendarInterval** section implies, the job is to be run daily at 3PM. For the launchd process, you set `string` value of `Label` section to be com.launchd.*xxx*, which is the filename of the file itself excluding the `.plist` extension.

Now, to register the job to `launchd`, as I mentioned earlier, you run the following commands on `Terminal` in the `~/Library/LaunchAgents` folder.

```bash
launchctl load com.launchd.cron.plist
```

When you want to unregister, you just **unload** rather than **load**.

```bash
launchctl unload com.launchd.cron.plist
```

To check whether your desired job is registered indeed in `launchd`, you run the following.

```bash
launchctl list | grep com.launchd.cron
```

Here's what is shown in my terminal.

```bash
-	0	com.launchd.cron
```

First *dash* character means there's no currently running job, and the number 0 indicates the job ended successfully without any errors. When error occurs, a *positive* number will show up instead of 0.


For scheduling simple shell scripts, `launchd` doesn't have much advantage. Rather than writing one line in `crontab -e` command, you have to write down multi-line xml-type file. However, when it comes to Git, this can make your job a lot easier than `crontab` and that's where `launchd` shines.
