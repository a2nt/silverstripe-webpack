"use strict";

import $ from 'jquery';

import Events from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_events';
import Spinner from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.spinner';
import FormDatetime from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.datetime';
import FormStepped from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.form.stepped';

//import Multislider from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.multislider';

const LayoutUI = (($) => {
  // Constants
  const W = window;
  const D = document;
  const $Body = $('body');

  const NAME = 'LayoutUI';

  class LayoutUI {
    static init() {
      const ui = this;
      ui.dispose();

      console.log(`Initializing: ${NAME}`);
      // your custom UI

    }

    static dispose() {
      console.log(`Destroying: ${NAME}`);
    }
  }

  $(W).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    LayoutUI.init();
  });

  W.LayoutUI = LayoutUI;

  return LayoutUI;
})($);

export default LayoutUI;
