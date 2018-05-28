/**
 * Just an example component
 */
import $ from 'jquery';

const SliderUI = (($) => {
  class SliderUI {
    static init() {
      this.each(function ($this) {
        const $items = $this.find('.carousel-item'),
          id = $this.attr('id'),
          count = $items.length;

        if(!count){
          return;
        }

        if($this.data('indicators')) {
          let $controls = $('<ol class="carousel-indicators"></ol>');
          $controls.append('<li data-target="#' + id + '" data-slide-to="0" class="active"></li>');
          for (let i = 1; i < count; i++) {
            $controls.append('<li data-target="#' + id + '" data-slide-to="' + i + '"></li>');
          }
          $this.prepend($controls);
        }

        if($this.data('arrows')){
          $this.prepend('<i class="carousel-control-prev" data-target="#' + id + '" role="button" data-slide="prev"><i class="fas fa-chevron-left" aria-hidden="true"></i><i class="sr-only">Previous</i></i>');
          $this.prepend('<i class="carousel-control-next" data-target="#' + id + '" role="button" data-slide="next"><i class="fas fa-chevron-right" aria-hidden="true"></i><i class="sr-only">Next</i></i>');
        }

        $this.carousel();
      });
    }

    static dispose() {
      self.each(function ($this) {
        $this.carousel('dispose');
      });
    }

    static each(callback) {
      $('.carousel').each(function () {
        callback($(this));
      });
    }
  }
  return SliderUI;
})($);

export default SliderUI;
