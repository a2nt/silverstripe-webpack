import $ from 'jquery';

import Events from './_events';
// import an example component
import Spinner from './_components/_spinner';

const MainUI = (($) => {
  // Constants
  const NAME = 'MainUI';

  class MainUI {
    // Static methods
    static init() {
      this.destroy();
      console.log(`Initializing: ${NAME}`);

      Spinner.hide(() => {
        $('body').addClass('loaded');
      });
    }

    static destroy() {
      console.log(`Destroying: ${NAME}`);
      Spinner.show(() => {
        $('body').removeClass('loaded');
      });
    }
  }

  $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    MainUI.init();
  });

  return MainUI;
})($);

export default MainUI;
