import $ from 'jquery';

import 'bootstrap-select/dist/js/bootstrap-select';
$.fn.selectpicker.Constructor.BootstrapVersion = '4';

import 'jquery.inputmask/dist/jquery.inputmask.bundle';

import Events from "../_events";
import SpinnerUI from './_ui.spinner';
import FormFieldUI from './_ui.form.fields';

const FormBasics = (($) => {
  // Constants
  const NAME = 'jsFormBasics';
  const DATA_KEY = NAME;
  const $Html = $('html, body');
  const W = window;
  const D = document;

  class FormBasics {

    constructor(element) {
      const ui = this;
      const $element = $(element);

      ui._element = element;
      $element.data(DATA_KEY, this);

      $('[data-inputmask]').inputmask();

      const $fields = $element.find(Events.FORM_FIELDS);
      // init fields ui
      $fields.each((i, el) => {
        // skip some fields here
        new FormFieldUI(el);
      });

      const $selectFields = $element.find('select:not([readonly])');
      const $radioOptions = $element.find('input[type="radio"]');
      const separator = '::;::';

      $selectFields.each((i, el) => {
        const $el = $(el);
        const maxOptions = $el.data('max-options') || false;

        $el.selectpicker($.extend({
          iconBase: 'fas',
          tickIcon: 'fa-check',
          virtualScroll: false,
          dropupAuto: false,
          size: 10,
          maxOptions,
        }, $el.data(), {
          multipleSeparator: separator,
        }));

        // wrap options
        if (maxOptions > 1) {
          const wrapOptions = () => {
            if (!$el.val().length) {
              return true;
            }

            const $container = $el.parent().find('.dropdown-toggle .filter-option');
            const val = $container.text();
            const vals = val.split(separator);
            let html = '';

            vals.forEach((opt) => {
              const $opt = $el.find('option').filter((i, e) => {
                return $(e).text() === opt;
              });

              html += `<span class="option" data-val=${  $opt.attr('value')  }>${  opt
            } <i class="fas fa-times btn-remove"></i></span>`;

            });

            $container.html(html);

            // remove value
            $container.find('.option').on('click', (e) => {
              e.preventDefault();

              const $opt = $(e.currentTarget);
              const val = $opt.data('val').toString();
              //$opt.remove();

              const vals = $el.selectpicker('val');
              const i = vals.indexOf(val);
              if (i > -1) {
                vals.splice(i, 1);
                $el.selectpicker('val', vals);
              }

              wrapOptions();
            });
          };

          $el.on('rendered.bs.select changed.bs.select refreshed.bs.select loaded.bs.select change', wrapOptions);
          wrapOptions();
        }
      });

      // FIX: missing conflicting 'bootstrap/js/dist/dropdown' with bootstrap-select/dist/js/bootstrap-select
      $('[data-toggle="dropdown"]').on('click', (e) => {
        $(e.currentTarget).siblings('.dropdown-menu').toggleClass('show');
      });

      $('.dropdown-menu a').on('click', (e) => {
        $(e.currentTarget).parents('.dropdown-menu').removeClass('show');
      });
      // /FIX

      $fields.each((e, el) => {
        const $el = $(el);

        if ($el.hasClass('required') || $el.attr('aria-required')) {
          $el.closest('.field').addClass('required');
        }
      });

      $radioOptions.each((e, el) => {
        const $el = $(el);

        if ($el.is(':checked')) {
          $el.parents('.radio').addClass('checked');
        }
      });

      $radioOptions.on('change', (e) => {
        const $el = $(e.currentTarget);
        const $parent = $el.parents('.radio');

        $parent.siblings('.radio').each((i, el) => {
          const $el = $(el);

          if (!$el.find('input').is(':checked')) {
            $el.removeClass('checked');
          }
        });

        if ($el.is(':checked')) {
          $parent.addClass('checked');
        }
      });

      $element.on('submit', (e) => {
        SpinnerUI.show();
      });

      $element.addClass(`${NAME}-active`);
      $element.trigger(Events.FORM_INIT_BASICS);
    }

    // Public methods
    dispose() {
      const $element = $(this._element);

      $element.removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    static _jQueryInterface() {
      return this.each(() => {
        // attach functionality to element
        const $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new FormBasics(this);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = FormBasics._jQueryInterface;
  $.fn[NAME].Constructor = FormBasics;
  $.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FormBasics._jQueryInterface;
  };

  const init = () => {
    $('form').jsFormBasics();
  };

  // auto-apply
  $(W).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    init();
  });

  return FormBasics;
})($);

export default FormBasics;
