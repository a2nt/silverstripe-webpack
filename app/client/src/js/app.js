import $ from 'jquery';
import './_consts';

// import Bootstrap
import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab';
//

// Offcanvas menu
//import 'offcanvas-bootstrap/dist/js/bootstrap.offcanvas';

import '../scss/app.scss';

import '@a2nt/meta-lightbox/src/js/meta-lightbox';
// youtube video preview image
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.video.preview';

// MainUI
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_main';

// Uncomment it to enable meta-lightbox zooming on hover
//import 'jquery-zoom/jquery.zoom';

// Forms UI
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.basics';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.validate';
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.stepped';

// Import fonts and images
function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(
	require.context('../img/', false, /\.(png|jpe?g|svg)$/),
);
const fontAwesome = importAll(
	require.context('font-awesome', false, /\.(otf|eot|svg|ttf|woff|woff2)$/),
);

// Your custom JS
import './_layout';
