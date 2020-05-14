/*
 ***************************************************************
 * *** PAGE SPECIFIC CODDING ***
 * Place it into app/client/src/js/types
 * Require page specific css as mentioned bellow
 *
 * If you don't need page specific JS (only CSS)
 * you can create SCSS file at app/client/src/scss/types
 * !!! BUT NOT BOTH at "types" folder !!!
 ***************************************************************
 *
 * An example of Page specific JS and Mapbox functionality
 * Take a look to app/templates/Objects/Map.ss for HTML
 * Take a look to https://github.com/a2nt/silverstripe-mapboxfield/blob/master/README.md for Data Structure
 */
"use strict";

// your page specific css
import '../scss/_types/PageTypeClassName.scss';

import $ from 'jquery';
import Events from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_events';

// Mapbox API
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.map.api';

const PageTypeUI = (($) => {
  // Constants
  const W = window;
  const D = document;
  const $Body = $('body');

  const NAME = 'PageTypeUI';
  class PageTypeUI {
    // Static methods

    static init() {
      this.dispose();
      console.log(`Initializing: ${NAME}`);
      // custom page specific functionality
    }

    static initMap() {
      // custom map functionality
    }

    static dispose() {
      console.log(`Destroying: ${NAME}`);
    }
  }

  $(W).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    PageTypeUI.init();
  });

  $(W).on(Events.MAPLOADED, () => {
    PageTypeUI.initMap();
  });

  return PageTypeUI;

})($);

export default PageTypeUI;
