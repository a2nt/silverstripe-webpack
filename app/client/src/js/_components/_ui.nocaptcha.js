import $ from 'jquery';
import Events from '../_events';
import Spinner from './_ui.spinner';

const NoCaptcha = (($) => {
    // Constants
    const W = window;
    const D = document;
    const $Body = $('body');

    const NAME = 'NoCaptcha';

    class NoCaptcha {
        static init() {
            const ui = this;
            ui.dispose();

            console.log(`Initializing: ${NAME}`);
            this.renderCaptcha();
        }

        static dispose() {
            console.log(`Destroying: ${NAME}`);
        }

        static renderCaptcha() {
            console.log(`Rendering Captcha: ${NAME}`);

            if (typeof grecaptcha === 'undefined') {
                console.log('Captcha API isn\'t available yet');
            }

            const $_noCaptchaFields = $('.g-recaptcha');

            const submitListener = (e) => {
                e.preventDefault();

                grecaptcha.execute();
            };

            $_noCaptchaFields.each((i, field) => {
                const $field = $(field);

                if ($field.data('widgetid')) {
                    return;
                }

                const $form = $field.data('form') ? $('#' + $field.data('form')) : $field.parents('form');

                //For the invisible captcha we need to setup some callback listeners
                if ($field.data('size') === 'invisible' && !$field.data('callback')) {
                    $form.on('submit', submitListener);
                }

                const widget_id = grecaptcha.render(field, $field.data());
                $field.data('widgetid', widget_id);
            });

        }
    }

    $(W).on(`${Events.AJAX}`, () => {
        NoCaptcha.init();
    });

    W.NoCaptcha = NoCaptcha;
    W.noCaptchaFieldRender = NoCaptcha.renderCaptcha;

    return NoCaptcha;
})($);

export default NoCaptcha;
