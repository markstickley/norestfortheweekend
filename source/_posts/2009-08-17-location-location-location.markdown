---
date: '2009-08-17 14:37:34'
layout: post
slug: location-location-location
status: publish
title: Location, Location, Location
wordpress_id: '10'
comments: true
categories:
- coding
- javascript
---

All this time, I've been happily using `window.location` in my code, but I never knew it's dark secret!


#### When is a string not a string?


This may come as a surprise to some, but `window.location` is not a string. The reason this isn't immediately obvious is that if you do this:

    
    alert(window.location);


...you will see the address of the current page.

However, say you wanted to extract the protocol of the current page. You might try something like this:

    
    var loc = window.location;
    alert(loc.substring(0,loc.indexOf(':')));


But this will fail! Firebug will tell you that loc.indexOf is not a function... but if it's a string it should inherit that function automatically!

In actual fact, `window.location` is an object of type `Location`. It has several properties:



	
  * `hash` - the bit of the URL including and following the # symbol

	
  * `host` - the host name and port number

	
  * `hostname` - the host name without the port

	
  * `href` - the whole URL, unmodified

	
  * `pathname` - the path, that comes after the host including the first /

	
  * `port` - the port

	
  * `protocol` - the protocol

	
  * `search` - the URL parameters, including the ?


So actually if I wanted to get the protocol, there's no need at all for string manipulation because it's all there separated out rather handily:

    
    alert(window.location.protocol);


The question is: how and why does `window.location` produce a string when you should have to type `window.location.href`? The answer: `toString`.


#### toString or not toString?


`toString` is a 'magic' function which you can add to an object to make it behave a bit more gracefully. If you run this code then you will simply get `[object Object]` back in the alert box:

    
    var myObj = {
        'var1': 'foo',
        'var2': 'bar'
    };
    alert(myObj);


If you modify it slightly to include a function called `toString` you will see a lot nicer results.

    
    var myObj = {
        'var1': 'foo',
        'var2': 'bar',
        'toString': function(){
            return this.var1+' '+this.var2;
        }
    };
    alert(myObj);


This code alerts 'foo bar' as you might expect. In the case of `window.location`, I would imagine the `toString` function would look something like this:

    
    window.location.toString = function(){
        return this.href;
    }


`toString` functions are particularly useful if the object represents an actual thing, rather than simply a collection of data (Eg. a location, a user, a tweet, etc.).


For more information on the `Location` object, have a look at this [Mozilla developer document on `window.location`](https://developer.mozilla.org/en/DOM/window.location).