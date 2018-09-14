import $ from 'jquery';

import Events from './_events';
import Spinner from './_components/_ui.spinner';

// your custom components
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';

const LayoutUI = (($) => {
    // Constants
    const W = window;
    const D = document;
    const $Body = $('body');

    const NAME = 'LayoutUI';

    const datepickerOptions = {
        autoclose: true,
        startDate: 0,
        //todayBtn: true,
        todayHighlight: true,
        clearBtn: true,
    };

    class LayoutUI {
        static init() {
            this.dispose();

            console.log(`Initializing: ${NAME}`);
            // your custom UI

            const $dateFields = $Body.find('input.date');
            const $timeFields = $Body.find('input.time');

            // datepicker
            $dateFields.each((i, e) => {
                const $e = $(e);
                const defaultDate = ($e.attr('name').toLowerCase().indexOf('end') !== -1) ?
                    '+4d' :
                    '+3d';

                $e.attr('readonly', 'true');
                $e.datepicker($.extend(datepickerOptions, {
                    defaultViewDate: defaultDate
                }));
            });

            // timepicker
            $timeFields.each((i, e) => {
                const $e = $(e);
                $e.attr('readonly', 'true');
                $e.timepicker();
            });
        }

        static dispose() {
            console.log(`Destroying: ${NAME}`);
        }
    }

    $(W).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        LayoutUI.init();
    });

    W.LayoutUI = LayoutUI;

    return LayoutUI;
})($);

export default LayoutUI;
