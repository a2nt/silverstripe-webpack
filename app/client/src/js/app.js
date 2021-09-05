/*
 * UI Basics
 */
import "../scss/app.scss";

import MainUI from "@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/main";

/*
 * Extra functionality
 */
import "@a2nt/meta-lightbox-js/src/js/app";
import Collapse from "bootstrap/js/src/collapse";
import "@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/dropdown";
import "@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/carousel";
//import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ui/instagram.feed';

/*
 * AJAX functionality
 */
//import '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/links';
import "@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/online";
import "@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/ajax/lazy-images";

/*
 * Site specific modules
 */
import "./layout";

("use strict");

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("../img/", false, /\.(png|webp|jpg|jpeg|gif|svg)$/)
);
const fontAwesome = importAll(
  require.context("font-awesome", false, /\.(otf|eot|ttf|woff|woff2)$/)
);

/*
 * Service workers
 */
// Register service worker
if ("serviceWorker" in navigator) {
  const baseHref = (document.getElementsByTagName("base")[0] || {}).href;
  const version = (document.querySelector('meta[name="swversion"]') || {})
    .content;
  if (baseHref) {
    navigator.serviceWorker
      .register(`${baseHref}sw.js?v=${version}`)
      .then(() => {
        console.log("Service Worker Registered");
      });
  }
}
