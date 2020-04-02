'use strict';

import '../scss/app.scss';

// import Bootstrap
import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';

//import 'hammerjs/hammer';
//import 'jquery-hammerjs/jquery.hammer';

// Routie
//import 'pouchdb/dist/pouchdb';
//import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/routes/index';

// conflicts with _components/_ui.hover.js (shows dropdown on hover)
//import 'bootstrap/js/dist/dropdown';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.hover';

import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.carousel';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.menu';

import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab';
//

import Spinner from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.spinner';

// Sticky sidebar
import SidebarUI from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.sidebar';

//import Multislider from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.multislider';

// Flyout UI
//import Flyout from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.flyout';

// Offcanvas menu
//import 'offcanvas-bootstrap/dist/js/bootstrap.offcanvas';

// Uncomment it to enable meta-lightbox zooming on hover
//import 'jquery-zoom/jquery.zoom';

// Toggle bootstrap form fields
//import FormToggleUI from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.fields.toggle';

// Bootstrap Date & Time fields
//import FormDatetime from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.datetime';

// Stepped forms functionality
//import FormStepped from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.stepped';

// Forms validation functionality
//import FormValidate from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.validate';

// Store forms data into localStorage
//import FormStorage from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.storage';

// client-side images cropping
//import FormCroppie from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.croppie';

// Google NoCaptcha fields
//import NoCaptcha from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.nocaptcha';

// youtube video preview image
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.video.preview';

// Meta Lightbox
import '@a2nt/meta-lightbox/src/js/index';

//import Confirmation from 'bootstrap-confirmation2/dist/bootstrap-confirmation';
//import Table from 'bootstrap-table/dist/bootstrap-table';

// AJAX UI
//import AjaxUI from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.ajax';

import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_main';
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
	require.context('font-awesome', false, /\.(otf|eot|svg|ttf|woff|woff2)$/),
);

// Google Analytics
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/drivers/_google.track.external.links';
//import MarkerClusterer from '@google/markerclusterer/src/markerclusterer.js';
