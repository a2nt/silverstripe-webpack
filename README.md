# silverstripe-webpack SS4.*

## Simple WebPack boiler plate for SilverStripe

Checkout files at /app/ folder for details
Take a look to https://github.com/a2nt/webpack-bootstrap-ui-kit.git for UI Kit details

# UI Demo
Use UI Repository at https://github.com/a2nt/webpack-bootstrap-ui-kit.git to build static HTML files

Demo: https://rawcdn.githack.com/a2nt/webpack-bootstrap-ui-kit/master/dist/index.html

### Requirements:

+ composer
+ node
+ yarn

### Installation:

```
git clone https://github.com/a2nt/silverstripe-webpack.git
cd silverstripe-webpack
composer install
npm install
npm install --only=dev
cp ./env-dist ./.env
```
Those steps depends on your environment:
1) Edit .env file to define database access credentials and CMS default admin
2) sudo chown www-data:www-data -R public/assets && mkdir silverstripe-cache && chown www-data:www-data -R silverstripe-cache (www-data is commonly used UNIX user name, but it may depend on your environment)
3) Open your-dev-url.pro/dev/build?flush to build database


+ edit .env, robots.txt, humans.txt, cache.appcache, manifest.json and package.json to setup your own project
+ copy favicon.ico after `yarn build` to ./public folder

### Building your custom UI

Edit following files:
+ app/client/src/js/_layout.js
+ app/client/src/js/types/*Your_Custom_ClassName*.js

+ app/client/src/scss/_layout.scss
+ app/client/src/scss/types/*Your_Custom_ClassName*.scss

To compile use: yarn build
To start dev-server use: yarn start



## Installing composer at some cpanel hostings
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

php -d memory_limit=-1 composer.phar update --ignore-platform-reqs
```

### Features:
+ You can use /app/_config/webpack.yml to setup webpack server parameters which will be used by webpack server and by SilverStripe to serve static content
+ You can use WebpackJS('file-name') and WebpackCSS('file-name') functions at templates to require JS and CSS. It will be served using static files or by using Webpack if the website in development mode and Webpack server is running
+ WebpackTemplateProvider::WebpackJS('file-name') and WebpackTemplateProvider::WebpackCSS('file-name') can be used at php area
+ All images will be optimised at /app/client/src/img and will be written to /app/client/dist/img (by default)
+ Favicons will be generated at /app/client/dist/icons using /app/src/favicon.png
+ Folder /app/client/src/js/types is used to create page specific JS (just create JS file there and it will be compiled)
+ Folder /app/clent/src/scss/types is used to create page specific CSS (just create SCSS file there and it will be compiled)
+ Automatic linting (JS+SCSS)
+ Bootstrap 4 included by default
+ Font-Awesome included by default
+ Deferred requirements loading
+ Requirements auto-loading
+ Includes basic silverstripe modules
+ Some necessary extensions for example editing silverstripe elements as bootstrap grid columns
+ Built-in themes support

... More features available, but I don't have much time to describe all of them ...

### Folder structure:

+ /app/_config/webpack.yml (Webpack configurtion)
+ /app/src/WebpackTemplateProvider.php (WebpackJS and WebpackCSS functionality)
+ /app/src/DeferedRequirements.php (Deferred Requirements + Requirements auto-loader)
+ /app/templates/Page.ss (An example of Page.ss)
+ /app/src (Your backend sources)
+ /app/client/src (Your frontend sources)
+ /app/client/dist (Your compiled-production assets)



+ /app/client/src/js (Your JS-scripts)
+ /app/client/src/js/app.js (main application file to include website-wide components)
+ /app/client/src/js/main.js (Your custom site-wide functionality)
+ /app/client/src/js/_pageType_and_component_template.js (A template which can be used to create new modules)
+ /app/client/src/types/*.js (Extra page-specific modules to be auto-compiled. My suggestion is to use *ClassName*.js and then require it at SilverStripe custom controller area)



+ /app/clent/src/scss (Your styling to be compiled)
+ /app/clent/src/scss/app.scss (main application file to include site-wide components)
+ /app/clent/src/scss/_variables.sccs (your custom and bootstrap variables)
+ /app/clent/src/scss/_layout.sccs (Your site-wide styling)

+ /app/client/dist (Compiled frontend files js, css, images etc)
### Commands:

+ yarn - to update packages
+ yarn start - to start webpack development webserver
+ yarn build - to build production assets
+ yarn lint:check - to check SCSS and JS linting
+ yarn lint:fix - to fix SCSS and JS linting automatically

### TODO:

+ Planktos torrent auto-generation for static files (https://github.com/xuset/planktos#----------planktos)
+ ServiceWorker auto-generation
