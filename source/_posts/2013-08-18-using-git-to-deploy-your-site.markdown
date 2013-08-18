---
layout: post
title: "Using git to deploy your site"
date: 2013-08-18 15:30
comments: true
status: publish
categories:
- development
- howto
- git
tags:
- git
- deployment
- automation
---

If you're using git for your source control but still using FTP to publish updates to your website, you're _doing it wrong_!


TL; DR
------

You can set up git so that you can use a single command to deploy your code to live. This post takes you through the typical steps to set this up.


About git
---------

Git is a distributed version control system. It's the "distributed" part that makes it useful in this situation. Git allows you to specify multiple remote repositories at addressable locations that it can sync with. To be able to use git to deploy your site, one of those remote repositories must be on the live server.


Some assumptions
----------------

In order for this to work, you will need:

* Code for a website under version control in git
* An addressable web server to which you want to deploy the website
* SSH access to the web server
* Git available on the web server

I'll go through some other steps that require you to be working on a *nix computer, but they are not essential and are really for convenience. You should be able to do this from a Windows machine without a problem.


Making life easier
------------------

_This section is optional, but it reduces hassle and increases security so why not?_

**[Use an SSH config file](https://kb.mediatemple.net/questions/1625/Using+an+SSH+Config+File).** You can set up aliases, default parameters and security options in `~/.ssh/config`. It's a real time saver - it basically means you don't have to provide all the options and switches every time you sign in via SSH to your server. My host provides a jailed shell on port 2222 and for security I like to use a public key for authentication so my config file looks a little like this:

```
Host mydomain.com
  Port 2222
  PreferredAuthentications publickey
```

**Set up public key authentication.** This increases security on your server by not allowing password access and by installing a certificate on your local computer means you never have to manually authenticate either (unless you choose to password protect your certificate). I won't go through it here but if you're interested you can [learn how to do it](http://stackoverflow.com/a/9095).


Server-side
-----------

Sign in via SSH to your server. You'll start in your home directory.

Create a folder and initialise a new git repo inside it. You can call it what you like; I gave mine the same name as the domain. 

``` bash
$ mkdir mydomain.com
$ cd mydomain.com/
$ git init
Initialized empty Git repository in /home/username/mydomain.com/
```

A git repository and the filesystem containing the checked-out files from that repository are two different things in different locations on disk. When you push from your computer to a remote repository you will only alter what's in the remote repository; the checked out files on the server remain unchanged. This is a problem since you need the checked-out files to be updated as well so they can be read by the web server software and served to people visiting your site. This is where **git hooks** come in handy.

Git hooks are scripts that are automatically run when certain events occur in git. In this case we want a script that checks out the latest version to run after the repo receives an update. The hook's name is `post-receive`.

``` bash
$ cd .git/hooks/
$ vim post-receive
```

`post-receive` does not exist by default and so vim should open with a blank file. For the benefit of those not fluent in vim-ese I'll give blow by blow instructions.

* Type 'i' to enter Insert Mode
* Paste in the following code:

```  bash
#!/bin/sh
GIT_WORK_TREE=../ git checkout -f
```

* Press Escape to exit Insert Mode
* Type ':' followed by 'w', 'q', and Enter, which should (w)rite the file and (q)uit.

The script we just created simply performs a _forced checkout_ which makes sure the state of the checked-out files match the latest version of the repository (i.e. The version just received).

Now it needs to be made executable:

``` bash
$ chmod a+x post-receive 
```

Finally, we need to configure the repository to accept incoming updates without complaining. By default it's set up to grumble because without the git hook we just set up, the working tree (checked-out files) and the repository would be out of sync. With the git hook in place this becomes a non-issue.

``` bash
$ git config receive.denyCurrentBranch ignore
```


Connecting the dots
-------------------

Now the server is ready to receive updates we need to tell the local repository about it.

On your local computer:

``` bash
$ git remote add live username@mydomain.com:mydomain.com
```

This sets up the repository you just set up on your server as a 'remote'. You can now refer to that repository as `live`.


Doing it live
-------------

All that remains now is to push your site live. From your local computer:

``` bash
$ git push live master
```

That's it. Whenever you want to publish, from now on that's all you need to type.


One more thing
--------------

You may notice that your site isn't showing up just yet. Log back on to your server. You can see, if you check, in the `mydomain.com` folder your latest changes are there, but we need to alter the folder that currently contains your website to point to the `mydomain.com` folder instead.

There will be a folder in your home directory called `htdocs`, `www` or `public_html` containing all the files that currently form your website. I'll assume it's called `public_html`. Make sure there's nothing in that folder that you haven't got backed up or that you want to keep - it's about to be deleted!

``` bash
$ rm -rf public_html/
$ ln -s mydomain.com public_html
```

This creates a symbolic link from `public_html` to your repository. Reload the page in your browser and you should see the version you just pushed from git.

Make a small change and try `git push live master` again. As soon as it has finished you should see the change on your site. Deployments, no matter how large or small, will never be a hassle again.


A note on security
------------------

If you navigate to http://mydomain.com/.git you may notice that the contents of your git repository are available for the world to see. Some reasons why you might not want this:

* Your email address is probably associated with all your commits
* Anyone could download your repository and all of its history
* Your code will be public and it would be easier to find security holes in it

I get around this by having all the code to be served in a subfolder of the repository, `htdocs`, and link to that instead of the main repository folder. Alternatively you could use `.htaccess` (if you're running Apache) to block access. Just copy these lines into your `.htaccess` file:

``` apache
RewriteEngine On
RewriteRule ^(.*/)?\.git+ - [F,L]
```