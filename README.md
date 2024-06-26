## Simple WebPack boiler plate for SilverStripe

[![Silverstripe Version](https://img.shields.io/badge/Silverstripe-5.1-005ae1.svg?labelColor=white&logoColor=ffffff&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDEuMDkxIDU4LjU1NSIgZmlsbD0iIzAwNWFlMSIgeG1sbnM6dj0iaHR0cHM6Ly92ZWN0YS5pby9uYW5vIj48cGF0aCBkPSJNNTAuMDE1IDUuODU4bC0yMS4yODMgMTQuOWE2LjUgNi41IDAgMCAwIDcuNDQ4IDEwLjY1NGwyMS4yODMtMTQuOWM4LjgxMy02LjE3IDIwLjk2LTQuMDI4IDI3LjEzIDQuNzg2czQuMDI4IDIwLjk2LTQuNzg1IDI3LjEzbC02LjY5MSA0LjY3NmM1LjU0MiA5LjQxOCAxOC4wNzggNS40NTUgMjMuNzczLTQuNjU0QTMyLjQ3IDMyLjQ3IDAgMCAwIDUwLjAxNSA1Ljg2MnptMS4wNTggNDYuODI3bDIxLjI4NC0xNC45YTYuNSA2LjUgMCAxIDAtNy40NDktMTAuNjUzTDQzLjYyMyA0Mi4wMjhjLTguODEzIDYuMTctMjAuOTU5IDQuMDI5LTI3LjEyOS00Ljc4NHMtNC4wMjktMjAuOTU5IDQuNzg0LTI3LjEyOWw2LjY5MS00LjY3NkMyMi40My0zLjk3NiA5Ljg5NC0uMDEzIDQuMTk4IDEwLjA5NmEzMi40NyAzMi40NyAwIDAgMCA0Ni44NzUgNDIuNTkyeiIvPjwvc3ZnPg==)](https://packagist.org/packages/goldfinch/google-maps)

Checkout files at /app/ folder for details
Take a look to https://github.com/a2nt/webpack-bootstrap-ui-kit.git for UI Kit details

Note: I prefer using vanilla JS with minimal external dependencies to reach higher loading speed.
There's no jQuery and no React, but it can be connected optionally.

# UI Demo

Use UI Repository at https://github.com/a2nt/webpack-bootstrap-ui-kit.git to build static HTML files

Demo: https://rawcdn.githack.com/a2nt/webpack-bootstrap-ui-kit/master/dist/index.html

### Requirements:

-   composer
-   node
-   yarn
-   pnpm package manager

https://pnpm.js.org/en/installation

Note: You can use npm package manager, but this one will save your disc space. Replace pnpm commands with npm if you prefer npm

### Installation:

```
git clone https://github.com/a2nt/silverstripe-webpack.git
cd silverstripe-webpack
composer install
pnpm install
cp ./env-dist ./.env
```

Those steps depends on your environment:

1. Edit .env file to define database access credentials and CMS default admin
2. sudo chown www-data:www-data -R public/assets && mkdir silverstripe-cache && chown www-data:www-data -R silverstripe-cache (www-data is commonly used UNIX user name, but it may depend on your environment)
3. Open your-dev-url.pro/dev/build?flush to build database

-   edit .env, robots.txt, humans.txt, cache.appcache, manifest.json and package.json to setup your own project
-   copy favicon.ico after `yarn build` to ./public folder

### Building your custom UI

Edit following files:

-   app/client/src/js/\_layout.js
-   app/client/src/js/types/_Your_Custom_ClassName_.js

-   app/client/src/scss/\_layout.scss
-   app/client/src/scss/types/_Your_Custom_ClassName_.scss

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

-   You can use /app/\_config/webpack.yml to setup webpack server parameters which will be used by webpack server and by SilverStripe to serve static content
-   You can use WebpackJS('file-name') and WebpackCSS('file-name') functions at templates to require JS and CSS. It will be served using static files or by using Webpack if the website in development mode and Webpack server is running
-   WebpackTemplateProvider::WebpackJS('file-name') and WebpackTemplateProvider::WebpackCSS('file-name') can be used at php area
-   All images will be optimised at /app/client/src/img and will be written to /app/client/dist/img (by default)
-   Favicons will be generated at /app/client/dist/icons using /app/src/favicon.png
-   Folder /app/client/src/js/types is used to create page specific JS (just create JS file there and it will be compiled)
-   Folder /app/clent/src/scss/types is used to create page specific CSS (just create SCSS file there and it will be compiled)
-   Automatic linting (JS+SCSS)
-   Bootstrap 5 included by default
-   Font-Awesome included by default
-   Deferred requirements loading
-   Requirements auto-loading
-   Includes basic silverstripe modules
-   Some necessary extensions for example editing silverstripe elements as bootstrap grid columns
-   Built-in themes support

... More features available, but I don't have much time to describe all of them ...

### Folder structure:

-   /app/\_config/webpack.yml (Webpack configurtion)
-   /app/src/WebpackTemplateProvider.php (WebpackJS and WebpackCSS functionality)
-   /app/src/DeferedRequirements.php (Deferred Requirements + Requirements auto-loader)
-   /app/templates/Page.ss (An example of Page.ss)
-   /app/src (Your backend sources)
-   /app/client/src (Your frontend sources)
-   /app/client/dist (Your compiled-production assets)

*   /app/client/src/js (Your JS-scripts)
*   /app/client/src/js/app.js (main application file to include website-wide components)
*   /app/client/src/js/main.js (Your custom site-wide functionality)
*   /app/client/src/js/\_pageType_and_component_template.js (A template which can be used to create new modules)
*   /app/client/src/types/*.js (Extra page-specific modules to be auto-compiled. My suggestion is to use *ClassName\*.js and then require it at SilverStripe custom controller area)

-   /app/clent/src/scss (Your styling to be compiled)
-   /app/clent/src/scss/app.scss (main application file to include site-wide components)
-   /app/clent/src/scss/\_variables.sccs (your custom and bootstrap variables)
-   /app/clent/src/scss/\_layout.sccs (Your site-wide styling)

-   /app/client/dist (Compiled frontend files js, css, images etc)

### Commands:

-   yarn - to update packages
-   yarn start - to start webpack development webserver
-   yarn build - to build production assets
-   yarn lint:check - to check SCSS and JS linting
-   yarn lint:fix - to fix SCSS and JS linting automatically

### Usefull UNIX console utilities

#### Code search  (find . -name "*.*" | xargs grep "some text" replacement)

ag "some text" ./
https://github.com/ggreer/the_silver_searcher

#### File content with code hightlighting (cat replacement)

bat ./app/src/Pages/Page.php
https://github.com/sharkdp/bat

#### File listing (ls replacement)

exa -aTL3 ./app
https://github.com/ogham/exa

### git diff tool with bat code hightlighting (git show)

https://github.com/dandavison/delta

