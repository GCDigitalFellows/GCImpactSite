GCImpactSite
============

A website on the impact of the CUNY Graduate Center within New York City.

Built using [yeoman](http://yeoman.io/), [grunt](http://gruntjs.com/), and [bower](http://bower.io/).

Utilizes the following libraries:
- [Bootstrap](getbootstrap.com) frontend framework
- [fullpage.js](https://github.com/alvarotrigo/fullPage.js)
- [require.js](http://requirejs.org/)
- [jquery](http://jquery.com/)
- [jquery-ui](http://jqueryui.com/)
- [jquery.slimscroll](http://rocha.la/jQuery-slimScroll)
- [modernizr](http://modernizr.com/)
- [off-canvas menu effects](http://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/)

Installation
------------
###Check for and install required tools
Make sure your system has [Node.js](http://nodejs.org/download/), [grunt](http://gruntjs.com/), and [bower](http://bower.io/) already installed.
Entering the command `$ node -v` at the command line should return something like `v0.10.32`. If not, you need to install Node.js by following the link above.
Entering the command `$ which grunt` at the command line should return something like `grunt: aliased to grunt --stack`. If not, install grunt (full directions at the above link) using the following command at the command line (you may need to use sudo on OS X and *nix):
```
$ npm install -g grunt-cli
```
Entering the command `$ bower -v` at the command line should return something like `1.3.12`. If not, install bower (full directions at the above link) using the following command at the command line:
```
$ npm install -g bower
```

###Clone the GitHub repository
Enter the following command at the command line:
```
$ git clone git://github.com/GCDigitalFellows/GCImpactSite.git
$ cd GCImpactSite
```

###Initialize the Git Repo Using Bower and NPM
Enter the following command at the command line:
```
$ npm install
$ bower install
$ cd test
$ bower install
$ cd ..
```
This will download all of the required bower and npm dependencies, as well as the dependencies for the mocha test suite (grunt will fail otherwise).

###Grunt the project
Once all of the required tools are installed, you can test the site using the following commands:
```
$ grunt serve
```
A browser window should open a "live view" of the site. To quit grunt at the command line, hit ctrl-c (^c)

Compiling
---------
To compile the site, just type `$ grunt` at the command line. The "dist" folder should be updated with the compiled files.
