'use strict';

import $ from 'jquery';
import Events from '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_events';

// AOS
import 'aos/dist/aos.css';
import AOS from 'aos/dist/aos.js';

const LayoutUI = (($) => {
  // Constants
  const W = window;
  const $W = $(W);
  const D = document;
  const $Body = $('body');

  const NAME = 'LayoutUI';

  class LayoutUI {
    static init() {
      const ui = this;
      ui.dispose();

      console.log(`${NAME}: init`);
      // your custom UI
      AOS.init();

      // Fire further js when layout is ready
      $W.trigger(Events.LODEDANDREADY);

      // Custom fonts
      $Body.append(
        '<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700,700i&display=swap" rel="stylesheet" />',
      );

      /*google analytics */
      /*(function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
          i[r] ||
          function() {
            (i[r].q = i[r].q || []).push(arguments);
          }),
          (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        'script',
        '//www.google-analytics.com/analytics.js',
        'ga',
      );
      ga('create', 'UA-********-*', 'auto');
      ga('send', 'pageview');*/
    }

    static dispose() {
      console.log(`${NAME}: dispose`);
    }
  }

  $W.on(`${NAME}.init ${Events.AJAX} ${Events.LOADED}`, () => {
    LayoutUI.init();
  });

  W.LayoutUI = LayoutUI;

  return LayoutUI;
})($);

export default LayoutUI;
