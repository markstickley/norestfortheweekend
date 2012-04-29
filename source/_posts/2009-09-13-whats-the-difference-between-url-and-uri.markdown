---
date: '2009-09-13 15:02:53'
layout: post
slug: whats-the-difference-between-url-and-uri
status: publish
title: What's the difference between URL and URI?
wordpress_id: '38'
comments: true
categories:
- internet
tags:
- isbn
- uri
- url
- urn
---

Good question, and something I've often wondered. You hear people using both terms the whole time so let's lay this one to rest.




So I'm sitting in this café writing some code and probably looking like a bit of a geek. Fair enough, th[viagra](http://atlantic-drugs.net/products/viagra.htm) happens. For various reasons I want to [have](http://cvsmailorderpharmacy.org/buy-kamagra-usa.html) a variable in my webapp's registry that stores the URL of the current page. Or is it URI? I'm at a bit of a loss on what to call it.




#### What is a URL?




URL stands for _Uniform Resource Locator_ which means it's a reference to a specific _location_. Importantly the location must be on the web, although this isn't indicated within it's name. More 




#### What is a URI?




In relation to a URL**a URI is like a superclass**. It stands for _Uniform Resource Identifier_ which means it's a reference to a specific _thing_. This thing could be just about anything addressable. For example a location on the web!




#### What's the difference really? Why don't we just use URL?




We should do if we are talking about web addresses! The distinction is that a URL provides information on how to get to the resource (Eg. http, https, ftp, mailto, etc). A URI can be relative (Eg. /path/to/file.jpg) or missing the protocol (Eg. //www.norestfortheweekend.com/2009/). These are both valid URIs but not URLs.




#### Hidden Extras




A URL _is a _ URI but a URI _is not necessarily_ a URL. We see this kind of relationship in programming with classes. Another 'subclass' of URI which not as many people have heard of is the URN.




URNs (Uniform Resource Name) start with `urn:` followed by a string identifying something. They are used for identification purposes rather than as a way of finding (locating) things as URLs are. Something that has some kind of universal identifier can be formatted as a URN. A good example of this is books. The majority of books at retail have an ISBN. The ISBN is their universal identifier; it doesn't point to where you can find the book, or contain any of the books subject matter. It just identifies it in a way that there is no confusion as to what you're talking about. 




An ISBN can be expressed as a URN: `urn:isbn:1582408181`.




For more wordy explanations, check out the wikipedia articles on [URIs](http://en.wikipedia.org/wiki/Uniform_Resource_Identifier), [URLs](http://en.wikipedia.org/wiki/Uniform_Resource_Locator) and [URNs](http://en.wikipedia.org/wiki/Uniform_Resource_Name)!



  *[ISBN]: International Standard Book Number
