---
layout: post
title: "Moving from Wordpress to Octopress"
date: 2012-05-12 15:34
comments: true
status: publish
categories: 
- blogging
tags: 
- blogging
- wordpress
- octopress
- ruby
- git
- github
---

My Wordpress install kept disabling all the plugins. No idea why. Because I don't browse my own blog too regularly (especially with the regularity of posts I've been writing recently) the only indication I had was when I started getting lots of spam comments thanks to the lack of [Askimet](http://akismet.com/).

When [a colleague](http://www.twitter.com/elduderino78) mentioned Wordpress recently, in particular how he would never use it in a million years, I asked what he would use instead thinking perhaps something like [Tumblr](http://www.tumblr.com), [Blogger](http://www.blogger.com), [Posterous](http://www.posterous.com) or something similar. Instead, he suggested something decidedly more... _fishy_.


## Octopress

[Octopress](http://octopress.org/) is a very neat little blogging environment. You write your posts in [markdown](http://daringfireball.net/projects/markdown/) and then run a little rake script to generate your blog. The files generated are static HTML files which is great for performance and caching.

The blog's structure is generated from templates and the CSS is generated using [SASS](http://sass-lang.com/) so you get all the benefits of a dynamically generated site but none of the overheads. As if that wasn't awesome enough, it's virtually seamlessly integrated with GitHub and [GitHub Pages](http://pages.github.com/), so you write locally, generate and then deploy with another rake script.


## Migrating from Wordpress

To get all my stuff out of Wordpress I used Wordpress' own export function to generate an XML document of all the posts and metadata. Then I used [exitwp](https://github.com/thomasf/exitwp) to convert the XML to markdown, which worked OK. That converted everything except comments. Generating static files means that comments are not really possible natively but Octopress has built in support for [Disqus](http://disqus.com/) which works seamlessly. This does mean that the old comments are lost but you know what they say: you can't make a seafood paella without chopping up a few octopi.

It wasn't all plain sailing though.


## This almost seems like work

I noticed as I clicked through some of the generated markdown files that some scamp had been at my articles and inserted spam links directly into the articles! Honestly, I was getting more and more glad to be moving from Wordpress by the minute. This did mean I had to read each of them through to make sure there wasn't anything in there I didn't want. 

Reading through your old blog posts is hard. There's stuff that doesn't matter any more, there's stuff that's just plain inaccurate, there's stuff which sounds really goofy reading back 3 years later. I tried my hardest not to change the content in them and for the most part I managed for historical reasons to preserve it.

As I was going through each article I adjusted the formatting of the markdown making sure the heading level was correct, the line spacing was correct, the code correctly marked down etc. All the usual OCD stuff that needs doing once you know it's there.

I had been using a plugin to handle media on Wordpress so images were kind of messed up and I had to copy all the images and reformat all the image tags by hand. I was so glad I hadn't written all that many articles! Keeping it really simple in markdown seems so sensible I can't believe we didn't always blog like this.

The last thing that needed doing was to give it more of the look and feel of the old site. The default theme, _classic_, is very nice but I'm rather fond of that little pixel dude in the header. Plus I got to try out a friend's clever [CSS Patterns Workbench](http://glan.github.com/CSS-Patterns-Workbench/) to create the background in pure CSS instead of images.


## CNAME. CNAME RUN.

One last awesome thing: GitHub Pages support domains. By setting your CNAME to point at the page (or the A tag if it's the whole domain, not just a subdomain) you can point your site to GitHub Pages and have the whole thing hosted for free, no bandwidth charges or anything. I love you GitHub.


## Verdict

I'm so glad I'm not using WordPress anymore. Wordpress blogs are such a target for hackers and spammers and I was hit several times over. I tended to keep fairly on to of the updates as well, so you can image how bad it might be for people who don't bother. If anyone wants to hack this blog now they have to hack my GitHub account. Of course having [the whole blog on GitHub](https://github.com/markstickley/norestfortheweekend) has it's advantages too... if you like you can correct any mistakes or typos by submitting a pull request!