"use strict";

import $ from 'jquery';
import Events from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_events';

// Mapbox API
import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.map.api';

const LocationUI = (($) => {
  // Constants
  const W = window;
  const D = document;
  const $Body = $('body');

  const NAME = 'LocationUI';
  class LocationUI {
    // Static methods

    static init() {
      this.dispose();
      console.log(`Initializing: ${NAME}`);
    }

    static initMap() {
      $('.mapAPI-map-container').find('.marker').on(`${Events.MAPMARKERCLICK}`, (e) => {
        const $el = $(e.currentTarget);
        const id = $el.data('id');

        $Body.find('.locations .location').removeClass('active');
        $Body.find(`.locations .location[data-id="${  id  }"]`).addClass('active');
      });

      $Body.find('.locations .location').on('click', (e) => {
        const $el = $(e.currentTarget);
        const id = $el.data('id');

        $Body.find(`#Marker${id}`).click();
      });

      $('.mapAPI-map-container').on(Events.MAPPOPUPCLOSE, (e) => {
        $Body.find('.locations .location').removeClass('active');
      });
    }

    static dispose() {
      console.log(`Destroying: ${NAME}`);
    }
  }

  $(W).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    LocationUI.init();
  });

  $(W).on(Events.MAPLOADED, () => {
    LocationUI.initMap();
  });

  return LocationUI;

})($);

export default LocationUI;
