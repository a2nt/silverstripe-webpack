import $ from 'jquery';

const SpinnerUI = (($) => {
  class SpinnerUI {
    static show(callback) {
      $('#PageLoading').show(0, callback);
    }

    static hide(callback) {
      $('#PageLoading').hide('slow', callback);
    }
  }

  return SpinnerUI;
})($);

export default SpinnerUI;
