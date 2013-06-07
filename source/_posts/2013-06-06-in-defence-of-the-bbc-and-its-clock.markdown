---
layout: post
title: "In Defence Of The BBC And Its Clock"
date: 2013-06-06 23:00
comments: true
status: publish
categories:
- development
tags:
- development
- news
- bbc
- clock
---

The BBC has said that due to a single person complaining, [they will be removing the clock from the home page](http://www.bbc.co.uk/news/entertainment-arts-22768861). The news has been reported fairly widely, particularly through technology channels, and people have been very vocal about their feelings on one particular point:

* How could it possibly take 100 days to fix the problem?

Having worked for the BBC for 4 years I would agree on that estimate, and I'll explain why. First, I need to explain a little about the BBC some of the history surrounding the clock.


History
-------

{% img center /images/posts/2013/06/06/in-defence-of-the-bbc-and-its-clock/clocks.jpg 790 592 'The BBC clock through the ages' %}

The [BBC clock](https://www.google.co.uk/search?q=bbc+clock&tbm=isch) has been around for a long time. It has had many incarnations and is an integral part of the BBC's history. It first appeared on BBC1 as an actual clock with a camera pointing at it, and then digital representations in the same style appeared. During a major redesign of the BBC home page it was lovingly recreated in Flash as an homage to this iconic timepiece.

A subsequent redesign removed the clock from the home page but due to an outcry from regular visitors to the site it was reinstated, and rewritten to use the modern `canvas` HTML element with Flash as a fallback to give the best available experience.


The Trust
---------

The [BBC Trust](http://www.bbc.co.uk/bbctrust/) is an independent body who governs the BBC and is intended to act in the best interests of the licence fee payers (for the benefit of international readers, everyone in the UK who owns a TV must pay a yearly fee which mainly funds the output of the BBC which is broadcast ad-free). This basically means that the Trust have final say in matters such as this. A single complaint such as this can out-weigh the opinions of many if the Trust feel that the BBC is not upholding its core values.

One of the core values of the BBC is to never knowingly broadcast inaccurate information. As the clock is on the BBC home page, it looks like that information comes from the BBC, and therefore should be accurate. As the time displayed actually comes from the user's computer it has the potential to be inaccurate and therefore make the BBC home page inaccurate, and that is unacceptable.


Breaking down the problem
-------------------------

As the clock has been criticised for its accuracy, a fix that makes it anything less than perfect for every single user would be unacceptable. Here are the facts:

1. As already established, you can't trust the user's clock.
2. The site is not restricted to people within a single time zone, the clock will have to display the correct time according to the time zone the user is in.
3. As we can't trust any time information on the user's computer(1), we can't rely on their computer to provide a time zone automatically.
4. Getting a user's location by IP address is never 100% accurate, particularly when using mobile broadband so we can't use that.
5. This leaves us with only one option (since we can't rely on every device having GPS built in) - the user must manually provide their time zone, which can be stored in a cookie or a similar client-side storage mechanism.
6. To make the clock accurate if they move time zones, or if they have not yet provided a time zone, the time zone must be displayed along side the clock.

Now that the facts are clearer the problem can be broken down.

**User Experience & Design**:

* How should the time zone be displayed next to the clock?
* How does the user know they can change it?
* How does the interaction to change the time zone work / look?
* Does this all fit within the BBC's UX guidelines?

These are all decisions that will need consideration and questions that will need answering before at least some of the development starts. Design documents will be created in order to accurately pass on the outcome of these decisions to the developers.

UX&D will also perform some user testing to make sure the solution is easy to use and understandable. There may also be accessibility testing to ensure disabled users can still get the most out of the site possible including use of the clock.

**Development**:

* How do we build this so that the home page retains its current high level of cachability which is necessary for the load the BBC experiences?
* How do we deliver the time accurately to the end-user?
* How do we minimise load and rendering times on the home page?

When you have a site with as much traffic as the BBC there is a strong need for a good caching strategy to avoid overloading the servers and mitigating downtime. When it comes to delivering the time, one option would be to embed it in the body of the page, but this would mean that the cache would have to be regenerated every second which is an inefficient solution. There is the possibility of using post-cache/edge includes to insert the time with placeholders but this would be on every request and even more inefficient.

Logically then, you would need a separate AJAX call to get the current time. This could result in a short period of time when the clock displayed no time at all before the time had loaded which would look bad. This would have to be referred back to UX&D for approval.

To serve the accurate time the BBC would need to set up one or more time servers capable of handling the constant load of every single person who visited the home page. Not only would the servers need to maintain perfectly accurate time but they would need to deliver it to the user in a fraction of a second wherever they were in the world.

Because any request that took longer than 1 second would make the clock inaccurate there would have to be a series of servers at various locations around the world capable between them of delivering a latency lower than 1 second to any country. This would take some setting up, particularly if you want to defend against DDoS attacks.


100 days?
---------

Given the complexity of the task, the number of different teams & discipines involved, the infrastucture and the attention to detail required, perhaps 100 days doesn't seem that mad after all. I don't think so.


**Update 07/06/2013**:

I've been made aware of [NTP](http://www.ntp.org), which provides a mechanism of transmitting an accurate time across a network. However, (according to the FAQ it can take up to 5 minutes to determine the time accurately)[http://www.ntp.org/ntpfaq/NTP-s-algo.htm]. This is because it has to make multiple requests to sanity-check the result and ensure latency isn't affecting the time.

I doubt many people will remain on the home page for 5 minutes and since the page would not have access to set the time of the user's computer clock the process would have to start from scratch each time the page loaded.



*[UX]: User Experience
*[UX&D]: User Experience & Design
*[DDoS]: Distributed Denial of Service
*[IE]: Internet Explorer
*[AJAX]: Asynchronous Javascript And XML
*[BBC]: British Broadcasting Corporation
*[HTML]: Hypertext Markup Language
*[NTP]: Network Time Protocol