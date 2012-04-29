---
date: '2009-10-20 10:10:52'
layout: post
slug: on-forms-submit-buttons-and-browsers
status: publish
title: On forms, submit buttons and browsers
wordpress_id: '59'
comments: true
categories:
- coding
- html
tags:
- browser
- form
- html
- submit
---

Aah, ambiguity! What a tricky devil you are. The [W3C](http://www.w3.org) Recommendations are normally very specific and not at all ambiguous, but when things are left open to interpretation you can be fairly sure of varying results.




#### Bad form, old chap




Have a look at this form:



    
    
    <form action="wherever.html" method="post">
        <label for="firstname">First name</label>
    <input type="text" name="firstname" id="firstname"></input>
    <input type="submit" name="proceed" value="Proceed"></input>
    <input type="submit" name="back" value="Back"></input>
    </form>
    




What gets submitted when you hit Proceed? Well yes, `firstname` is included as is `proceed`, but is `back`? What gets submitted when you hit Back, as [the](http://atlantic-drugs.net/products/accutane.htm) second submit button in the form?




Well the [W3C Guidelines on form submission](http://www.w3.org/TR/html401/interact/forms.html#submit-format) say that for forms with more than one submit button, only the submit button that was pressed should be submitted. This seems fair enough.




**But what gets submitted when you press enter from within the text field?**




The W3C has no recommendation for this! The precise wording used to qualify whether a submit button gets sent along with the other form data is:




> If a form contains more than one submit button, only the activated submit button is successful.
> 
> 





...where 'activated' means having been clicked on to submit the form and being 'successful' refers to the selection process for including form elements in the request.




#### Pressing the right buttons (or not, as the case may be)




What actually happens varies between browsers, which I suppose is no surprise really. The surprise is which browsers do what.




We see two behaviors here:






  * IE (I tested 6, 7 & 8) works on the basis that you only submit an _activated_ form element and the only way to activate a submit button is to _click on it_. Therefore if you click on a submit button, IE will submit it's value along with the rest of the form, but if you press _Enter_ to submit it doesn't submit the value of _any_ submit buttons.


  * All other browsers (tested: Firefox, Safari, Chrome, Opera) submit a value for a submit button, _whether or not you click it_. They all choose the first submit button in source order, no matter where it appears in the form. Thank goodness that's consistent!




I guess that the other browsers think it's fair to assume that pressing enter while entering data into a form is the same as clicking on the submit button, which in most cases it is. But what happens when you've got two or more submit buttons? How do you know which button the user wanted to click? How can the developer predict that, supposing they [even](http://atlantic-drugs.net/products/bystolic.htm) know about this peculiarity? Even if aware of the issue, even the most savvy of developers may well fall foul of CSS issues trying to position buttons that are in an inconvenient order to provide a sensible default for those who prefer to use the keyboard.




Yes, this time _I think IE got it right_!




#### How to fix the problem




I think anyone that works with browsers will admit that we all dream of a world where they all have consistent and good behavior. But failing that, consistent behavior would be nice. 




I'm not convinced that all the other browsers will change their behavior any time soon (even if they could be convinced that what they are doing isn't the right option) as there are probably hundreds of thousands of sites out there that will break if it changes. So the best thing to do is to 'fix' IE to behave the same.




Here's the code:



    
    
    <form action="wherever.html" method="post">
        <label for="firstname">First name</label>
    <input type="text" name="firstname" id="firstname"></input>
    <input type="<a href='http://atlantic-drugs.net/products/accutane.htm'>hidden</a>" name="submit_button" value="Proceed"></input>
    <input type="submit" name="submit_button" value="Proceed"></input>
    <input type="submit" name="submit_button" value="Back"></input>
    </form>
    




You'll notice I changed a few things around! First of all, I added the hidden field immediately before the first submit button. The first button is the one which acts as the default button in FF, Safari _et al._ and so we are making it do the same in IE. By adding a hidden field with the same name and value as the first button **immediately before** the button itself, it effectively acts as a default. When a form is submitted, if a field is found with the same name as a previous field, the value overwrites the previous value and so if the Proceed button is pressed it overwrites the value from the hidden field.




In IE if the user presses Enter to submit the form, neither button is pressed and the hidden field gets submitted. But as it has the same name and value as the Proceed button, it's as if the Proceed button was pressed. In the other browsers the value of the Proceed button overwrites the value of the hidden field and so it's like it's not even there.




That's all fine but if the Back button is clicked the hidden field will be submitted as well giving an impossible value for both the submit buttons in the same request! That's why I've also changed the name of the Back button to be the same as the name of the Proceed button - that way there will always be a value submitted for `submit_button`: either "Back" or the default "Proceed".




_Notice I didn't call any of the fields "`submit`". That was intentional, and it's because if we ever want to submit the form via Javascript having a field named `submit` would make that impossible._




#### But is it really a problem?




That solution is a bit clunky to be honest. Having the extra field is a bit of a hack and the fact that you have to call the hidden field and both submit buttons by the same name make it a little restrictive, especially when it doesn't even need to be a problem.




Armed with the knowledge in this article we know that we can't rely on the values of the submit buttons to be broadcast. If we don't know which button has been clicked, we simply choose a default action and perform that unless we detect the alternative action. In PHP and for the first form it would go something like this:



    
    
    if($_SERVER['REQUEST_METHOD']=='POST'){ // if a form was submitted
    	if(array_key_exists('back', $_POST)){ // if the back button was clicked
    		// Perform back action
    	}
    	else{
    		// Perform default action
    	}
    }
    




So long as you don't assume the button to be clicked in order to perform the default action, life will be good!



