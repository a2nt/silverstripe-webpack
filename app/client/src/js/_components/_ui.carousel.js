import $ from 'jquery';

import 'hammerjs/hammer';
import 'jquery-hammerjs/jquery.hammer';

import Events from '../_events';

const CarouselUI = (($) => {
  // Constants
  const NAME = 'CarouselUI';

  class CarouselUI {
    // Static methods

    static each(callback) {
      $('.js-carousel').each((i, e) => {
        callback(i, $(e));
      });
    }

    static init() {
      this.dispose();

      this.each((i, e) => {
        const $e = $(e),
          id = `Carousel${i}`;

        $e.attr('id', id);
        $e.data('id', i);

        const $items = $(e).find('.carousel-item'),
          count = $items.length;
        if (!count) {
          return;
        }

        // create carousel-controls
        if ($e.data('indicators')) {
          const $indicators = $('<ol class="carousel-indicators"></ol>');
          $indicators.append(`<li data-target="#${  id  }" data-slide-to="0" class="active"></li>`);
          for (let i = 1; i < count; i++) {
            $indicators.append(`<li data-target="#${  id  }" data-slide-to="${  i  }"></li>`);
          }
          $e.prepend($indicators);
        }

        // create arrows
        if ($e.data('arrows')) {
          $e.prepend(`<i class="carousel-control-prev" data-target="#${  id  }" role="button" data-slide="prev"><i class="fas fa-chevron-left" aria-hidden="true"></i><i class="sr-only">Previous</i></i>`);
          $e.prepend(`<i class="carousel-control-next" data-target="#${  id  }" role="button" data-slide="next"><i class="fas fa-chevron-right" aria-hidden="true"></i><i class="sr-only">Next</i></i>`);
        }

        // init carousel
        $e.carousel();

        const $youtubeSlides = $e.find('iframe[src^="https://www.youtube.com/embed/"]');

        $e.on('slide.bs.carousel', () => {
          if ($youtubeSlides.length) {
            $youtubeSlides.each((i, e) => {
              const $e = $(e);
              try {
                $e.data('player', new YT.Player(e, {
                  events: {
                    'onReady': () => {
                      $e.data('player').pauseVideo();
                    }
                  }
                }));

                $e.data('player').pauseVideo();
              } catch (e) {}
            });
          }
        });

        $e.find('.carousel-control-prev').on('click', (e) => {
          e.preventDefault();
          $e.carousel('prev');
        });

        $e.find('.carousel-control-next').on('click', (e) => {
          e.preventDefault();
          $e.carousel('next');
        });

        // init touch swipes
        $e.hammer().bind('swipeleft', (event) => {
          $(event.target).carousel('next');
        });

        $e.hammer().bind('swiperight', (event) => {
          $(event.target).carousel('prev');
        });

        $e.hammer().bind('panleft', (event) => {
          $(event.target).carousel('next');
        });

        $e.hammer().bind('panright', (event) => {
          $(event.target).carousel('prev');
        });

        $e.find('.carousel-item').hammer().bind('tap', (event) => {
          $(event.target).carousel('next');
        });
      });
    }

    static dispose() {
      this.each((i, e) => {
        $(e).carousel('dispose');
      });
    }
  }

  $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    CarouselUI.init();
  });

  return CarouselUI;
})($);

export default CarouselUI;
