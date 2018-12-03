import $ from 'jquery';
import Events from '../_events';
import LANG from '../lang/_en';
import FormValidateField from "./_ui.form.validate.field";

const SteppedForm = (($) => {
    // Constants
    const NAME = 'jsSteppedForm';
    const DATA_KEY = NAME;

    class SteppedForm {

        constructor(element) {
            const ui = this;
            const $element = $(element);

            $element.data(DATA_KEY, this);

            if (!$element.find('.steps-counter').length) {
                $element.prepend(LANG['en'][NAME]['STEPCOUNTER']);
            }

            if (!$element.find('.steps-buttons').length) {
                $element.append(LANG['en'][NAME]['STEPBUTTONS']);
            }

            ui._currentStepCounter = $element.find('.steps-counter .current-step');
            ui._totalStepsCounter = $element.find('.steps-counter .total-steps');

            ui._steps = $element.find('.step');
            ui._stepNext = $element.find('.step-next');

            ui._stepPrev = $element.find('.step-prev');
            ui._actions = $element.children('.btn-toolbar,.form-actions');

            ui._element = element;
            ui._currentStep = 1;
            ui._totalSteps = ui._steps.last().data('step') || ui._steps.length;
            ui._stepsOrder = [];

            ui._totalStepsCounter.text(ui._totalSteps);

            // check if one of the steps already has an error
            const $hasError = ui._steps
                .find('.field.error,.field.holder-error,.field.holder-validation,.field.holder-info,.field.holder-warning,.field.holder-good')
                .first();
            if ($hasError.length) {
                const $modal = $element.parents('.modal');

                // show modal
                if ($modal.length && typeof $modal.modal !== 'undefined') {
                    $modal.modal('show');
                }

                ui._currentStep = $hasError.parents('.step').data('step') || ui._currentStep;
            }
            //

            ui.step('.step[data-step="' + ui._currentStep + '"]');

            ui._stepNext.on('click', (e) => {
                e.preventDefault();
                ui.next();
            });

            ui._stepPrev.on('click', (e) => {
                e.preventDefault();
                ui.prev();
            });

            $element.find('.step-toggle').on('click', (e) => {
                const $el = $(e.currentTarget);

                e.preventDefault();
                ui.step($el.data('target'));
            });

            $element.addClass(`${NAME}-active`);
            $element.trigger(Events.FORM_INIT_STEPPED);
        }

        // Public methods
        dispose() {
            const ui = this;
            const $element = $(ui._element);

            $element.removeClass(`${NAME}-active`);
            $.removeData(ui._element, DATA_KEY);
            ui._element = null;
        }

        next() {
            const ui = this;

            if (ui._currentStep >= ui._totalSteps) {
                return;
            }

            ui.step('.step[data-step="' + (ui._currentStep + 1) + '"]');
        }

        prev() {
            const ui = this;

            if (ui._currentStep <= 1) {
                return;
            }

            ui.step(ui._stepsOrder[ui._currentStep - 1]);
        }

        step(target) {
            const ui = this;
            const $element = $(ui._element);
            const $target = $element.find(target);
            const targetStep = parseInt($target.data('step'));

            // validate current step
            let valid = true;

            if (targetStep > ui._currentStep) {
                ui.currentStep().find('input,textarea,select').each((i, el) => {
                    const $el = $(el);
                    const fieldUI = $el.data('jsFormValidateField');

                    if (fieldUI && !fieldUI.validate()) {
                        valid = false;
                    }
                });
            }

            if (!valid) {
                return false;
            }
            //

            if (parseInt($target.data('step')) <= '1') {
                ui._stepPrev.hide();
                $element.trigger(Events.FORM_STEPPED_FIRST_STEP);
            } else {
                ui._stepPrev.show();
            }

            if (parseInt($target.data('step')) >= ui._totalSteps) {
                ui._stepNext.hide();
                ui._actions.show();

                $element.trigger(Events.FORM_STEPPED_LAST_STEP);
            } else {
                ui._stepNext.show();
                ui._actions.hide();
            }

            ui._currentStep = targetStep;
            ui._stepsOrder[ui._currentStep] = $target;

            ui._steps.removeClass('active');
            $target.addClass('active');

            ui._currentStepCounter.text(ui._currentStep);

            $target.trigger(Events.FORM_STEPPED_NEW_STEP);
            $element.trigger(Events.FORM_STEPPED_NEW_STEP);
        }

        currentStep() {
            const ui = this;
            const $element = $(ui._element);

            return $element.find('.step.active');
        }

        static _jQueryInterface() {
            return this.each(function() {
                // attach functionality to element
                const $element = $(this);
                let data = $element.data(DATA_KEY);

                if (!data) {
                    data = new SteppedForm(this);
                    $element.data(DATA_KEY, data);
                }
            });
        }
    }

    // jQuery interface
    $.fn[NAME] = SteppedForm._jQueryInterface;
    $.fn[NAME].Constructor = SteppedForm;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return SteppedForm._jQueryInterface;
    };

    // auto-apply
    $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        $('.form-stepped').jsSteppedForm();
    });

    return SteppedForm;
})($);

export default SteppedForm;
