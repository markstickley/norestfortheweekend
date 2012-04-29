---
date: '2009-11-28 12:12:14'
layout: post
slug: paypal-for-shame
status: publish
title: PayPal, for shame
wordpress_id: '101'
comments: true
categories:
- html
- rants
---

[caption id="attachment_100" align="aligncenter" width="628"]![Screengrab of the PayPal homepage header, the word PayPal replaced with the word ShameLess](http://www.norestfortheweekend.com/wp-content/uploads/2009/11/shameless.jpg)[/caption]

[PayPal](http://www.paypal.com) is, as I'm sure you know, a long-standing staple of online payment technologies. They are now merged with eBay and you pretty much can't use eBay without a PayPal account which works nicely for eBay as they are now reaping the benefit of not just the eBay selling fees but also the PayPal fees.

But this is not a post to lament how much money eBay/PayPal are raking in from punters.



#### Nice and easy



As well as a payment service for eBay, PayPal also offer shopping basket and checkout services for small online merchants who don't want to buy and maintain e-commerce products. It works nicely and provided you don't mind PayPal taking their cut it provides a really simple way of being able to take credit cards securely.



#### Prepare yourself



I was recently asked to add some shopping functions to a site using PayPal. Here is one of the nine code snippets PayPal provided me with to insert a button into my page:


    
    
    <form action="https://www.paypal.com/cgi-bin/webscr" target="paypal" method="post">
    <input type="hidden" name="cmd" value="_s-xclick">
    <input type="hidden" name="hosted_button_id" value="xxxxxxx">
    <table>
    <tr><td><input type="hidden" name="on0" value="Sizes">Sizes</td></tr><tr><td><select name="os0">
    	<option value="XXSmall">XXSmall £20.00</option>
    	<option value="XSmall">XSmall £20.00</option>
    	<option value="Small">Small £20.00</option>
    	<option value="Medium">Medium £20.00</option>
    	<option value="Large">Large £20.00</option>
    	<option value="XLarge">XLarge £20.00</option>
    </select> </td></tr>
    </table>
    <input type="hidden" name="currency_code" value="GBP">
    <input src="https://www.paypal.com/en_GB/i/btn/btn_cart_LG.gif" border="0" type="image" name="submit" alt="PayPal - The safer, easier way to pay online.">
    <img src="https://www.paypal.com/en_GB/i/scr/pixel.gif" alt="" height="1" border="0" width="1">
    </form>
    



Oh PayPal, how do you sadden me? Let me count the ways...



#### Spot the nastiness



Well being generous, there are 7 horrible things about that above code snippet. If I count each problem every time it appears I reach a grand total of 12. Bleugh.

Let me run through exactly what I take issue with, because I really don't think I'm being unreasonable.



##### Inputs



There are a lot of hidden `input`s. No, I understand - they need to be there to make it work. That makes sense. What doesn't make sense is that they don't bother to close off the `input`s, XHTML style.


    
    
    <input type="hidden" name="name" value="value"></input>
    



Simple.



##### Tables



Really? Tables? But look at it. What does it actually do? Absolutely nothing, apart from put the text and the select side by side, which is a choice for the designer to make. No `tbody`, no `th`'s, and so there's no chance in hell of any `scope=`'s.

Pointless.



##### Select with no id and no label



I don't think I need to say a lot about this - the title says it all. They've put the text that should be in the label in plain text instead. They could have used the table (if they insisted on having one) to help with this by putting the label text in a th, but they didn't even do that.



##### Input type: image



Again, no problem in using an input of type image. But wait... they didn't specify the width and height! If they are going to go for a consistent look, as they appear to be doing with their tables mentioned earlier, then this is essential. Otherwise, rogue styles applied to all `input`s will seriously mess up the look of the button.



##### Alt text



Possibly the worst offender of all.

Check it out, aren't PayPal good? They added alt text and everything. Except the alt text is on the image input element -  the submit button -  and it isn't at all descriptive. It's basically an advert for PayPal. 

What good is that to AT users? They would have **no clue** as to what that control does.



##### Spacer gif



Yes, for no apparent reason there is a spacer gif at the bottom of it all. And yes, it has no XHTML closing slash.



##### No enclosing element



Oh yes, one last one. `input` elements can't reside directly inside the `form` element. They need to be contained within any one of a variety of other elements (Eg. `p`, `div`, etc.). Sadly, there is nothing protecting our `input`s from the harsh reality of their `form` overlord.




#### The way it _should_ be




    
    
    <form action="https://www.paypal.com/cgi-bin/webscr" target="paypal" method="post">
    	<div>
    		<input type="hidden" name="cmd" value="_s-xclick"></input>
    		<input type="hidden" name="hosted_button_id" value="xxxxxxx"></input>
    		<input type="hidden" name="on0" value="Sizes"></input>
    		<label for="sizes-polo">Sizes</label>
    		<select name="os0" id="sizes-polo">
    			<option value="XXSmall">XXSmall £20.00</option>
    			<option value="XSmall">XSmall £20.00</option>
    			<option value="Small">Small £20.00</option>
    			<option value="Medium">Medium £20.00</option>
    			<option value="Large">Large £20.00</option>
    			<option value="XLarge">XLarge £20.00</option>
    		</select>
    		<input type="hidden" name="currency_code" value="GBP"></input>
    		<div class="controls">
    			<input src="https://www.paypal.com/en_GB/i/btn/btn_cart_LG.gif" name="submit" height="26" width="120" alt="Add a polo shirt in the selected size to your cart" type="image" class="image"></input>
    		</div>
    	</div>
    </form>
    



Much better. Notice that for the alt text I mentioned which item was being added and referenced the size select box in case they AT user might have missed that, or not made a selection yet.



#### Why am I picking on PayPal?



Well, I'm sure that many other large companies are equally guilty of this sort of thing. And as I come across them, if they enrage me enough I'm sure I'll rant about them as well. But really, PayPal should know better. They event have people coming to (and sponsor) events (like [BarCamp](http://www.barcamp.org/)) where the attendees have a low tolerance for this sort of thing.

Hopefully if enough people make a fuss, these things will change. Don't tolerate it! And most of all, never blindly cut and paste markup from another site. It'll only make you look bad.
  *[AT]: Assistive Technology
