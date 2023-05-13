'use strict'

import '../../scss/cms.scss'
import "@a2nt/meta-lightbox-js/src/js/app";
// import '@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_components/_ui.image-position';

(function ($) {
  $.entwine("ss", ($) => {
    $('[data-toggle="lightbox"]').entwine({
      onmatch() {
        console.log("Init lightbox links at CMS");
        window.dispatchEvent(new Event("MetaWindow.initLinks"));
      },
    });
  });
})(jQuery);
