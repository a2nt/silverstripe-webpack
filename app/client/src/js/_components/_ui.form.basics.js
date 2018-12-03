import 'bootstrap-select/js/bootstrap-select';

import $ from 'jquery';
import Events from "../_events";

const FormBasics = (($) => {
    // Constants
    const NAME = 'jsFormBasics';
    const DATA_KEY = NAME;
    const $Html = $('html, body');

    class FormBasics {

        constructor(element) {
            const ui = this;
            const $element = $(element);

            ui._element = element;
            $element.data(DATA_KEY, this);

            const $fields = $element.find('input,textarea,select');
            const $selectFields = $element.find('select:not([readonly])');
            const $radioOptions = $element.find('input[type="radio"]');

            $selectFields.each((i, el) => {
                const $el = $(el);

                $el.selectpicker({
                    liveSearch: $el.data('live-search')
                });
            });

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

                $parent.siblings('.radio').removeClass('checked');
                if ($el.is(':checked')) {
                    $parent.addClass('checked');
                }
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
            return this.each(function() {
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

    // auto-apply
    $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        $('form').each((i, el) => {
            const $el = $(el);

            // skip some forms
            if ($el.hasClass('no-validation')) {
                return true;
            }

            $el.jsFormBasics();
        });
    });

    return FormBasics;
})($);

export default FormBasics;
