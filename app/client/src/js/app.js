'use strict';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(
    require.context('../img/', false, /\.(png|webp|jpg|jpeg|gif|svg)$/),
);
const fontAwesome = importAll(
    require.context('font-awesome', false, /\.(otf|eot|ttf|woff|woff2)$/),
);

/*
 * UI Basics 
 */
import '../scss/app.scss';

import MainUI from '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_main/_index';

/*
 * Extra functionality
 */
import '@a2nt/meta-lightbox-js/src/js/app';
import Collapse from 'bootstrap/js/src/collapse';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ui/_carousel';
//import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ui/_instagram.feed';

/*
 * AJAX functionality
 */
//import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ajax/_links';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ajax/_online';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ajax/_lazy-images';

/*
 * Site specific modules
 */
import './_layout';

/*
 * Service workers
 */
// Register service worker
if ('serviceWorker' in navigator) {
    const baseHref = (document.getElementsByTagName('base')[0] || {}).href;
    const version = (document.querySelector('meta[name="swversion"]') || {})
        .content;
    if (baseHref) {
        navigator.serviceWorker
            .register(`${baseHref}sw.js?v=${version}`)
            .then(() => {
                console.log('Service Worker Registered');
            });
    }
}
