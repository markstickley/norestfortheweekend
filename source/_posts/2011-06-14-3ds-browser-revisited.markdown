---
date: '2011-06-14 01:19:14'
layout: post
slug: 3ds-browser-revisited
status: publish
title: 3DS browser revisited
wordpress_id: '211'
comments: true
categories:
- 3ds
- browsers
- research
tags:
- 3ds
- acid2
- acid3
- browser
- flash
- netfront
- user agent
---

It's been a few months since I made [the post speculating about the 3DS' browser capabilities](/blog/2011/02/14/the-web-in-3d-the-nintendo-3ds-web-browser/). Since the browser is now available and that post is easily the post that has drawn the most attention to my humble blog I thought it would be worth writing a quick follow-up.

{% img center /images/wp-uploads/2011/06/photo.jpg 628 569 'Brand new Nintendo 3DS' %}



### Not letting you down easily

There's no way of saying this easily: the browser kind of sucks.

I've never found browsing on a console a particularly satisfying experience and I didn't expect this to be any better. What excited me was the potential for extending the web into a new dimension. The browser doesn't even do that. It's nowhere near as awesome as I'd hoped. No 3D, no custom CSS extensions. It 'does' 3D... sort of. You can link to .mpo 3D image files; it'll display them in 3D and allow you to save them to the SD card. It does not display the images in 3D inline in the page, though, and the 3D capabilities doesn't extend beyond image files to other page elements.

Viewing 3D photos on the web is pretty cool though, I'll admit. If you want to try out viewing 3D pictures on the web for yourself, head over to [3D Porch](http://www.3dporch.com) where they have stacks of them waiting to be seen.

Interestingly, because .mpo and .jpg are both encoded using the standard jpeg format it seems that you can use them both in the same way. If you visit [this little demo page I put together](/demos/3ds-browser-revisited/3ds-mpo.html) you can see that most browsers are happy displaying .mpo files natively as well as .mpo files renamed as .jpgs. The 3DS browser will display both images on the page without a problem. Sadly they are in 2D, although if you click on them (they are linked to their original files) then the image is shown in 3D. This works for both the .mpo file and the .mpo renamed as a .jpg.

The browser doesn't have Flash. This is no great loss, however, and with the 3DS' weak battery life you can't blame them for not wanting to include something that would drain it even more quickly than in most situations.



### Getting technical

For some fairly technical details about the browser, [3DS Buzz wrote it up at the bottom of this article](http://www.3dsbuzz.com/nintendo-3ds-to-use-netfront-browser-supports-flash-and-html5/). I'll attempt to filter some useful information out of that...

It is claimed that the browser supports HTML5 and CSS3 (partially in both cases). As such it isn't much of a surprise that it doesn't pass the [Acid 3 test](http://acid3.acidtests.org/). It is more of a surprise, however, that the 3DS does not even pass the [Acid 2 test](http://acid2.acidtests.org/). Don't expect your pages to render perfectly (I've already had reports of pages not looking as they should).

The JavaScript engine is said to be "high speed" but it takes it's sweet time to finish failing the Acid 3 test.



Here is the 3DS' User Agent string:
    
    Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7412.EU
    
This is interesting for several reasons. 


  1. It doesn't list the rendering engine or make any mention of NetFront	
  2. It DOES list the device name (not really that interesting, it's just cool to see it)
  3. It's fairly concise (it doesn't come loaded with all the cruft you normally find in a UA string)
  4. It has the version number, but only for what appears to be the browser and not the system software

Compare that UA string with the one of the version of Chrome I'm using right now:
    
    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.91 Safari/534.30
    
Chrome's is much longer and more verbose. You can see it not only contains the hardware but the system software version. It has the rendering engine and it's version, the browser and it's version and for the life of me I can't think why but it also has a reference to Safari.

What's odd to me about the 3DS' UA string is the inclusion of the `.EU` on the end of the version number, right at the end. Does this mean that there's an EU version of the browser that's different from the browser they get in Japan and America? Why would they want to have to maintain multiple versions of the software? Will they use that user agent information to serve different content on Nintendo sites based on region? Probably not (but they could...).



### Utilitarian

While I'm sure it'll be fine for jumping onto GameFAQs to figure out how to beat that boss you're stuck on, the 3DS browser is not going to set the world on fire like I hoped it might. I hope that not too many people got their hopes up about it, but if you did (like me) and are now feeling a little disappointed I feel your pain. At least it's never going to gain a significant enough market share that we'll ever have to worry about fixing broken sites in it... (famous last words).
