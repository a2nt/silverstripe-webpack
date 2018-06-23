import $ from 'jquery';

const SlidingMenu = (($) => {
  // Constants
  const NAME = 'jsSlidingMenu';
  const DATA_KEY = NAME;

  class SlidingMenu {
    // Constructor
    constructor(element) {
      this._element = element;
      const $element = $(this._element);
      $element.addClass(`${NAME}-active`);

      // esc button
      $(window).on('keyup',((e) => {
        if (e.which === 27) {
          $element.find('.is-open[data-toggle="offcanvas"]').click();
        }
      }));
    }

    // Public methods
    dispose() {
      console.log(`Disposing: ${NAME} elements`);

      $(this._element).removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    static _jQueryInterface() {
      return this.each(function () {
        // attach functionality to element
        const $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new SlidingMenu(this);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = SlidingMenu._jQueryInterface;
  $.fn[NAME].Constructor = SlidingMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return SlidingMenu._jQueryInterface;
  };

  // auto-apply
  $(`.ui.${NAME}`).ready(() => {
    $(`.ui.${NAME}`).jsSlidingMenu();
  });

  return SlidingMenu;
})($);

export default SlidingMenu;
