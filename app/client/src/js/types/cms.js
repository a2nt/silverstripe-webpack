/* eslint-disable no-console */
/* eslint-disable no-shadow */

import '../../scss/_cms.scss';
import '@a2nt/meta-lightbox-js/src/js/app';

(function ($) {
  $.entwine('ss', ($) => {
    $('[data-toggle="lightbox"]').entwine({
      onmatch() {
        console.log('Init lightbox links at CMS');
        window.dispatchEvent(new Event('MetaWindow.initLinks'));
      },
    });
  });
}(jQuery));
