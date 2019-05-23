"use strict";

import $ from 'jquery';

import Events from '../_events';
import Spinner from '../_components/_ui.spinner';
import FormValidateField from "./_ui.form.validate.field";

import '../../thirdparty/jquery-te/jquery-te.js';

const JqteUI = (($) => {

  const NAME = 'jsJqteUI';
  const DATA_KEY = NAME;

  const jqteOptions = {
    color: false,
    fsize: false,
    funit: 'em',
    format: false,
    rule: false,
    source: false,
    sub: false,
    sup: false,
  };

  class JqteUI {

    constructor(element) {
      const ui = this;
      const $element = $(element);
      const validationUI = $element.data('jsFormValidateField');

      ui._element = element;
      $element.data(DATA_KEY, this);
      $element.jqte(jqteOptions);

      // dynamic error control
      if (validationUI) {
        $element.parents('.jqte').find('.jqte_editor').on('change', (e) => {
          validationUI.validate();
        });
      }
    }

    static dispose() {
      console.log(`Destroying: ${NAME}`);
    }

    static _jQueryInterface() {
      return this.each(function() {
        // attach functionality to element
        const $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new JqteUI(this);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = JqteUI._jQueryInterface;
  $.fn[NAME].Constructor = JqteUI;
  $.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return JqteUI._jQueryInterface;
  };

  // auto-apply
  $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    $('textarea.jqte-field').jsJqteUI();
  });

  return JqteUI;
})($);

export default JqteUI;
