import $ from "jquery";

const TypePage = (($) => {

    // Constants
    const NAME = "TypePage";
    //const DATA_KEY  = "pageUI." + NAME;

    const Events = require("./_events");

    class TypePage {
        // Static methods
        static init() {
            console.log("Initializing: " + NAME);
        }

        static destroy() {
            console.log("Destroying: " + NAME);
        }

        /**
         * jQuery extension functions
         // Constructor
         constructor(element) {
            console.log("Constructing: " + NAME + " elements");

            this._element = element;
        }

         // Public methods
         dispose() {
            console.log("Disposing: " + NAME + " elements");

            $.removeData(this._element, DATA_KEY);
            this._element = null;
        }

         static _jQueryInterface() {
            return this.each(function () {
                // attach functionality to element
                const $element = $(this);
                let data       = $element.data(DATA_KEY);

                if (!data) {
                    data = new TypePage(this);
                    $element.data(DATA_KEY, data);
                }
            })
        }
         */
    }

    $(window).on(Events.AJAX + " " + Events.LOADED, function() {
        TypePage.init();
    });

    // JQuery extension functions
    /*
    $.fn[NAME]             = TypePage._jQueryInterface;
    $.fn[NAME].Constructor = TypePage;
    $.fn[NAME].noConflict  = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return TypePage._jQueryInterface;
    };
    // auto-apply
    $(".ui." + NAME).ready(function(){
        $(".ui." + NAME).TypePage();
    });*/

    return TypePage;
})($);

export default TypePage;


/*
import $ from 'jquery';

(function (G) {
    G.initPulsePage = function () {
        G.destroyPulsePage();
    };

    G.destroyPulsePage = function () {};

    $(window).on("ajax-content-loaded", function () {
        G.initPulsePage();
    });

    $(document).ready(function () {
        G.initPulsePage();
    });
}(this));*/