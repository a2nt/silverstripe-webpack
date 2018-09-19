import $ from 'jquery';

import Events from '../_events';

import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';

const DatetimeUI = (($) => {
    // Constants
    const W = window;
    const D = document;
    const $Body = $('body');

    const NAME = 'jsDatetimeUI';
    const DATA_KEY = NAME;

    const datepickerOptions = {
        autoclose: true,
        startDate: 0,
        //todayBtn: true,
        todayHighlight: true,
        clearBtn: true,
    };

    class DatetimeUI {
        constructor(element) {
            const ui = this;
            const $element = $(element);

            $element.data(DATA_KEY, this);
            ui._element = element;

            // datepicker
            if ($element.hasClass('date')) {
                const defaultDate = ($element.attr('name').toLowerCase().indexOf('end') !== -1) ?
                    '+4d' :
                    '+3d';

                $element.attr('readonly', 'true');
                $element.datepicker($.extend(datepickerOptions, {
                    defaultViewDate: defaultDate
                }));
            } else

            // timepicker
            if ($element.hasClass('time')) {
                $element.attr('readonly', 'true');
                $element.timepicker();
            }
        }

        static dispose() {
            console.log(`Destroying: ${NAME}`);
        }

        static _jQueryInterface() {
            return this.each(function() {
                // attach functionality to element
                const $elementement = $(this);
                let data = $elementement.data(DATA_KEY);

                if (!data) {
                    data = new DatetimeUI(this);
                    $elementement.data(DATA_KEY, data);
                }
            });
        }
    }

    // jQuery interface
    $.fn[NAME] = DatetimeUI._jQueryInterface;
    $.fn[NAME].Constructor = DatetimeUI;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return DatetimeUI._jQueryInterface;
    };

    // auto-apply
    $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        $('input.date, input.time').jsDatetimeUI();
    });

    return DatetimeUI;
})($);

export default DatetimeUI;
