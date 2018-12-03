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

            $element.on('change', (e) => {
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

            // browser checks + required
            if (!ui._element.checkValidity() ||
                ($el.hasClass('required') && !$el.val().trim().length)
            ) {
                valid = false;
            }

            // extra checks
            if (extraChecks) {
                extraChecks.forEach((check) => {
                    valid = valid && check();
                });
            }

            if (valid) {
                this.removeError();
                return true;
            }

            this.setError(scrollTo);
            return false;
        }

        setError(scrollTo = true) {
            const ui = this;
            const $field = $(ui._element).closest('.field');
            const pos = $field.offset().top;

            $field.addClass('error');

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
