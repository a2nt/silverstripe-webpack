import $ from 'jquery';
import Events from "../_events";

const FormStorage = (($) => {
    // Constants
    const NAME = 'jsFormStorage';
    const DATA_KEY = NAME;
    const STORAGE = window.localStorage;

    class FormStorage {

        constructor(element) {
            const ui = this;
            const $element = $(element);
            const $elements = $element.find('input, textarea, select');

            const setRangeValues = function(el) {
                let $el = $(el);
                $el.siblings('.value').text($el.val());
            };

            ui._element = element;
            $element.data(DATA_KEY, this);

            $element.addClass(`${NAME}-active`);

            // restore form data from localStorage
            $elements.each((i, el) => {
                const $el = $(el);
                const id = $el.attr('id');
                const type = $el.attr('type');
                const val = STORAGE.getItem(NAME + id);

                if (type === 'file') {
                    return true;
                }

                if (id && val && type) {
                    if (type && (type === 'checkbox' || type === 'radio')) {
                        $el.prop('checked', val);
                    } else {
                        $el.val(val);
                    }
                }

                $el.trigger(Events.RESTORE_FIELD);
            });

            // range fields
            $('input[type="range"]').each((i, el) => {
                setRangeValues(el);
            });

            $element.trigger(Events.RESTORE_FIELD);

            $('input[type="range"]').on('change', (e) => {
                setRangeValues(e.currentTarget);
            });

            // store form data into localStorage
            $elements.on('change', (e) => {
                const $el = $(e.currentTarget);
                const id = $el.attr('id');
                const type = $el.attr('type');

                // skip some elements
                if ($el.hasClass('no-storage')) {
                    return true;
                }

                let val = $el.val();

                if (type && (type === 'checkbox' || type === 'radio')) {
                    val = !!$el.is(':checked');
                }

                if (id && type && type !== 'password') {
                    STORAGE.setItem(NAME + id, val);
                }
            });

            $element.on('submit', () => {
                $element.data(DATA_KEY).clear();
            });

            $element.find('button,[type="submit"],[type="clear"]').on('click', () => {
                $element.data(DATA_KEY).clear();
            });

            $element.addClass(`${NAME}-active`);
            $element.trigger(Events.FORM_INIT_STORAGE);
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
                return this.each(function() {
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
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return FormStorage._jQueryInterface;
    };

    // auto-apply
    $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        $('form').each((i, el) => {
            const $el = $(el);

            // skip some forms
            if ($el.hasClass('no-storage')) {
                return true;
            }

            $el.jsFormStorage();
        });
    });

    return FormStorage;
})($);

export default FormStorage;
