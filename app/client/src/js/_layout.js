import $ from 'jquery';

import Events from './_events';
import Spinner from './_components/_ui.spinner';
import FormDatetime from './_components/_ui.form.datetime';
import FormStepped from './_components/_ui.form.stepped';


const LayoutUI = (($) => {
  // Constants
  const W = window;
  const D = document;
  const $Body = $('body');

  const NAME = 'LayoutUI';

  const datepickerOptions = {
    autoclose: true,
    startDate: 0,
    //todayBtn: true,
    todayHighlight: true,
    clearBtn: true,
  };

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
