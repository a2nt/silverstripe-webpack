import $ from 'jquery';
import Events from "../_events";

const FormValidateField = (($) => {
  // Constants
  const NAME = 'jsFormValidateField';
  const DATA_KEY = NAME;
  const $Html = $('html, body');

  class FormValidateField {

    constructor(element) {
      const ui = this;
      const $element = $(element);

      ui._element = element;
      ui._actions = $element.parents('form').children('.btn-toolbar,.form-actions');
      $element.data(DATA_KEY, this);

      // prevent browsers checks (will do it using JS)
      $element.attr('novalidate', 'novalidate');

      $element.on('change focusout', (e) => {
        ui.validate(false);
      });

      $element.addClass(`${NAME}-active`);
      $element.trigger(Events.FORM_INIT_VALIDATE_FIELD);
    }

    // Public methods
    dispose() {
      const $element = $(this._element);

      $element.removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    validate(scrollTo = true) {
      const ui = this;
      const $el = $(ui._element);
      const $field = $el.closest('.field');
      const extraChecks = $el.data(`${NAME}-extra`);
      let valid = true;
      let msg = null;

      const val = $el.val();

      // browser checks + required
      if (!ui._element.checkValidity() ||
        ($el.hasClass('required') && (!val.length || !val.trim().length ||
          ui.isHtml(val) && !$(val).text().length
        ))
      ) {
        valid = false;
      }

      // validate URL
      if ($el.hasClass('url') && val.length && !this.valideURL(val)) {
        valid = false;
        msg = 'URL must start with http:// or https://. For example: https://your-domain.com/';
      }

      this.removeError();

      // extra checks
      if (extraChecks) {
        extraChecks.forEach((check) => {
          valid = valid && check();
        });
      }

      if (valid) {
        return true;
      }

      this.setError(scrollTo, msg);

      return false;
    }

    isHtml(str) {
      const doc = new DOMParser().parseFromString(str, "text/html");
      return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
    }

    valideURL(str) {
      const pattern = new RegExp('^(https?:\\/\\/){1}' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return pattern.test(str);
    }

    setError(scrollTo = true, msg = null) {
      const ui = this;
      const $field = $(ui._element).closest('.field');
      const pos = $field.offset().top;

      $field.addClass('error');
      if (msg) {
        $field.append(`<div class="message alert alert-error alert-danger">${  msg  }</div>`);
      }

      if (scrollTo) {
        $field.focus();
        $Html.scrollTop(pos - 100);
      }
    }

    removeError() {
      const ui = this;
      const $field = $(ui._element).closest('.field');

      $field.removeClass('error');

      $field.removeClass('holder-error');
      $field.removeClass('holder-validation');
      $field.find('.message').remove();
    }

    static _jQueryInterface() {
      return this.each(function() {
        // attach functionality to element
        const $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new FormValidateField(this);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = FormValidateField._jQueryInterface;
  $.fn[NAME].Constructor = FormValidateField;
  $.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FormValidateField._jQueryInterface;
  };

  return FormValidateField;
})($);

export default FormValidateField;
