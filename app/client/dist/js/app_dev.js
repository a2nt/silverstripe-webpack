!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="app/client/dist",n(n.s="./app/client/src/js/types/dev.js")}({"./app/client/src/js/types/dev.js":function(e,t,n){"use strict";n.r(t);var o=n("jquery"),r=n.n(o),a=n("./node_modules/.pnpm/@a2nt/ss-bootstrap-ui-webpack-boilerplate@2.3.7/node_modules/@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_events.js"),i=n.n(a);n("./app/client/src/scss/dev.scss");function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var l=function(e){var t=window,n=(document,e("body"),function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,o,r;return n=t,r=[{key:"init",value:function(){this.dispose(),console.log("Initializing: ".concat("DevUI"));var t=e("#DevUtilities");this.$el=t;var n=t.find(".original");t.find(".toggle-original").on("click",(function(){n.hasClass("d-none")?n.removeClass("d-none"):n.addClass("d-none")}))}},{key:"dispose",value:function(){console.log("Destroying: ".concat("DevUI"))}}],(o=null)&&s(n.prototype,o),r&&s(n,r),t}());return e(t).on("".concat(i.a.AJAX," ").concat(i.a.LOADED),(function(){n.init()})),n}(r.a);t.default=l},"./app/client/src/scss/dev.scss":function(e,t,n){},"./node_modules/.pnpm/@a2nt/ss-bootstrap-ui-webpack-boilerplate@2.3.7/node_modules/@a2nt/ss-bootstrap-ui-webpack-boilerplate/src/js/_events.js":function(e,t){e.exports={AJAX:"ajax-load",TABHIDDEN:"tab-hidden",TABFOCUSED:"tab-focused",OFFLINE:"offline",ONLINE:"online",LOADED:"load",SWIPELEFT:"swipeleft panleft",SWIPERIGHT:"swiperight panright",ALLERTAPPEARED:"alert-appeared",ALERTREMOVED:"alert-removed",LODEDANDREADY:"load-ready",LAZYIMAGEREADY:"image-lazy-bg-loaded",LAZYIMAGESREADY:"images-lazy-loaded",MAPLOADED:"map-loaded",MAPAPILOADED:"map-api-loaded",MAPMARKERCLICK:"map-marker-click",MAPPOPUPCLOSE:"map-popup-close",SCROLL:"scroll",RESIZE:"resize",CAROUSEL_READY:"bs.carousel.ready",SET_TARGET_UPDATE:"set-target-update",RESTORE_FIELD:"restore-field",FORM_INIT_BASICS:"form-basics",FORM_INIT_STEPPED:"form-init-stepped",FORM_INIT_VALIDATE:"form-init-validate",FORM_INIT_VALIDATE_FIELD:"form-init-validate-field",FORM_INIT_STORAGE:"form-init-storage",FORM_VALIDATION_FAILED:"form-validation-failed",FORM_STEPPED_NEW_STEP:"form-new-step",FORM_STEPPED_FIRST_STEP:"form-first-step",FORM_STEPPED_LAST_STEP:"form-last-step",FORM_FIELDS:"input,textarea,select"}},jquery:function(e,t){e.exports=jQuery}});