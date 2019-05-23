import $ from 'jquery';

import Events from '../_events';

const OpeningHoursUI = (($) => {
  // Constants
  const NAME = 'OpeningHoursUI';

  class OpeningHoursUI {
    // Static methods

    static each(callback) {
      $('.js-opening-hours').each((i, e) => {
        callback(i, $(e));
      });
    }

    static init() {
      this.dispose();
      const hours = $.parseJSON($('.oppening-hours-json').html());
      const date = new Date();
      const dateYMD = this.Date_toYMD(date);
      const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const today = weekday[date.getDay()];
      let html = '<b class="opening-hours-status opening-hours-status-closed">Closed today</b>';

      if (
        typeof hours['days'] !== 'undefined' &&
                typeof hours['days'][today] !== 'undefined' &&
                hours['days'][today].length
      ) {
        html = 'Open today ';
        $.each(hours['days'][today], (i, v) => {
          if (v['DisplayStart'] || v['DisplayEnd']) {
            if (
              (
                v['DisplayStart'] && v['DisplayStart'] <= dateYMD &&
                                v['DisplayEnd'] && v['DisplayEnd'] >= dateYMD
              ) ||
                            (v['DisplayStart'] && v['DisplayStart'] <= dateYMD && !v['DisplayEnd']) ||
                            (v['DisplayEnd'] && v['DisplayEnd'] >= dateYMD && !v['DisplayStart'])
            ) {
              html = `Open today from ${  v['From']  } to ${  v['Till']}`;
              return false;
            }
          } else {
            if (i > 0) {
              html += ', <br/>';
            }
            html += `from ${  v['From']  } to ${  v['Till']}`;
          }
        });

        html += ' <b class="opening-hours-status"></b>';
      }

      if (
        typeof hours['holidays'] !== 'undefined' &&
                typeof hours['holidays'][dateYMD] !== 'undefined'
      ) {
        html = `<b class="opening-hours-status opening-hours-status-closed">Closed today${ 
          hours['holidays'][dateYMD] ? ` for ${  hours['holidays'][dateYMD]}` : '' 
        }</b>`;
      }

      this.each((i, e) => {
        const $e = $(e);
        $e.html(html);
      });
    }

    static Date_toYMD(date) {
      var year, month, day;
      year = String(date.getFullYear());
      month = String(date.getMonth() + 1);
      if (month.length == 1) {
        month = `0${  month}`;
      }
      day = String(date.getDate());
      if (day.length == 1) {
        day = `0${  day}`;
      }
      return `${year  }-${  month  }-${  day}`;
    }

    static dispose() {
      this.each((i, e) => {
        $(e).html('');
      });
    }
  }

  $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    OpeningHoursUI.init();
  });

  return OpeningHoursUI;
})($);

export default OpeningHoursUI;
