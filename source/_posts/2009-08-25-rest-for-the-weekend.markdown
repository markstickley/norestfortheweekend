---
date: '2009-08-25 16:05:20'
layout: post
slug: rest-for-the-weekend
status: publish
title: REST For The Weekend
wordpress_id: '24'
comments: true
categories:
- coding
- html
tags:
- architectures
- crud
- html
- mime
- rest
- restful
---

Oh well, the weekend's over again. What did you do? I got an impressive sunburn, bought some delicious fruit and veg at the market and looked into RESTful architectures, among other things. Although I would love to tell you about my culinary adventures, what I'm going to write about now is REST. It should be noted that in this case REST is not sitting in front of the TV and has nothing to do with the title of this blog, despite what you may think!



## What REST is not

There seems to be some confusion over exactly what a RESTful architecture is. Some people think it is pretty URLs:

    http://www.mysite.com/portfolio/design/someclient

as opposed to:

    http://www.mysite.com/index.php?section=portfolio »
        &subsection;=design&client;=someclient

This is not RESTful.

Some people think REST is a bunch of actions triggered by visiting URLs:

    http://www.mysite.com/contact/email/send

This isn't RESTful either.



## Being resourceful

REST stands for **RE**presentational **S**tate **T**ransfer and it's all about resources. That is to say, data presented in a formatted way and made available at specific, addressable points of entry. Most of the time when people talk about a REST interface they will be talking about the web and URLs, but REST is not limited to this technology. So long as each resource on a system can be identified uniquely, manipulated, each request for resources includes enough information that the client knows how to process it and has the ability to contain references to other resources then it can be called RESTful.

A RESTful system is a stateless system; each resource request in a RESTful system should be completely independent of any other. It should not rely on cookies, session variables or any other state maintaining solutions. This is because a REST request is intended to be performed on the current state of the specified resource and the resource should be able to be encapsulated in a single response.



## Strict instructions

It might have slipped under the radar but a couple of paragraphs above I mentioned that a REST response should include information for the client on how to process the data. In the case of a web service (and it should be assumed from here on out I'll be talking about web services) the [MIME type](http://en.wikipedia.org/wiki/MIME_type) should be sufficient. For example, if you are serving your response up as JSON you'd want to use the **MIME type**: `application/json`. The **MIME type** is contained within the header of the response.

In a similar manner, the client needs to tell the server what it wants to do with the specific resource. We can do this by specifying the correct [HTTP Method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) as part of the request.



## Method in madness

So the HTTP methods most people are used to are: `GET` (the default method, what you get when you hit enter after typing a URL) and `POST` (the method used for submitting most forms). The others we are interested in are `PUT` and `DELETE`. Using these four methods we can instruct a RESTful interface to perform the basic CRUD operations:

* **C**reate = `POST`
* **R**ead = `GET`
* **U**pdate = `PUT`
* **D**elete = `DELETE` (rather unsurprisingly)

Using these methods you can manipulate a resource in any way you like from that single addressable entry point. If you have the URL for the resource, in a RESTful architecture you know you won't have to append strings to the URL to make it do things (Eg `?action=delete`) - you just change the method used to request the resource in the request header.

Obviously if your system is externally accessible you will probably want to limit access to the 'unsafe' `POST`, `PUT` and `DELETE` methods.



## Not for everyone

So as you can tell, REST isn't something you should strive to include just for the sake of it. I can't stress this enough: _there's no point in shoehorning REST into a site or project when it is not really needed_. The main use for it it most likely to be for Web Service APIs and anything that is highly resource driven. Think of it as a series of defined views on a database or other resource and you can't go too far wrong.

I am currently working on a web based file system for storing assets as part of a CMS. It has an API so that you can add, edit, read and delete assets from external locations, providing that you present the right credentials. This almost seems like the perfect application for REST as each entry - be it a file or a folder - needs to have the basic CRUD operations performed on it. The whole URL structure is basically the directory tree and every point in that tree is addressable and will accept all the different methods.



## Testing, testing

This is all very well, but how do you go about testing these crazy HTTP methods, practically? You can't have a page full of links to click because a link is a `GET` request. There's no way of changing that. 

Forms offer a little flexibility - you can specify the method you want to use with the method attribute. Unfortunately this is restricted to `GET` and `POST`. If you try anything other than that it will default to `GET`.

To test these request methods, you have to hand craft an HTTP request. You can do this in the server-side scripting language of your choice (Eg PHP, Ruby, Python etc) _OR_ you can download one of the handy Firefox extensions that kindly developers have made available for nothing for this very purpose! My personal favourite is [RESTClient](https://addons.mozilla.org/en-US/firefox/addon/9780) by [Chao ZHOU](http://www.porphyry.org/) but there are plenty of others for you to choose from. Here are a few:
	
* [Poster](https://addons.mozilla.org/en-US/firefox/addon/2691) by [Alex Milowski](http://www.milowski.com/)
* [RESTTest](https://addons.mozilla.org/en-US/firefox/addon/5946) by [kriszyp](http://www.xucia.com/)
* [Modify Headers](https://addons.mozilla.org/en-US/firefox/addon/967) by [Gareth Hunt](http://www.garethhunt.com/)



## Using RESTClient

It's pretty simple really. The basic interface looks like this:

{% img center /images/wp-uploads/2009/08/restclient.gif 618 603 'The RESTClient interface displays fields for method, url, header and request body along with an area in which to display the response. At the top are controls to open & save your request amongst other things.' %}

1. Choose your request method
2. Type the resource location
3. Add any request headers you need (this is like items from form fields)
4. Type the request body you want to transmit (this can be left blank most of the time)
5. Hit send

What you will get back is the response as the server sends it. You can inspect the header and the body to make sure it's coming back as you'd expect and so your application that will consume the response won't get any nasty surprises!

Hopefully you are interested in RESTful architectures now, and are feeling inspired to go off and write one of your own!



## Footnotes

For more information on this topic, check out the [Wikipedia article on REST](http://en.wikipedia.org/wiki/Representational_State_Transfer)

*[CRUD]: Create, Read, Update, Delete
