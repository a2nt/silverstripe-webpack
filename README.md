# silverstripe-webpack

## Simple WebPack boiler plate for SilverStripe

Checkout files at /site/ folder for details

### Features:
+ You can use /site/_config/webpack.yml to setup webpack server parameters which will be used by webpack server and by SilverStripe to serve static content
+ You can use WebpackJS('file-name') and WebpackCSS('file-name') functions at templates to require JS and CSS. It will be served using static files or by using Webpack if the website in development mode and Webpack server is running
+ WebpackTemplateProvider::WebpackJS('file-name') and WebpackTemplateProvider::WebpackCSS('file-name') can be used at php area 
+ All images will be optimised at /site/src/img and will be written to /site/dist/img (by default)
+ Favicons will be generated at /site/dist/icons using /site/src/favicon.png
+ Folder /site/src/js/types is used to create page specific JS (just create a JS file there and it will be compiled)
+ Bootstrap 4 included by default

### Folder structure:
+ /site/_config/webpack.yml (Webpack configurtion)
+ /site/code/WebpackTemplateProvider.php (WebpackJS and WebpackCSS functionality)
+ /site/templates/Page.ss (An example Page.ss)
+ /site/src (Your sources)



+ /site/src/js (Your JS-scripts)
+ /site/src/js/_components (Your JS components to be included)
+ /site/src/js/_components/_spinner.js (An example to display and hide loading spinner)
+ /site/src/js/app.js (main application file to include website-wide components)
+ /site/src/js/main.js (Your custom site-wide functionality)
+ /site/src/js/_events.js (Your custom site-wide events)
+ /site/src/js/_pageType_and_component_template.js (A template which can be used to create new modules)
+ /site/src/types/*.js (Extra page-specific modules to be autocompiled. My suggestion is to use *ClassName*.js and then require it at SilverStripe custom controller area)



+ /site/src/scss (Your styling to be compiled)
+ /site/src/scss/_components (Your custom SCSS components)
+ /site/src/scss/app.scss (main application file to include sie-wide components)
+ /site/src/scss/_variables.sccs (your custom variables, ex. bootstrap)
+ /site/src/scss/_layout.sccs (Your site-wide styling)

##### P.S to compile page specific styling add following line to /site/src/types/*PageClassName*.js
###### import "../scss/types/*PageClassName*.scss";

### Requirements:

+ composer
+ yarn

### Instalation:

+ git clone https://github.com/a2nt/silverstripe-webpack.git
+ cd silverstripe-webpack 
+ composer install
+ yarn install
+ edit robots.txt, humans.txt, cache.appcache, manifest.json and package.json to setup your own project

### Commands:

+ yarn - to update packages
+ yarn start - to start webpack webserver
+ yarn build - to build assets# silverstripe-webpack

### TODO:

+ Planktos torrent auto-generation for static files (https://github.com/xuset/planktos#----------planktos)
+ ServiceWorker auto-generation