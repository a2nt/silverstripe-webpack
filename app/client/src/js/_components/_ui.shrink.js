"use strict";

import $ from 'jquery';

const ShrinkUI = (($) => {
    // Constants
    const G = window;
    const D = document;

    // shrink bar
    $(G).scroll(function() {
        if ($(D).scrollTop() > 100) {
            $('body').addClass('shrink');
        } else {
            $('body').removeClass('shrink');
        }
    });

    return ShrinkUI;
})($);

export default ShrinkUI;
