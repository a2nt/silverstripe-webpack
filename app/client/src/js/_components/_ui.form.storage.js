import $ from 'jquery';
import Events from "../_events";

const FormStorage = (($) => {
  // Constants
  const NAME = 'jsFormStorage';
  const DATA_KEY = NAME;
  const STORAGE = window.localStorage;

  class FormStorage {
    // Constructor
    constructor(element) {
      this._element = element;
      const $element = $(this._element);
      const $elements = $element.find('input,textarea');

      $element.addClass(`${NAME}-active`);

      // restore form data from localStorage
      $elements.each(function () {
        const id = $(this).attr('id');
        const type = $(this).attr('type');
        const val = STORAGE.getItem(NAME + id);

        if (id && val && type) {
          if (type && (type === 'checkbox' || type === 'radio')) {
            $(this).prop('checked', val);
          } else {
            $(this).val(val);
          }
        }
      });

      // store form data into localStorage
      $elements.change(function () {
        const id = $(this).attr('id');
        const type = $(this).attr('type');
        let val = $(this).val();

        if (type && (type === 'checkbox' || type === 'radio')) {
          val = !!$(this).is(':checked');
        }

        if (id && type && type !== 'password') {
          STORAGE.setItem(NAME + id, val);
        }
      });

      $element.submit(() => {
        $element.data(DATA_KEY).clear();
      });

      $element.find('button,[type="submit"],[type="clear"]').click(() => {
        $element.data(DATA_KEY).clear();
      });
    }

    // Public methods
    dispose() {
      const $element = $(this._element);

      $element.removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    clear() {
      STORAGE.clear();
    }

    static _jQueryInterface() {
      if (typeof window.localStorage !== 'undefined') {
        return this.each(function () {
          // attach functionality to element
          const $element = $(this);
          let data = $element.data(DATA_KEY);

          if (!data) {
            data = new FormStorage(this);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }
  }

  // jQuery interface
  $.fn[NAME] = FormStorage._jQueryInterface;
  $.fn[NAME].Constructor = FormStorage;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FormStorage._jQueryInterface;
  };

  // auto-apply
  $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    $('form').jsFormStorage();
  });

  return FormStorage;
})($);

export default FormStorage;
