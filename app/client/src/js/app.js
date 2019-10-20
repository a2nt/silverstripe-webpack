"use strict";

import '../scss/app.scss';

// import Bootstrap
import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';

import 'hammerjs/hammer';
import 'jquery-hammerjs/jquery.hammer';

// Routie
//import 'pouchdb/dist/pouchdb';
//import 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/routes/index';

// conflicts with _components/_ui.hover.js (shows dropdown on hover)
//import 'bootstrap/js/dist/dropdown';
import 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.hover';

import 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.carousel';
import 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.menu';

import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab';
//


// Offcanvas menu
//import 'offcanvas-bootstrap/dist/js/bootstrap.offcanvas';

// Uncomment it to enable meta-lightbox zooming on hover
//import 'jquery-zoom/jquery.zoom';


// Toggle bootstrap form fields
//import FormToggleUI from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.fields.toggle';

// Bootstrap Date & Time fields
//import FormDatetime from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.datetime';

// Stepped forms functionality
//import FormStepped from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.stepped';

// Forms validation functionality
//import FormValidate from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.validate';

// Store forms data into localStorage
//import FormStorage from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.storage';

// client-side images cropping
//import FormCroppie from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.croppie';

// Google NoCaptcha fields
//import NoCaptcha from 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.nocaptcha';

// youtube video preview image
import 'ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.video.preview';

// Meta Lightbox
import 'meta-lightbox/meta-lightbox';

//import Confirmation from 'bootstrap-confirmation2/dist/bootstrap-confirmation';
//import Table from 'bootstrap-table/dist/bootstrap-table';

import 'ss-bootstrap-ui-webpack-boilerplate/src/js/_main';
import './_layout';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));
const fontAwesome = importAll(require.context('font-awesome', false, /\.(otf|eot|svg|ttf|woff|woff2)$/));
