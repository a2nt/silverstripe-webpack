import $ from 'jquery';

const SlidingMenu = (($) => {
  // Constants
  const NAME = 'jsSlidingMenu';
  const DATA_KEY = NAME;

  class SlidingMenu {
    // Constructor
    constructor(el) {
      const $el = $(this._el);
      this.$el = $el;
      $el.addClass(`${NAME}-active`);

      // esc button
      $(window).on('keyup', ((e) => {
        if (e.which === 27) {
          $el.find('.is-open[data-toggle="offcanvas"]').click();
        }
      }));
    }

    // Public methods
    dispose() {
      console.log(`Disposing: ${NAME} els`);

      this.$el.removeClass(`${NAME}-active`);
      $.removeData(this.$el, DATA_KEY);
      this.$el = null;
    }

    static _jQueryInterface() {
      return this.each(function() {
        // attach functionality to el
        const $el = $(this);
        let data = $el.data(DATA_KEY);

        if (!data) {
          data = new SlidingMenu(this);
          $el.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = SlidingMenu._jQueryInterface;
  $.fn[NAME].Constructor = SlidingMenu;
  $.fn[NAME].noConflict = function() {
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
