---
date: '2011-02-14 01:45:49'
layout: post
slug: the-web-in-3d-the-nintendo-3ds-web-browser
status: publish
title: The Web in 3D - the Nintendo 3DS web browser
wordpress_id: '156'
comments: true
categories:
- browsers
- coding
- css
- design
tags:
- 3d
- 3ds
- browser
- css
- media queries
- media query
- nintendo
---

The Web in 3D - the Nintendo 3DS web browser

Last Sunday my wife and I went and had a sneaky preview of the new games console from Nintendo: the [3DS](http://www.nintendo.com/3ds).

[![The Nintendo 3DS](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/nintendo3dswithpen.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/nintendo3dswithpen.png)

Let's not beat around the bush: this is a very impressive device. It's tricked out with all the latest technologies (or the latest applications of 'old' technologies, wherever you choose to draw the line). The thing people are really talking about, of course, is the 3D aspect of it. I'm sure you have read about it - the top screen is a 3D display which importantly doesn't require glasses. I can't stress enough how good the 3D effect looked. It felt completely natural and I didn't find myself getting any kind of a headache or nausea like some people are worried about.

There were demos available of most of the functionality: Lots of games that'll be available on launch or shortly thereafter, 3D photography, augmented reality (including the 'reality' part shown in 3D due to the 3D cameras on the lid - the most impressive thing for me) and street pass (Nintendo's social discovery system). But the thing that actually holds the _most_ interest for me _wasn't_ shown and indeed is barely talked about. I'm hoping that will change.




### A complex web



I'm talking, of course, about the web browser which will come built in to the device as part of the extensive suit of software bundled on-board.

*YAWN*

A web browser? What's so great about that?

I don't know yet because no-one is talking about it, but I'm _hoping_ it will inspire (even more) innovation and creativity on the web. I'm hoping it will have some semblance of 3D integration and capability. And if not, why not? Surely this is the way the web is going. More and more devices will be 3D enabled in the near future and you can bet that if the 3DS doesn't kick-start the 3D web some other device will. You can buy a 3D TV to put in your living room for crying out loud - this is 2011! They reckon you'll be able to buy a [HOLOGRAPHIC 3D TV](http://news.bbc.co.uk/1/hi/programmes/click_online/9393762.stm) in 2012. I'm all over that. And I want the web to make sure it isn't left behind. After all, a lot of modern TVs have integrated browsers. It's the next logical step.




### Least they could do



The least I could hope for is support for 3D images displayed in web pages. The **LEAST**. The standard open format is [.mpo](http://en.wikipedia.org/wiki/Image_file_formats#MPO) and fortunately [the same format in which the 3DS saves it's 3D photos](http://nintendo3dsblog.com/the-3d-camera-in-the-nintendo-3ds-saves-photos-in-the-open-mpo-file-format).

That's not to say you will be able to simply embed the 3D photos in your site and have them work in the 3DS' web browser though. Think how that would look in a desktop browser... Well it probably wouldn't show up or show a broken image.

No, no, no, don't even think about making a separate site for 3D devices. I thought we were past all that. What are you going to have yet another separate site for 3D+Mobile? We want to serve one page that works on all devices.

The trouble is, without images having a similar failover pattern to the one available to [video and audio in HTML5](http://dev.opera.com/articles/view/everything-you-need-to-know-about-html5-video-and-audio/), you simply couldn't use the image inline in your page as non-3D-enabled browsers wouldn't recognise the format. This just proves that there are always new image formats emerging; they are not all supported by all browsers as it's easy to assume (if you forget about IE6 and .png's) so why should we assume that that's the case with the markup?

[This has been discussed by Bruce Lawson](http://www.brucelawson.co.uk/2010/why-video-audio-canvas-arent-self-closing-tags/) and makes sense (no matter how frustrating it is). So until all browsers support the display of 3D images on 2D screens we will have to find another way.

The other way to include images in the page is, of course, CSS background images. This one has legs. The 3DS browser could easily respond to an @media query, something like `@media screen and (-3ds-min-device-spatial-dimensions: 3) { ... }`. Then you could alter how the page looks on a device that has 3D capabilities. Once you have the 3D background image in place you can mark it up to include a 2D version for the rest of the world:

HTML:


    
    
    <div class="forest-picture">
        <img src="/static/img/forest-2d.jpg" alt="Pretty forest scene" height="250" width="400"></img>
    </div>
    



CSS:


    
    
    @media screen and (-3ds-min-device-spatial-dimensions: 3) {
        .forest-picture{
            background: transparent url(../img/forest-3d.mpo) no-repeat 0 0;
            width: 400px;
            height: 250px;
        }
        .forest-picture img{
            display: none;
        }
    }
    



The best of both worlds! We can dream...




### Reality check



Before we go on, I just need to make it abundantly clear (if it isn't already) that this article is pure speculation. I don't know if the 3DS browser supports any of this kind of stuff, but imagining the possibilities and how they might work is an interesting exercise. Oh wait, it looks like [Google has already looked into 3D browsing](http://www.google.com/intl/en/landing/chrome/cadie/). My mistake ;)

Let's explore further down the rabbit hole...




### Going the extra dimension



What if we wanted to move beyond just sticking 3D images in our pages? As awesome as a 3D gallery might be, there are so many more possibilities. Imagine if the whole page could be rendered in 3D; if each element on the page had it's own depth setting. I think the most obvious thing to do would be to push the background actually into the background giving the site content more prominence, and if you start down that road you should just be able to let your imagination carry you forwards.

I know what you're thinking, and it's what I thought at first too... why not use `z-index` for that? The reason why not is because `z-index` controls the stacking order of elements on a single plane. If you change the function of `z-index` to control depth on 3D devices, how would you re-order a group of elements sharing the same depth on a 3D page? It's clear that we need a separate property to do that. I'm going to be bold and use `depth` in examples, for want of a better attribute name.

So where are we? We've got 3D images and the ability to assign `depth` to elements. That's a good start, but it seems a little restricted, doesn't it? A bunch of flat panels sitting at different depths in a 3D space. We're not really making the most of the technology. We need to add a little style in there... style that can bridge the gap between depth-levels. Fortunately, Webkit is one step ahead of this game with it's [CSS 3D transforms](http://webkit.org/blog/386/3d-transforms/). These could easily be adapted to show in real 3D instead of 3D rendered in 2D.



#### Curves would be nice



Yes they would, and so would a mansion on the beach in Barbados. We don't even have the ability to define curves in 2D CSS yet. But then in 2D we might not have wanted to do crazy things like making a callout or title bow inwards or outwards, which would work pretty well in 3D. But maybe just one step at a time...




### What is 3D anyway



To develop in 3D you need to understand how it really works. Fortunately understanding it is a lot simpler than getting your head around designing and developing in it:

**3D works by each of your eyes seeing a slightly different image.**

Simple enough, and in real life this works pretty well. But when generating your own 3D content you have to be ever-mindful of it.




### Mind the gaps



Imagine a blank page. You make the background a fetching pinkish sort of red colour and set the `depth` to be way back in the distance. 

[![3DS Screen showing plain background](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo1.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo1.png)

You then have a look at it and wonder why it doesn't look like it's way off in the distance. You check to see that your 3D depth slider is turned all the way up and when you find that it is you're left feeling a little confused.

The reason why this doesn't appear to be in the background is because your eyes are seeing the exact same image. There needs to be some more detail in there before your eyes can be tricked into thinking that it's way off in the distance. Here are some suggestions:

1. You could give it a border that makes it look like you're looking into a box. Of course the edges of the border would need to be firmly in the foreground for it to work.

[![3DS screen showing a background shaded to look like you are looking into a box](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo2.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo2.png)

2. You could give it a pattern or image. Beware with repeating patterns though: looking at 3D images forces your eyes to cross slightly and a repeating pattern could cause you to think it's not at the depth you intended.

[![3DS screen with a patterned background](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo3.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo3.png)

3. Lay something else on top of it with a higher `depth`. For demonstration purposes I'm going to go with this one.

[![3DS screen with a plain background and a green tile overlayed](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo4.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo4.png)

But even laying something on top like this isn't too easy for our brains to process. Have a look what each eye would be seeing.

[![Side-by-side 3DS screens showing the difference in location of the overlaid panel for each eye](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo5.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo5.png)

There's not a great deal to differentiate these two images and while your brain knows it's seeing different things from each eye it is struggling because there are things missing that it's used to. Usually when you see an object in front of another object it casts a shadow somewhere. Because they are in different locations your eyes will each see that shadow slightly differently. Also the way the object is lit and how it reflects the light could be different in each eye. To make sure we don't give people headaches we'll have to sort this out.


    
    
    .floating-box{
        box-shadow: 5px 5px 5px #ccc;
    }
    



Now the panel has a nice drop shadow which should make it easier on the eyes and easier to see the 3D effect.

[![3DS screen with plain background and a green panel overlaid with a drop shadow](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo6.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/demo6.png)

But how does it get rendered so that each eye sees the shadow differently?




### Seeing the light



The way I see it there are two options:

1. The browser provides a default (override-able) light source:


    
    
    body{
        light-source: 25% 25% fixed;
    }
    



`fixed` would position the light source relative to the browser viewport, and as an alternative `absolute` would position it relative to the document.

2. You, the developer, get granular control over what each eye sees:

If you had control over each eye the possibilities would be endless. Set the difference in box shadow offset, show a different background image to achieve a rippling effect. You would OWN all the dimensions.


    
    
    @media screen and (-3ds-min-device-spatial-dimensions: 3) and (-3ds-perspective: left-eye) {
        .floating-box{
            box-shadow: 3px 5px 5px #ccc;
        }
    }
    @media screen and (-3ds-min-device-spatial-dimensions: 3) and (-3ds-perspective: right-eye) {
        .floating-box{
            box-shadow: 7px 5px 5px #ccc;
        }
    }
    



I think a combination of both would probably be in the interests of developer and user alike.




### It's not all giant blue humanoids and bio-luminescent flowers



This technology has it's disadvantages, and you can be sure that there will be some nasty surprises out there when it comes along. As with most visual effects, subtlety is king. Of course there will always be the developers who are irresponsible with this great power and make some eye-bleeding creations, but that's just inevitable. No, what I'm really worried about can be summed up in two words: Internet. Advertising. If you thought pop-over ads were intrusive now, you ain't seen nothing yet.




### The waiting game



Who knows what you'll be able to do with the browser? Nintendo maybe? Or if it's [Opera](http://www.opera.com/) providing the software again, as they did for the Wii and original DS/DSi then I expect they will know. (Please do get in touch if you have insider knowledge!) But until that information is made available or the 3DS is in our hands we won't know for sure. I hope it's got at least a few fun 3D features to play with. I'm sure the full set will develop over time.




**Update:** Now that the browser is available, I had a little play with it and [wrote down a few of my thoughts](http://www.norestfortheweekend.com/2011/06/14/3ds-browser-revisited/).

