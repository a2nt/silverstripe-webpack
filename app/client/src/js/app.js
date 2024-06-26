/* eslint-disable no-console */

/*
 * UI Basics
 */
// import $ from 'jquery';
import '../scss/app.scss';

import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/main';

/*
 * Extra functionality
 */
import './_graphql';
import '@a2nt/meta-lightbox-js/src/js/app';
import 'bootstrap/js/src/collapse';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/dropdown';
// import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/carousel'
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/glide';
// import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/datepicker';
// import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/instagram.feed';

// import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/captcha'
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/turnstile';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/password';

/*
 * AJAX functionality
 */
// import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/links';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/online';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/lazy-images';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/form';

/*
 * Site specific modules
 */
import './layout';

/*
 * Import fonts and images
 */
function importAll(r) {
  return r.keys().map(r);
}

importAll(
  require.context('../img/', false, /\.(png|webp|jpg|jpeg|gif|svg)$/)
);
importAll(
  require.context('font-awesome', false, /\.(otf|eot|ttf|woff|woff2)$/)
);

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
