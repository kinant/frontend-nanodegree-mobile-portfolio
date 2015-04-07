## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

####Part 1: Optimize PageSpeed Insights score for index.html

Instructions:
- Click on "index.html" in the "dist" folder to open up the optimized website.

Steps for optimizing PageSpeed Insights Score for index.html
1. Optimization process was automated using Grunt and Plugins

2. Optimizing Render Blocking JS and CSS: this was done by minifying .js and .css files, combining them into combined files and by removing unused css. Then the css styles where inlined into index.html. Plug-ins used: 'grunt-contrib-uglify' (minify JS), 'grunt-contrib-uncss' (remove unused CSS), 'grunt-css-min' (minify css), 'grunt-processhtml' (inline css and change paths in html)

Appart from this, asyncs were added for javascripts and a media="print", for the print.css file.

3. Optimize Images: for this, I used 'grunt-contrib-imagemin'. The pizzeria.jpg JPEG file was optimized by resizing the image first, using Photoshop.

4. Other tools used: 'grunt-contrib-html' (to minify html), 'grunt-contrib-clean' (clean the dist directory),'grunt-contrib-copy' (copy files into dist folder), 'grunt-processhtml' (automatically change js and css file paths)

5. Optimized use of webfonts. Inlined the style for the font in the html file.

Resources used for Grunt

1. Team Treehouse Courses: "Up and Running With Grunt". http://teamtreehouse.com/.
2. Book: "Mastering Grunt" by Daniel Li. Packt Publishing. 2014.
3. Websites:
- https://github.com/gruntjs/grunt-contrib-uglify
- https://www.npmjs.com/package/grunt-processhtml
- https://github.com/addyosmani/grunt-uncss
- https://github.com/gruntjs/grunt-contrib-cssmin
- https://github.com/gruntjs/grunt-contrib-imagemin
- http://www.sitepoint.com/5-grunt-tasks-improve-performance-website/
- http://xdamman.com/website-optimization-grunt-uncss
- http://www.webfoobar.com/node/11

General Resources used:
1.Book: "Even Faster Web Sites" by Steve Souders. O'Reilly Media. 2009.
2. Websites:
- https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/
- http://www.hongkiat.com/blog/optimize-google-webfonts/

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

Instructions:
- Click on "index.html" in the "dist" folder to open up the optimized website. Then, click on the last link that says: "Cam's Pizzeria" to open up the Pizzeria Website.

### Optimization Steps
The steps are detailed in main.js. Basically unnecessary code was removed from the loops, and the loops where replaced with Duff’s Device patterns. More information about this patter is given in the main.js file. This was all from the book, "Even Faster Websites" by Steve Souders. Information in Pg. 97 of Chapter 7: Writing Efficient JavaScript.

The optimizations where perfomed in changePizzaSizes() and updatePositions()functions. Reading through the discussion forums, it was confirmed that these had to be the ones changed. The function that generates the sliding pizzas was also modified to generate less than 200 pizzas.

Other websites used:
- http://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/
- http://ryanmorr.com/abstract-away-the-performance-faults-of-queryselectorall/

Further optimization was done using grunt for:

1. grunt-contrib-uglify (minify JS)
2. grunt-contrib-cssmin (minify css)
3. grunt-contrib-imagemin (minify images)
4. grunt-contrib-processhtml (automatically change file paths for .css and .js files)
