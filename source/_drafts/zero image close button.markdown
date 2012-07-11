One of the [yaks I shaved](http://en.wiktionary.org/wiki/yak_shaving#Noun) recently to improve a tiny button that removed an item from a list. The button was just a simple circle with an X through it.

Originally it had been done by hiding the text of a link and using `:before` selector to add an X using text and then styling it. It wasn't ideal because it never really lined up properly, especially when the font size changed and _especially_ if the font itself was changed. I wanted to find a better way.


## Using a gradient as a gradient is so overrated

You can create a much better X with a few gradients! In fact, gradient backgrounds, multiple background images and rounded corners give you pretty much all the tools you need to create the best X button ever.

We'll be aiming for this:

{% img center /images/posts/2012/07/10/zero-image-close-button/x.png 16 16 'X marks the spot' %}

There are two ways of doing this, but I'll start with the simplest. Let's deconstruct the image:

{% img center /images/posts/2012/07/10/zero-image-close-button/x-components-simple.png 200 200 'The X is just two lines' %}

As a single linear gradient can only make lines parallel to each other, we need to make two lines by using two gradients.


``` css CSS
a.close{
    background-image: linear-gradient(135deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 41.5%,rgba(0,0,0,1) 41.5%,rgba(0,0,0,1) 58.5%,rgba(0,0,0,0) 58.5%,rgba(0,0,0,0) 100%),
                      linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 41.5%,rgba(0,0,0,1) 41.5%,rgba(0,0,0,1) 58.5%,rgba(0,0,0,0) 58.5%,rgba(0,0,0,0) 100%);
}
```
You can [see it in action](/demos/zero-image-close-button/simple.html) and also check the source for the full gamut of vendor extensions.


## Adding pzazz

We can make our close button look a lot like the [X-Men logo](https://www.google.co.uk/search?q=x+men+logo&tbm=isch) by adding a couple of lines of extra CSS. I added a hover state as well just for kicks.:

``` css CSS
a.close{
    background-image: linear-gradient(135deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 41.5%,rgba(0,0,0,1) 41.5%,rgba(0,0,0,1) 58.5%,rgba(0,0,0,0) 58.5%,rgba(0,0,0,0) 100%),
                      linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 41.5%,rgba(0,0,0,1) 41.5%,rgba(0,0,0,1) 58.5%,rgba(0,0,0,0) 58.5%,rgba(0,0,0,0) 100%);

    border: 3px solid black;
    border-radius: 5px;
}
a.close:hover{
    background-color: rgba(0,0,0,0.1);
}
```
[See it in action here](/demos/zero-image-close-button/simple-with-border.html).


## The next level

With the above approach we are a bit limited. A couple of problems:

* It's easy to change the background or leave it transparent, but what if we want the background to stay solid and have the X transparent to show the colour behind?
* With one line of the X overlaid on the other it would be impossible to give the lines of the X any kind of symmetrical gradient.

Both these problems can be solved by deconstructing the X a little further:

{% img center /images/posts/2012/07/10/zero-image-close-button/x-components-advanced.png 200 200 'The X is four lines joining at the centre' %}

This means as well as creating four gradients we must also give them all different positions on the element.

``` css CSS
a.close{
    background-image: linear-gradient(135deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 33%,rgba(0,0,0,1) 33%,rgba(0,0,0,1) 67%,rgba(0,0,0,0) 67%,rgba(0,0,0,0) 100%),
                      linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 33%,rgba(0,0,0,1) 33%,rgba(0,0,0,1) 67%,rgba(0,0,0,0) 67%,rgba(0,0,0,0) 100%),
                      linear-gradient(135deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 33%,rgba(0,0,0,1) 33%,rgba(0,0,0,1) 67%,rgba(0,0,0,0) 67%,rgba(0,0,0,0) 100%),
                      linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 33%,rgba(0,0,0,1) 33%,rgba(0,0,0,1) 67%,rgba(0,0,0,0) 67%,rgba(0,0,0,0) 100%);

    background-size: 50%;
    background-repeat: no-repeat;
    background-position: right top, left top, left bottom, right bottom;
}
```

[See it](/demos/zero-image-close-button/advanced.html)! (Yes, it looks the same as the first one).


## That's a bit fancy

Now that each leg of the X is it's own gradient, we can get super-fancy and create effects like [this](/demos/zero-image-close-button/fancy1.html), [this](/demos/zero-image-close-button/fancy2.html) and [this](/demos/zero-image-close-button/fancy3.html).


## Getting SASSy

It only seems right that all this goodness should be rolled into a simple-to-use SCSS mixin. Copy and paste this code and create close buttons as easily as typing `@include XBackground($foreground: white, $background: gray, $width: 34%)` (add your own `border` and `border-radius` as required).

``` scss SCSS
@mixin XBackground($foreground, $background, $width) {
    $stop1: 50% - ($width / 2);
    $stop2: 50% + ($width / 2);
    
    background-image: -moz-linear-gradient(-45deg, $background 0%, $background $stop1, $foreground $stop1, $foreground $stop2, $background $stop2, $background 100%), -moz-linear-gradient(45deg, $background 0%, $background $stop1, $foreground $stop1, $foreground $stop2, $background $stop2, $background 100%),-moz-linear-gradient(-45deg, $background 0%, $background $stop1, $foreground $stop1, $foreground $stop2, $background $stop2, $background 100%), -moz-linear-gradient(45deg, $background 0%, $background $stop1, $foreground $stop1, $foreground $stop2, $background $stop2, $background 100%);
	background-image: -webkit-gradient(linear, left top, right bottom, color-stop(0%,$background), color-stop($stop1,$background), color-stop($stop1,$foreground), color-stop($stop2,$foreground), color-stop($stop2,$background), color-stop(100%,$background)), -webkit-gradient(linear, right top, left bottom, color-stop(0%,$background), color-stop($stop1,$background), color-stop($stop1,$foreground), color-stop($stop2,$foreground), color-stop($stop2,$background), color-stop(100%,$background)),-webkit-gradient(linear, left top, right bottom, color-stop(0%,$background), color-stop($stop1,$background), color-stop($stop1,$foreground), color-stop($stop2,$foreground), color-stop($stop2,$background), color-stop(100%,$background)), -webkit-gradient(linear, right top, left bottom, color-stop(0%,$background), color-stop($stop1,$background), color-stop($stop1,$foreground), color-stop($stop2,$foreground), color-stop($stop2,$background), color-stop(100%,$background));
	background-image: -webkit-linear-gradient(-45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), -webkit-linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%),-webkit-linear-gradient(-45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), -webkit-linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%);
	background-image: -o-linear-gradient(-45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), -o-linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%),-o-linear-gradient(-45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), -o-linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%);
	background-image: -ms-linear-gradient(-45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), -ms-linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%),-ms-linear-gradient(-45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), -ms-linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%);
	background-image: linear-gradient(135deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%),linear-gradient(135deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%), linear-gradient(45deg, $background 0%,$background $stop1,$foreground $stop1,$foreground $stop2,$background $stop2,$background 100%);

	background-size: 50%;
	background-repeat: no-repeat;
	background-position: right top, left top, left bottom, right bottom;
}
```

## Vendor schmendor

Looking at the more [advanced](/demos/zero-image-close-button/advanced.html) solution's CSS, it turns out that there's quite a lot of it, thanks to all the variations and vendor prefixes we have to use (THANKS FOR THAT).

Of course another way we could do this is just to use an image. We can base64 encode it and while that makes it a little larger than an independent binary file it cuts out the overhead of an extra request.

[Here](/demos/zero-image-close-button/base64.html)'s the base64 version in action. View source and you'll see that it's a lot smaller (about half the size) of the gradient-based solution. The gradient version will scale to any size but is it worth the extra bandwidth?

Fortunately you don't need to make that choice! Here's a handy little chart explaining why:

<table>
	<thead>
		<tr>
			<td></td>
			<th>Chars</th>
			<th>Uncompressed</th>
			<th>Gzipped</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Gradients</th>
			<td>3969</td>
			<td>3.84KB</td>
			<td>313 bytes</td>
		</tr>
		<tr>
			<th>Base64 image</th>
			<td>1961</td>
			<td>1.91KB</td>
			<td>1.33KB</td>
		</tr>
	</tbody>
</table>

And you _are_ gzipping all your stuff as you serve it, right? I thought so.

*[SASS]: Syntactically Awesome Stylesheets