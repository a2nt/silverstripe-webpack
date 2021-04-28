'use strict';

import '@a2nt/meta-lightbox-react/src/js/app';
import '../scss/app.scss';

import MainUI from '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_components/_main';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ui/_ui.instagram.feed';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_ui/_ui.carousel';

import './_layout';

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

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(
    require.context('../img/', false, /\.(png|jpe?g|svg)$/),
);
const fontAwesome = importAll(
    require.context('font-awesome', false, /\.(otf|eot|ttf|woff|woff2)$/),
);
