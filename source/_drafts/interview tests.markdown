As part of the interview process, I've seen a rise in popularity of supervised exercises in programming. While some candidates may be unnerved and a little scared by this process I can only see it getting more popular as it is often used by the leaders in the industry such as Facebook, Twitter and Google.

It's clearly a better form of assessment. With an unsupervised, untimed test done in the candidate's home you can't tell how long they have spent on it or even if it was the candidate who wrote it. With a timed, unsupervised test at your offices you will solve those problems but you will still only have the end product of their work. You may think that that's all that matters but if you're trying to build a team that understands each other and works well together it's worth seeing how they think and how they perform under pressure.

Have a look over these real-world examples. Why not try the exercise yourself and see if you can get a better solution than I've given in the click-to-reveal section underneath each question.


## Code a "dead man's switch" in JavaScript

Train drivers have a pedal which they have to keep depressed otherwise the train will stop, for safety. However, so the switch cannot be weighed down by a brick or anything else it must also be released and depressed again every certain number of seconds.

The exercise is to write a function (_a_) that takes another function (_b_) and an interval as arguments and returns another function (_c_). If function _c_ isn't called for the duration of the interval, function _b_ is called. So long as function _c_ keeps being called before the interval is up _b_ will never be called.



## Code a function to return the product of "other" array elements

The function takes an array as an argument and returns an array with the same number of elements. The value of each element in the return array is the product of all the elements in the original array __except__ for the element at the same index. For example:

```
[2,5,8]
```

gives

```
[40,16,10]
```

calculated by

```
[5*8,2*8,2*5]
```


## Code a function to insert commas into an integer to make it more easily human readable

Simply given an integer (Eg. 3289844), the function should return a string of the number with commas separating the thousands (Eg. 3,289,844).


## Code a function to verify the validity of a binary tree

Imagine a tree where each node has 0, 1 or 2 children. The tree is sorted so that the value of each node is greater than it's child node on the left and less than it's child node on the right _and their descendents_. This function must verify that a given tree structure meets this definition and return true if it does, false if it doesn't. The tree is represented with objects like this:

```
{
	value: 12,
	leftNode: [Object],
	rightNode: [Object]
}
```