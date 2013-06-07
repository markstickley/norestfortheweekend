---
layout: post
title: "Interviewing for CSS"
date: 2013-01-31 23:43
comments: true
status: publish
categories:
- css
tags:
- css
- interview
- question
---

One day in my previous job I was kind of dropped in it when my boss asked me at about 5pm to interview a potential new recruit at 11am the next day. I'd never been on that side of the table in an interview before. Considering how long I had got to prepare I was understandably a little nervous - and for good reason. When you're interviewing, not only do you have to display an excellent knowledge of the topics you are discussing but you also have to assess whether the person you are talking to possesses that same knowledge. If you do not do this well you are either rejecting a good candidate (which is bad) or hiring a bad one (which is worse).

I was told that the role was for a short contract and the successful candidate would be showing a little love to our badly neglected CSS, both tidying it up while also making sure the styles were rendering accurately according to the designs (plus a few extra tweaks here and there). So basically they had to be fluent in CSS-ese.


## Twitter saves the day again

When faced with a daunting task such as this, I did what any other self-respecting geek would do and turned to the all-knowing masses on Twitter.

Some brilliant people came to my rescue almost immediately and here are their responses:


<!-- "spell 'specificity' (and then explain it...)" -@rich13 -->
{% tweet https://twitter.com/rich13/status/200628477991464961 %}

I like this one because it's really getting back to basics. Not only do you have to know that specificity exists but you have to understand what it does and how it does it. The spelling part is a bit of fun - hopefully the candidate will understand that that's not the important part! Here's [an article on CSS specificity](http://css-tricks.com/specifics-on-css-specificity/) if you need a refresher.


<!-- I got asked the difference between display:none; and visibility:hidden -@mfujica -->
{% tweet https://twitter.com/mfujica/status/200629821737406465 %}

This is a nice one as well. It checks that they have some understanding about how the document flow works. You could follow this question up by asking if they know any other ways of hiding content and why they might want to do it that way instead.

The answer, of course, is that `display: none` removes the element from the document flow while `visibility: hidden` does not. Another way of hiding content (which is good for accessibility as it doesn't hide it from screen readers) is by using a negative margin. There are various drawbacks and other ways of achieveing this which might also be a good thing to discuss.


<!-- What is the default position of an element? -@mfujica -->
{% tweet https://twitter.com/mfujica/status/200630440720220160 %}

It is `static`. But it's not the most well-known property as normally we are changing the position *from* `static` *to* something else, like `relative` or `fixed`.


<!-- Explaning what inline-block is also should be a good -@mfujica -->
{% tweet https://twitter.com/mfujica/status/200631684956299266 %}

`inline-block` has only really been useful since IE started supporting it properly (around v8) and so while it's very handy, not everyone has used it.

An element with `display: inline-block` flows in the document like an inline element but allows you to apply styles to it that normally only apply to block-level elements such as `margin`, `width` and `height`.


<!-- what is CSS3? Draw an arrow head using borders. -@ralfas -->
{% tweet https://twitter.com/ralfas/status/200843040892518400 %}

I expect most candidates would ask for clarification or look confused at the first part of that question. That's fine, seeing their reaction allows you to gauge the way they might react to a poorly defined spec, for example. It's kind of open ended so they might simply say "It's the latest version of CSS". Others may list a few new features. If they're really smart they'll tell you that CSS3 hasn't been formally specified because it's still in development.

Drawing an arrowhead with borders requires the knowledge that when fat borders meet on adjacent edges they form a diagonal. Check out [this article](http://www.yuiblog.com/blog/2010/11/22/css-quick-tip-css-arrows-and-shapes-without-markup/) for more details. Alternatively you can ask them to [create a close button with pure CSS](/blog/2012/07/11/zero-image-close-buttons/) if you're feeling mean!


<!-- @markstickley @mfujica just make sure you know the answers yourself... -@timblair -->
{% tweet https://twitter.com/timblair/status/200633510950748161 %}

Yep :)


## Other ideas

### Vendor prefixes

I quite like an open ended question, particularly if it calls for some opinion. A lot of this industry is based on facts and rigid concepts that are either right or wrong so hearing someone's opinion and their ability to express it well could be the difference between a hire and a no-hire.

Simply ask them to explain vendor prefixes, what they're for and importantly whether they think they are a good idea, making sure to push them for both positive and negative points).


### Box model

Get them to explain [the box model](https://developer.mozilla.org/en-US/docs/CSS/box_model) to you. You're looking for a good understanding of the different parts that come into play, particularly how it can affect how wide an element will be (and how it won't always be the same width as its `width` value). This conversation can then lead onto [the `box-sizing` property](https://developer.mozilla.org/en-US/docs/CSS/box-sizing) introduced in CSS3. See if they know the default value for all element (`content-box`) and for bonus points see if they know which mode IE uses in Quirks Mode (`border-box`).


### SCSS

Of course these days CSS isn't quite as static as it used to be with code generators like [Sass](http://sass-lang.com/) and [less](http://lesscss.org/) becoming more and more popular. You can ask if they know about these technologies (and what they think of them). If you're using one in your business, you should probably have a few specific questions about it as well ;)

In favour of CSS generation, it is nice to be able to use a DRY methodology through mixins and inheritance, and it's even better to be able to define things once and use them many times throughout the document (like colours). Against it, the code generated can be quite verbose and it's typically hard to debug as looking at the compiled code gives you no indication where a rule exists (or was generated from) in the source.


### Implement {something} with no classes or ids

Finally, get them to code up some HTML and CSS for a small interface element (Eg. a tweet (including all the meta data around it)) but do it **without using classes or ids**. Ask them to use HTML5 and to use semantically relevant tags.

This task can take a while but it shows a lot about their thinking process.

* It shows they have a knowledge of HTML5 tags and semantic markup
* It forces them to improvise with the use of CSS selectors

There are many under-used selectors out there which would be perfect for this sort of task. Just [look at them](http://www.w3.org/TR/selectors/#selectors)! Do you know all of them? I know I don't, certainly not without looking. If you really wanted to test just their CSS skills then you could write the HTML for them in a way that would force them to use specific selectors. The sky really is the limit here... get creative!


## Any more?

If you've got any favourites (and I'm sure you have, whether they're questions you use or have had used on you), please stick them in the comments. I'd be really interested to hear them!

*[DRY]: Don't Repeat Yourself