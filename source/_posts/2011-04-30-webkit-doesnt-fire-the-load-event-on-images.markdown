---
date: '2011-04-30 18:47:19'
layout: post
slug: webkit-doesnt-fire-the-load-event-on-images
status: publish
title: Webkit doesn't fire the load event on images
wordpress_id: '192'
comments: true
categories:
- browsers
- coding
- javascript
tags:
- images
- img
- javascript
- js
- load
- load event
- webkit
---

Well that's not strictly true. The full headline reads something like this:

**Webkit doesn't fire the `load` event on images when you change the `src` attribute and the new `src` is the same as the old**



### That seems reasonable

That seems like reasonable behaviour. I mean, the image is already loaded. Changing the `src` attribute to it's _current value_ isn't really changing it at all. It's staying the same. If the `src` is the same and the image is already loaded, why fire the `load` event? You would only want to do that if the image was reloaded but doing that would be pointless as it's already loaded. Loading it again would be a waste of bandwidth and make the experience feel slower; not what browser manufacturers are aiming for.

So what's the big deal?



### Inherently lazy

Developers like myself are inherently lazy. I don't mean we're workshy, but rather we always look for the easiest, cleanest solution to problems. This behaviour in WebKit fails twice on this count.
	
  1. It's inconsistent with other browsers. I have to work around it, potentially adding browser-specific code. That's not good.
  2. It forces me to add extra code to cope with it's specific requirements. Let me explain:

If I was writing for a JS-guaranteed environment this wouldn't be such a problem but I'm a conscientious sort of guy and realise that not everyone will have the benefits of a modern browser with all the options set to 'awesome'. I want to cater for the JS-disadvantaged as well.

Let's assume I'm writing a carousel for a photo slideshow that shows 4 pictures at a time. I want to show the first 4 pictures by default so that at least some content appears even for the non-JS users. Then, using non-intrusive JS I augment the slideshow to add next / previous buttons and the ability to click the image to enlarge it in a lightbox.

To avoid repeating a lot of code in a setup function that would also be present in the next/previous function I can write a single function to set the page of the carousel, setting up the images and their click events.


``` javascript Carousel setup
var picturesPerPage = 4,
    pictures = $('#pictures img');

var loadGalleryCarouselPage = function(pagenumber){
    var imageStart = pagenumber*picturesPerPage;
    pictures.each(function(i){
        var picture = $(pictures[i]),
            pictureContainer = picture.parent();
        picture.hide();
        if(carouseldata.images[imageStart+i]){
            picture.show();
            picture.bind('load',function(){
                pictureContainer.removeClass('loading');
                picture.unbind('load');
            });
            pictureContainer.addClass('loading');
            picture.attr('src',carouseldata.images[imageStart+i].thumbnailurl);
            
            picture.unbind('click');
            picture.bind('click',function(e){
                e.preventDefault();
                pictureLink.fancybox({
                    "href": carouseldata.images[imageStart+i].imageurl
                });
            });
        }
    });
};

loadGalleryCarouselPage(0);
```
    

I'm using [JQuery](http://jquery.com/) and [Fancybox](http://fancybox.net/) for this example.

So what we have there is a function that loops over the four `img` tags, pulls information out of an array (`carouseldata`) based on the page offset passed as an argument, sets up click and load listeners and changes the image's `src` attribute. This will work for any page at any time. In theory we could add a 'jump to page' option where the user could choose the page number to skip to. But we won't.

This is especially handy as we can simply call `loadGalleryCarouselPage(0);` to set up the event listeners when the page first loads without having to duplicate most of the lines elsewhere. We even get a natty little loading spinner if we take advantage of the `loading` class that is set.



### Making things difficult

When the page loads it's a bit of a race. The results of this function varies between refreshes for me. If the image has not yet loaded when the JS runs then it works fine. If the image has already loaded, however, here's what happens:

	
  1. A `load` event listener is set	
  2. The `loading` class is applied which shows a spinner and hides the image
  3. The `src` of the `img` is set
  4. The `load` event DOES NOT FIRE in WebKit because the image is already loaded
  5. The picture remains hidden and the spinner keeps spinning even though the image is loaded


And that is frustrating.

It's an intermittent problem though, only when loading race conditions fail. Here's another situation where it happens every time.



### The dead cert.

The total number of images in the carousel doesn't divide perfectly by four, so on the final page there are only two images showing. The final two of the four `img` elements are hidden from view. They are hidden rather than removed because:

	
  1. They act as spacers so that other elements flow around them correctly
  2. The `img` tag needs to stay so that we can easily change the `src` attribute if the user navigates back to a page with 4 images on it.


So say we're on page 9 of 10 and click 'Next'. Images 1 & 2 are updated to show the final two pictures and images 3 & 4 are hidden. Importantly: the `src` attributes of images 3 & 4 don't change. When we click 'Previous', images 1 & 2 are changed back but 3 & 4 are stuck with the loading spinner. That's because, like before, the `src` was already set and it was equal to the new value.



### Working around it

We could set the hidden images to a transparent .gif or .png instead of hiding them which would solve the second problem but because we want the images showing for non-JS users when the page loads we can't use that technique to fix this. Also, downloading that extra image means extra bandwidth and latency times that we'd rather not have to deal with.

It turns out that setting the `src` to `''` (empty string) immediately before setting the image url will fix the problem. But! It causes the images (and consequently their container) to collapse to zero width and height in Firefox while the new images are loading which looks really bad if you're trying to navigate a slideshow.

Here's my solution:

``` javascript Carousel setup improved
var picturesPerPage = 4,
    pictures = $('#pictures img');

var loadGalleryCarouselPage = function(pagenumber){
    var imageStart = pagenumber*picturesPerPage;
    pictures.each(function(i){
        var picture = $(pictures[i]),
            pictureContainer = picture.parent();
        picture.hide();
        if(carouseldata.images[imageStart+i]){
            picture.show();
            picture.bind('load',function(){
                pictureContainer.removeClass('loading');
                picture.unbind('load');
            });
            pictureContainer.addClass('loading');
            picture.attr('src',carouseldata.images[imageStart+i].thumbnailurl);
            
            picture.unbind('click');
            picture.bind('click',function(e){
                e.preventDefault();
                pictureLink.fancybox({
                    "href": carouseldata.images[imageStart+i].imageurl
                });
            });
        }
        else{
            picture.attr('src','');
        }
    });
};

if($.browser.webkit){
    $('#pictures img').each(function(i){
        $(this).attr('src','');
    });
}
loadGalleryCarouselPage(0);
```


I added an `else` so that if there aren't enough pictures to fill all the `img` tags the `src` of the unused images is set to an empty string. There will always be at least one image on each page so there will always be an image at full height to prop up the carousel container while those hidden `img` tags are primed to receive more content.

I also added a little `if` block directly before initialising the carousel, at the bottom. If the browser is webkit-powered then it'll loop over the `img` tags and prime them (set their `src` to empty) before initialisation. Because this is done using JS, non-JS users will still see the images.



### Grumpy

I'm grumpy about having to put in that extra, browser specific code. Setting the `src` to an empty string seems hacky. But it works and the logic is still clean and minimal. So it'll do.

I hope that helps anyone having image loading javascript issues. And as usual I'd be interested to hear if you have any alternative / better solutions!


Check out the carousel in action [here](http://www.qkschool.org.uk).

