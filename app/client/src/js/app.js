import '../scss/app.scss';

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

//import Vue from 'vue/dist/vue.esm.js';

// import Bootstrap-Vue
/*import { Carousel } from 'bootstrap-vue/es/components';
Vue.use(Carousel);*/

import 'offcanvas-bootstrap/dist/js/bootstrap.offcanvas';

// import your custom UI components
import './main';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));
const fontAwesome = importAll(require.context('font-awesome', false, /\.(otf|eot|svg|ttf|woff|woff2)$/));