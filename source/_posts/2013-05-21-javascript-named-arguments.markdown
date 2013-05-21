---
layout: post
title: "Javascript Named Arguments"
date: 2013-05-21 08:47
comments: true
status: publish
categories:
- javascript
tags:
- javascript
- namesjs
- arguments
- validation
- defaults
---

What's In A Name?
-----------------

Javascript is an extremely versatile language, however it is missing various useful features that other languages aren't. In many cases these features can be added with a shim or a polyfill, if required. However, there is a set of missing features that are low-level enough that a shim isn't possible. They are all surrounding function arguments:

* Named arguments
* Default argument values
* Argument type enforcement


Default argument values is actually [a feature proposed in ES6](https://wiki.mozilla.org/ES6_plans#New_syntax_.28stuff_that_affects_the_front_end_and.2For_bytecode.29) but as we aren't quite there yet with ES6 I decided to patch the functionality myself in the best way I could. I've made a little library and it's called [Names.js](http://namesjs.markstickley.co.uk). Please [fork it](https://github.com/markstickley/names.js) and help me improve it!


Names.js
--------

As it is impossible to alter the fundamental way that functions work without making changes to the Javascript engine, it's written as an augmentation to the `Function` object adding a couple of instance methods to the prototype and a static method to the main object. The static method is this:

``` javascript Javascript
var myFunction = Function.createNamed({
    args: [
        ['arg1', 'string', 'defaultValue'],
        ['arg2', MyClass, someVar]
    ],
    method: function(arg1, arg2) {
        // ...
    }
});
```

It's a bit more verbose than simply

``` javascript Javascript
var myFunction = function(arg1, arg2) {
    // ...
}
```

however it offers the following benefits:

* You don't need to provide an argument each time if you're happy with the default value:

``` javascript Javascript
myFunction.applyNamed(null, { arg1: 'Hello world' });
```

* You know what each argument _means_ (this advantage is a lot clearer when the arguments are named well and the values you are assigning them are all booleans and integers).
* You can provide the arguments in whichever order you like:

``` javascript Javascript
myFunction.applyNamed(null, {
    arg2: fooBar,
    arg1: 'Hello world'
});
```

* The function will throw an error if you pass it an incorrectly typed value:

``` javascript Javascript
myFunction.applyNamed(null, { arg1: 1234 }); // throws, as 1234 is not a 'string'
```

`applyNamed` works just like Javascript's native `apply` method, taking the scope as the first argument and the arguments to apply as the second.


Adding validation
-----------------

In many languages, type checking is mandatory but at the end of the day it's just a form of validation. In an effort to reduce the usual argument-checking clutter at the beginning of a function I thought it was worth extending the validation functionality to allow for custom validations.

You can either use a regex or a function:

``` javascript Javascript
myFunction.addValidaton({
    arg1: {
        test: /-a-diddly$/, // Check for Flanders
    },
    arg2: {
        test: function(myClass) {
            return myClass.isInitialised;
        },
        required: true
    }
});
```

The `required` option on `arg2`'s validation object means that `arg2` is required. Ordinarily if the argument is omitted when calling `applyNamed` then that validation will not be run. If the argument is omitted but the validation for that argument states that it is `required` then it will fail instantly.


Dog's dinner
------------

Names.js [eats its own dogfood](http://en.wikipedia.org/wiki/Eating_your_own_dog_food) wherever possible and practical. There are only 3 public functions:

* `applyNamed` wouldn't make sense to be able to `applyNamed` to.
* `createNamed` would be an even more verbose way of creating a function if you used it with `applyNamed`. However it does use an `applyNamed`-style syntax and goes on to use `applyNamed` internally to create the new function.
* `addValidation` is not only created with `createNamed` but also its own validation rules are added using `addValidation`. Talk about meta!


And...
------

...that's pretty much it really. I also wrote a [release script](https://github.com/markstickley/names.js/blob/master/release) for the library that I'm pretty pleased with but maybe that's for another blog post :)