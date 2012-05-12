---
date: '2009-12-12 20:47:01'
layout: post
slug: console-log-for-all
status: publish
title: Console.log for all!
wordpress_id: '110'
comments: true
categories:
- browsers
- coding
- javascript
tags:
- browsers
- console
- console.log
- firebug
- javascript
---

{% img center /images/wp-uploads/2009/12/console.jpg 628 187 'Firebug console' %}


If you're like me then you probably use `console.log` a lot. It's such a useful debugging tool! It's better that alert in so many ways I won't bother mentioning them all because - oh what the hell, this is my blog I'll do what I want. Here is why `console.log` is better than alert:

* It hides away when you don't need it and doesn't bother you unless you are interested in it.
* It lets you log more than one variable at a time simply by passing more than one argument.
* It doesn't interrupt the flow of the script until you click OK.
  * Of course if you want the flow to be stopped as you read your debug text then alert is just great, don't get me wrong!
* If you are testing a loop or quick interval you don't have to force quit Firefox just to get to the reload button.
* It integrates perfectly with the rest of Firebug turning a lot of what you log into clickable items able to be inspected in the script or HTML tabs.`
* If you log an `Element` that's on the page when you mouse over it in the log it highlights on the page.

What's my point? Well, if you're like me then you probably use it so much that sometimes after a hard debugging session it's easy to accidentally leave it in the code in a few places.



## The piece of grit that stopped the clock

What harm can it do? Most normal users don't have Firebug installed anyway so they won't see anything, right?

Wrong. Or at least wrong attitude. Developers will see your `console.log`s on production code and no one will give you more grief about that sort of thing than a developer. But more importantly, it can affect everyone else too.

Without Firebug installed the `console` object doesn't exist. This means when you try to access `console` it comes up as `undefined`. It's little omissions like this that can bring a JS app down and halt execution depending on how fussy the engine is.

{% img center /images/wp-uploads/2009/12/erroronpage.gif 109 21 'IE's 'error on page' icon' %}


IE users will see the horrible little yellow exclamation mark in the bottom left of their browser and be informed that there is a problem with one of the scripts on the page. This doesn't inspire confidence in a site or product.



## Undesirable

It's fair to say that you don't want any of this to happen. Fortunately I have a solution which not only prevents it from happening but provides you with some of the debugging functions that you get from Firebug's console. Have a look at the code:
    
{% include_code console-log-for-all/console.log.js %}    
    

I'm using the [Glow](http://www.bbc.co.uk/glow) library to do this, go check it out it's really very good! (**Update:** although, now, sadly discontinued thanks to BBC cutbacks )

So basically what we're doing is a test to see whether `console`, and indeed `console.log` exist or not. If they do we don't need to bother. Let's presume that it _doesn't_ exist.

We then define `console` but the way we do it may not be familiar to some. Let's strip it back to make it easier to look at:


``` javascript Javscript
    window.console = function(){
    	return {};
    }();
```

I'm setting `window.console` instead of just `console` to clearly define the scope. `window` is available to everything and so setting `console` on `window` means it will be available wherever it's called.

It looks initially like I'm defining `console` to be a function but straight after the closing brace of the function you've got the open and close parentheses which runs the function immediately. This has the effect of setting `window.console` to whatever the function returns, which is in this case an object.

If, as in the case of the finished code, the object returned (`r`) has properties then they will be accessible at `window.console.property`. And of course, the property can also be a function, like `log`.



## Fully functional

The functions that are defined here are:

* `enable`
* `disable`
* `clear`
* `log`
* `init`

The console is disabled by default. This is to stop the console popping up for your poor IE users when they chance across that rogue `log` call. You have to _want_ the console on to get it. This doesn't mean it's completely ineffective when disabled, though. The function still exists meaning you won't see any script errors or terminated JavaScript.

To enable it, simple call `console.enable();`. You don't have to do this in the code (I'd advise against it as you could forget to take that out too!). Unless you are debugging specifically for IE and specifically for something that happens automatically on page load I'd recommend enabling it manually by typing `javascript:console.enable();` into the address bar and press enter.

Likewise to disable the console, just type `javascript:console.disable();`, or to clear it type `javascript:console.clear();`.

If you find yourself typing into the address bar a lot, you could drag one or more of these bookmarklets onto the bookmarks bar to make it easier:

[Enable console](javascript:console.enable(\);) [Disable console](javascript:console.disable(\);) [Clear console](javascript:console.clear(\);)

The reason I've included an `init` function is because Glow supports a [sandboxing feature](http://www.bbc.co.uk/glow/docs/articles/gloader.shtml#tocHeading1.13) it's useful to be able to pass a specific version of the library to `console` to use. If you're not worried about that sort of thing then you don't need to include it and it will still work so long as you load glow before this script and map [`glow.dom.get`](http://www.bbc.co.uk/glow/docs/1.7/api/glow.dom.shtml) to `$`.

Finally the `log` function is where the magic happens. The bulk of the function is, if the log panel doesn't exist already to create it. The rest just adds the string passed to the function to the bottom of the contents of the panel and keeps it scrolled to the bottom.

There's really not a lot to it!



## Got console?

Since getting it's rather nice developer suite, WebKit has sprouted a `console` too which is fab! It's accessible on Chrome and Safari under the developer menus. Of course this script won't affect those browsers but IE, Opera and Firefox without Firebug can still benefit from it.
