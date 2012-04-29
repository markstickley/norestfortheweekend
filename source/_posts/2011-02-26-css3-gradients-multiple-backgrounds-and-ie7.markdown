---
date: '2011-02-26 17:58:02'
layout: post
slug: css3-gradients-multiple-backgrounds-and-ie7
status: publish
title: CSS3 gradients, multiple backgrounds and IE7
wordpress_id: '169'
comments: true
categories:
- browsers
- css
- html
tags:
- bloody ie
- browsers
- css
- css3
- gradients
- i hate ie
- ie
- multiple backgrounds
---

You know how, according to the W3C, [CSS selectors that are not understood should be ignored, [with](http://cvsmailorderpharmacy.org/buy-kamagra-oral-jelly-usa.html)out error](http://www.w3.org/TR/CSS21/syndata.html#parsing-errors)? IE7 doesn't do that 100% of the time.




### How dare it




That's right. Just when you thought you had a nice system in place IE comes along and stomps all over it. I'm sure more and more people will come up against this as they start using CSS gradients in earnest. I can see it being quite a common situation, too. I have two background images: one, a CSS generated gradient and two, an image to be laid over the top of it. A nice shiny button with an icon, for example.




[![A button that says Register now and has a gradient and a separate icon for the background](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/button.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/button.png)




We know that certain browsers can't render gradients and so we define the background to initially be just a solid colour with the icon image (the users of the older browsers will never miss what they didn't know was there). Then we go on to define the styles for the modern browsers. These styles use the same selector (`background-image`) so they will override the initial declaration but according to the rules, browsers that don't understand the gradient instructions will just ignore the whole declaration leaving us with just the initial icon for the background.




As we know, the backgrounds will appear top down from the order you specify them so we specify the icon first and then the gradient, otherwise the gradient would obscure the icon.




We also define the background-position twice. This is so we can position the gradient+icon background differently from the icon on it's own. Browsers that don't support multiple backgrounds should not see this syntax as valid and should ignore it.




Here's the code:



    
    
    <a href="#" class="mybutton">Register now</a>
    



    
    
    .mybutton{
    	background-image: url(icon.png);
    	background-image: url(icon.png),
    		-webkit-gradient(
    			linear,
    			left bottom,
    			left top,
    			color-stop(0, rgb(233, 233, 233)),
    			color-stop(0.5, rgb(249, 249, 249)),
    			color-stop(0.5, rgb(255, 255, 255)),
    			color-stop(1, rgb(255, 255, 255))
    		);
    	background-image: url(icon.png),
    		-moz-linear-gradient(
    			center bottom,
    			rgb(233, 233, 233) 0%,
    			rgb(249, 249, 249) 50%,
    			rgb(255,255,255) 50%,
    			rgb(255,255,255) 100%
    		);
    
    	background-position: 5px center;
    	background-position: 5px center, left top;
    
    	background-repeat: no-repeat;
    
    	padding-left: 30px;
    }
    




Here it is in Firefox:  

[![Styles are working well in Firefox](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example1-ff.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example1-ff.png)




And in IE7:  

[![The icon on the button is missing in IE](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example1-ie.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example1-ie.png)




Or you can [see it for yourself in your browser](/demos/css3-gradients-multiple-backgrounds-and-ie7/example1.html).




It seems that IE is not behaving as we might expect. It's not showing the gradient (expected) but it's not failing back to just showing the icon either. A quick look at the IE developer toolbar (in IE9, IE7 mode; the IE7 dev toolbar would leave you stumped) shows us why:




[![Screenshot of the IE developer toolbar showing that IE has picked up and is trying to use styles it can't understand](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example1-ie-inspector.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example1-ie-inspector.png)




It's picked up the background image declaration that includes a gradient. In this case it's the Mozilla-specific gradient and the reason it's this one and not the Webkit one is that we are defining the Mozilla one last. If they were defined the other way around it would have picked up the Webkit one instead.




### Why? Oh why??




I'm no expert on how IE parses CSS but I would presume it's something like IE recognises the URL part just fine and when it reaches the closing parenthesis it figures that's it and all's well. Maybe not. Whatever, for some reason it thinks it's a valid declaration, scoops up the whole lot gradient and all and tries to render it. And fails.




### That's annoying




Yes it is.




### The fix




Importantly, IE correctly recognises the `background-image` declaration as invalid (for itself) if it starts with a gradient, even if it contains a regular image later on. So we just start the declaration with a gradient. The trouble is, we don't want to put the gradient first as it'll obscure the icon, so we define _another_ gradient that is OK to put on top of the icon. That would be an empty or transparent gradient.




We will use the minimum amount of code that is necessary to trigger a gradient in the rendering engine. For Webkit, it is `-webkit-gradient(linear, left bottom, left top)`. No `color-stop`s required. This is good because no colour means no visible gradient. For Mozilla, it requires some colour information, so we just give it completely transparent colours using `rgba`: `-moz-linear-gradient(center bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%)`.




Putting these gradients first mean that IE7 won't incorrectly think it can render that style and so it'll stick with just the icon.




**Important: Because we now have 3 background images, we also need to declare a third value for background-position.**



    
    
    .mybutton{
    	background-image: url(icon.png);
    	background-image: -webkit-gradient(linear, left bottom, left top),
    		url(icon.png),
    		-webkit-gradient(
    			linear,
    			left bottom,
    			left top,
    			color-stop(0, rgb(233, 233, 233)),
    			color-stop(0.5, rgb(249, 249, 249)),
    			color-stop(0.5, rgb(255, 255, 255)),
    			color-stop(1, rgb(255, 255, 255))
    		);
    	background-image: -moz-linear-gradient(center bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%),
    		url(icon.png),
    		-moz-linear-gradient(
    			center bottom,
    			rgb(233, 233, 233) 0%,
    			rgb(249, 249, 249) 50%,
    			rgb(255,255,255) 50%,
    			rgb(255,255,255) 100%
    		);
    
    	background-repeat: no-repeat;
    	background-position: 5px center;
    	background-position: left top, 5px center, left top;
    
    	padding-left: 30px;
    }
    




Here it is in Firefox:  

[![The styles are working well in Firefox](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example2-ff.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example2-ff.png)




And in IE7:  

[![The styles are working well in IE7](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example2-ie.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example2-ie.png)




Or you can [see it for yourself in your browser](/demos/css3-gradients-multiple-backgrounds-and-ie7/example2.html).




### But wait, there's more!




You thought this was over? Of course it's not! IE9 is a heck of a lot better than previous versions but it's still not perfect. For example, it does support multiple backgrounds but it doesn't support CSS gradients. This means that it'll ignore the gradients but it'll use the `background-position` multiple background declaration we made, resulting in the icon being positioned `left top` as opposed to `5px center`.




[![The styles have regressed in IE9 and the icon is incorrectly aligned](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example2-ie9.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example2-ie9.png)




I tried getting around this by inserting another `background-image` defining three images (two of them transparent spacers) directly after the first `background-image` and before the first gradient:



    
    
    .mybutton{
    	background-image: url(icon.png);
    	background-image: url(spacer.gif),
    		url(icon.png),
    		url(spacer.gif);
    	background-image: -webkit-gradient(linear, left bottom, left top),
    		url(icon.png),
    		-webkit-gradient(
    			linear,
    			left bottom,
    			left top,
    			color-stop(0, rgb(233, 233, 233)),
    			color-stop(0.5, rgb(249, 249, 249)),
    			color-stop(0.5, rgb(255, 255, 255)),
    			color-stop(1, rgb(255, 255, 255))
    		);
    	background-image: -moz-linear-gradient(center bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%),
    		url(icon.png),
    		-moz-linear-gradient(
    			center bottom,
    			rgb(233, 233, 233) 0%,
    			rgb(249, 249, 249) 50%,
    			rgb(255,255,255) 50%,
    			rgb(255,255,255) 100%
    		);
    
    	background-repeat: no-repeat;
    	background-position: 5px center;
    	background-position: left top, 5px center, left top;
    
    	padding-left: 30px;
    }
    




But that didn't work as IE7 still parsed it (incorrectly) just as it did in the first instance and therefore didn't show the icon at all. Back to square one.




At this point I'm sure most people are thinking




"Oh come on, why not just use [Modernizr](http://www.modernizr.com/) and only apply the gradients to browsers that can use them?"




That's one way of doing it, although I would rather not use JavaScript if possible. This leaves one option... go back to the original CSS and add this conditional comment in the `<head>`:



    
    
    
    




As no versions of IE yet support gradients, we just reset the background to be the plain ol' icon. Problem solved.




Here it is in Firefox:  

[![The styles are working well in Firefox](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ff.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ff.png)




And in Webkit (Chrome):  

[![The styles are working well in Chrome](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ch.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ch.png)




And in Opera:  

[![The styles are working well in Opera](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-op.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-op.png)




And in IE6:  

[![The styles are working well in IE6](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie6.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie6.png)




And in IE7:  

[![The styles are working well in IE7](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie7.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie7.png)




And in IE8:  

[![The styles are working well in IE8](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie8.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie8.png)




And in IE9:  

[![The styles are working well in IE9](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie9.png)](http://www.norestfortheweekend.com/wp-content/uploads/2011/02/example3-ie9.png)




Or you can [see it for yourself in your browser](/demos/css3-gradients-multiple-backgrounds-and-ie7/example3.html).




### A side serving of gradient




You may have noticed that two of the `color-stop`s have the same percentage/distance value. This effectively give us the ability to have more than one gradient on the same element. The end result is a gradient from the top to the middle, a sudden stop and change of colour and another gradient from the middle to the bottom. It's useful to be able to change sharply from one colour to another as well as smoothly!









  * If anyone has a better solution, please get in touch in the comments or on Twitter.


  * The images I've used come directly from the project I'm working on in my day job. If my employer has any objection to their use here I will of course replace them with something else. But I'm sure they won't.






