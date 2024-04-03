---
title:  "Automation with iOS's Shortcut (formerly Workflow)"
date: 2024-03-03
tag: Miscellaneous
tags: [ios, shortcut, iphone, workflow, automation]
description: Implment automation with iOS's Shortcut
---


## Shortcut and Workflow

Shortcut was included starting iOS 12. This seemingly generic noun,  formerly called Workflow, was a paid app. After Apple acquired the app, as it has been with other apps before, it became free and was included in iOS.

While I never got a chance to use Workflow, from what I heard, the term, Workflow, served its geeky purpose, workflow automation.


## So, what is Shortcut, then?

In terms of the App name, compared to its predecessor, Shortcut does not seem too geeky. 

With Apple's boasting Siri integration, which many argue that long way to go, Shortcut enables users to automate or do actions just like asking Siri to do actions in iOS.


## Some examples

In Gallery tab of Shortcut app, there are bunch of examples available for you. It is based on your typical usage of iOS devices.

While some of them might satisfy some use-cases, few of them sufficed my needs.

* Send message to a friend (I can do that by myself)
* Call mom in the afternoon (also)
* Open Google Maps to see the direction to Work (I just open the Google Maps and tap Work by myself)

While most of examples are pretty generic, there are some actions warrant a notice.
For instance, You can set a timer when you leave some area (e.g., workplace).
I used to use this one to set a timer for lunch (when I eat out of the office).

Beware that this location-based action needs location permissions and also it starts to work when you are out of at least 1km away from your location of interest.


## Sophiscated workflow?

While those examples could satisfy for some, I am pretty demanding in terms of task automation.
Specifically, as its predecessor was Workflow, I wanted to automate some work-related reminder based on my calendar events.

For instance, if my work starts at 11 am rather than 9 am, which I had entered into iCal, I want my reminder to remind me at work start time.

This was never a easy ride.
Given my demands and being done on the mobile device, it was quite understandable.

Some scenarios I wanted to solve:
* If I take a day off, update reminder settings one day later
* If there is no reminder setting for today (weekend work), create one for me
* If there is a change of work schedule, change the reminder according to the work schedule 
* If today's reminder set as irregular time (due to one day shift from yesterday), set it to regular schedule
* I need to be reminded when to check-in/-out, go to lunch and back to work, and finally take a break and get back.

This is pretty normal workflow we would code in computers, but not with these simplied workflow apps.

Particularly as it doesn't support native programming like we do with generic programming languages, we have to choose modules and drag them to arrange the flow.

This really reinforced the basic concept of programming, making codes as modular as possible.

This is because, to make all my demands possible, I needed to use more than 70 actions, which was literally impossible to arrange.
By splitting one huge workflow to several ones with accepting parameters from other ones, it could run smoothly.


## Final results

### Automation

With the rigorous automation, this is the main runner for the automation. Previously, this included more than 60 actions inside.

![Automation](/images/readwrite.png)

### Modules (Shortcuts)

Here, shortcuts are what constitute the automation flow. As it can be seen from the number of actions, the automation is pretty operation-heavy.

![Modules](/images/readwrite.png)

### Sample shortcut

Just a small fraction of the heaviest module.

![Shortcut](/images/readwrite.png)
