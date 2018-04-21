# silverstripe-webpack SS4.1.*

## Simple WebPack boiler plate for SilverStripe

Checkout files at /site/ folder for details

### Features:
+ You can use /site/_config/webpack.yml to setup webpack server parameters which will be used by webpack server and by SilverStripe to serve static content
+ You can use WebpackJS('file-name') and WebpackCSS('file-name') functions at templates to require JS and CSS. It will be served using static files or by using Webpack if the website in development mode and Webpack server is running
+ WebpackTemplateProvider::WebpackJS('file-name') and WebpackTemplateProvider::WebpackCSS('file-name') can be used at php area 
+ All images will be optimised at /site/src/img and will be written to /site/client/img (by default)
+ Favicons will be generated at /site/client/icons using /site/src/favicon.png
+ Folder /site/client/src/js/types is used to create page specific JS (just create JS file there and it will be compiled)
+ Folder /site/clent/src/scss/types is used to create page specific CSS (just create SCSS file there and it will be compiled)
+ Automatic linting (JS+SCSS)
+ Bootstrap 4 included by default
+ Font-Awesome included by default
+ Deferred requirements loading
+ Requirements auto-loading

### Folder structure:

+ /site/_config/webpack.yml (Webpack configurtion)
+ /site/src/WebpackTemplateProvider.php (WebpackJS and WebpackCSS functionality)
+ /site/src/DeferedRequirements.php (Deferred Requirements + Requirements auto-loader)
+ /site/templates/Page.ss (An example of Page.ss)
+ /site/src (Your backend sources)
+ /site/client/src (Your frontend sources)
+ /site/client/dist (Your compiled-production assets)



+ /site/client/src/js (Your JS-scripts)
+ /site/client/src/js/_components (Your JS components to be included)
+ /site/client/src/js/_components/_spinner.js (An example to display and hide loading spinner)
+ /site/client/src/js/app.js (main application file to include website-wide components)
+ /site/client/src/js/main.js (Your custom site-wide functionality)
+ /site/client/src/js/_events.js (Your custom site-wide events)
+ /site/client/src/js/_pageType_and_component_template.js (A template which can be used to create new modules)
+ /site/client/src/types/*.js (Extra page-specific modules to be auto-compiled. My suggestion is to use *ClassName*.js and then require it at SilverStripe custom controller area)



+ /site/clent/src/scss (Your styling to be compiled)
+ /site/clent/src/scss/_components (Your custom SCSS components)
+ /site/clent/src/scss/app.scss (main application file to include site-wide components)
+ /site/clent/src/scss/_variables.sccs (your custom variables, ex. bootstrap)
+ /site/clent/src/scss/_layout.sccs (Your site-wide styling)


### Requirements:

+ composer
+ yarn

### Instalation:

+ git clone https://github.com/a2nt/silverstripe-webpack.git
+ cd silverstripe-webpack 
+ composer install
+ npm install
+ edit robots.txt, humans.txt, cache.appcache, manifest.json and package.json to setup your own project

### Commands:

+ yarn - to update packages
+ yarn start - to start webpack development webserver
+ yarn build - to build production assets
+ yarn lint:check - to check SCSS and JS linting
+ yarn lint:fix - to fix SCSS and JS linting automatically

### TODO:

+ Planktos torrent auto-generation for static files (https://github.com/xuset/planktos#----------planktos)
+ ServiceWorker auto-generation