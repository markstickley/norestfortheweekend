Pixels are getting so small these days that we have had to stop using them as a measurement unit. While they may not have been the first to produce a device with a significantly higher PPI, Apple certainly introduced the idea to the mass consciousness with their retina display boasting twice the pixel density.

Native apps and OS elements were scaled up to be double the size and therefore maintaining their _physical_ size on the screen while taking advantage of the extra pixels to appear crisper and cleaner. For websites, this wasn't so easy: either render the pages as if they were on a device that had half the number of pixels it did in reality (and suffer unsigntly, blocky pages) or render pages with the actual number of pixels (which would result in tiny, unreadable pages).

The answer came as a compromise between the two - render the page with the actual number of pixels available but report to the browser that it had half that amount. This meant that text and vector-based content rendered crisply and images remained blocky due to their non-upward-scalable nature. The solution to _this_ came in the form of `device-pixel-ratio`, a CSS media query allowing specific different styles to be applied to a page when the `device-pixel-ratio` is equal to, more or less than a certain amount.

Apple's retina devices have exactly double the pixel density from their previous baseline models and so their `device-pixel-ratio` is `2`.

```
Actual screen width (pixels) / Width reported to the browser (pixels) = device-pixel-ratio
```

Using this value, developers could tailor their pages to respond to these high resolution devices and use larger images to ensure their pages looked good there as well as on 'standard' resolutions.


## This is where it gets tricky

As PPK [points]() [out]() INSERT LINKS, however, it isn't as simple as that (of course - )


*[PPI]: Pixels Per Inch
*[CSS]: Cascading Style Sheet
*[PPK]: Peter Paul Koch