import $ from 'jquery';
import Events from "../_events";
import FormValidateField from "./_ui.form.validate.field";
import SpinnerUI from './_ui.spinner';

const FormValidate = (($) => {
  // Constants
  const NAME = 'jsFormValidate';
  const DATA_KEY = NAME;
  const $Html = $('html, body');

  class FormValidate {

    constructor(element) {
      const ui = this;
      const $element = $(element);
      const $fields = $element.find('input,textarea,select');

      ui._element = element;
      $element.data(DATA_KEY, this);

      ui._fields = $fields;
      ui._stepped_form = $element.data('jsSteppedForm');

      // prevent browsers checks (will do it using JS)
      $element.attr('novalidate', 'novalidate');

      $element.on(Events.FORM_INIT_STEPPED, () => {
        ui._stepped_form = $element.data('jsSteppedForm');
      });

      // init fields validation
      $fields.each((i, el) => {
        new FormValidateField(el);
      });

      // check form
      $element.on('submit', (e) => {
        ui.validate(true, () => {
          e.preventDefault();

          // switch to step
          if (ui._stepped_form) {
            const $el = $element.find('.error').first();

            if ($el.length) {
              ui._stepped_form.step($el.parents('.step'));
            }
          }

          $element.trigger(Events.FORM_VALIDATION_FAILED);
        });
      });

      $element.addClass(`${NAME}-active`);
      $element.trigger(Events.FORM_INIT_VALIDATE);
    }

    // Public methods
    dispose() {
      const $element = $(this._element);

      $element.removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    validate(scrollTo = true, badCallback = false) {
      console.log('Checking the form ...');
      const ui = this;
      let valid = true;

      ui._fields.each((i, el) => {
        const $el = $(el);
        const fieldUI = $el.data('jsFormValidateField');

        if (fieldUI && !fieldUI.validate()) {
          if (badCallback) {
            badCallback();
          }

          console.log('Invalid form data');
          SpinnerUI.hide();
          valid = false;
          return false;
        }
      });

      return valid;
    }

    static _jQueryInterface() {
      return this.each(function() {
        // attach functionality to element
        const $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new FormValidate(this);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = FormValidate._jQueryInterface;
  $.fn[NAME].Constructor = FormValidate;
  $.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FormValidate._jQueryInterface;
  };

  // auto-apply
  $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    $('form').each((i, el) => {
      const $el = $(el);

      // skip some forms
      if ($el.hasClass('no-validation')) {
        return true;
      }

      $el.jsFormValidate();
    });
  });

  return FormValidate;
})($);

export default FormValidate;
