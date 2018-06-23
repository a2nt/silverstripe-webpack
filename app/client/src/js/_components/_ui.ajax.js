"use strict";

import $ from 'jquery';
import Events from '../_events';
import Spinner from './_ui.spinner';

const AjaxUI = (($) => {
  // Constants
  const G = window;
  const D = document;
  const $Html = $('html');
  const $Body = $('body');

  const NAME = 'jsAjaxUI';
  const DATA_KEY = NAME;

  class AjaxUI {
    // Constructor
    constructor(element) {
      this._element = element;
      const $element = $(this._element);
      $element.addClass(`${NAME}-active`);

      $element.bind('click', function (e) {
        e.preventDefault();

        const $this = $(this);

        $('.ajax').each(function () {
          const $this = $(this);
          $this.removeClass('active');
          $this.parents('.nav-item').removeClass('active');
        });

        $this.addClass('loading');

        AjaxUI.load($this.attr('href'), () => {
          $this.removeClass('loading');
          $this.parents('.nav-item').addClass('active');
          $this.addClass('active');
        });
      });
    }

    // Public methods
    static load(url, callback) {
      // show spinner
      Spinner.show(() => {
        $Body.removeClass('loaded');
      });

      // update document location
      G.MainUI.updateLocation(url);

      const absoluteLocation = G.URLDetails['base'] + G.URLDetails['relative'].substring(1);
      if (absoluteLocation !== G.location.href) {
        G.history.pushState({
          ajax: true,
          page: absoluteLocation,
        }, document.title, absoluteLocation);
      }

      $.ajax({
        sync: false,
        async: true,
        url,
        dataType: 'json',
        method: 'GET',
        cache: false,
        error(jqXHR) {
          console.warn(`AJAX request failure: ${jqXHR.statusText}`);
          G.location.href = url;

          // google analytics
          if (typeof G.ga === 'function') {
            G.ga('send', 'event', 'error', 'AJAX ERROR', jqXHR.statusText);
          }
        },
        success(data, status, jqXHR) {
          AjaxUI.process(data,jqXHR, callback);

          // google analytics
          if (typeof G.ga === 'function') {
            G.ga('set', {
              page: G.URLDetails['relative'] + G.URLDetails['hash'],
              title: jqXHR.getResponseHeader('X-Title'),
            });
            G.ga('send', 'pageview');
          }
        },
      });
    }

    static process(data, jqXHR, callback) {
      const css = jqXHR.getResponseHeader('X-Include-CSS').split(',') || [];
      const js = jqXHR.getResponseHeader('X-Include-JS').split(',') || [];

      // Replace HTML regions
      if (typeof (data.regions) === 'object') {
        for (const key in data.regions) {
          if (typeof (data.regions[key]) === 'string') {
            AjaxUI.replaceRegion(data.regions[key], key);
          }
        }
      }

      // remove already loaded scripts
      $('link[type="text/css"]').each(function () {
        const i = css.indexOf($(this).attr('href'));
        if (i > -1) {
          css.splice(i, 1);
        }else if(!$Body.data('unload-blocked')) {
          console.log(`Unloading: ${  $(this).attr('href')}`);
          $(this).remove();
        }
      });

      $('script[type="text/javascript"]').each(function () {
        const i = js.indexOf($(this).attr('src'));
        if (i > -1) {
          js.splice(i, 1);
        }else if(!$Body.data('unload-blocked')) {
          console.log(`Unloading: ${  $(this).attr('src')}`);
          $(this).remove();
        }
      });

      // preload CSS
      this.preload(css).then(() => {
        const $head = $('head');
        css.forEach((el) => {
          $head.append(`<link rel="stylesheet" type="text/css" href="${el}" />`);
        });

        // preload JS
        this.preload(js, 'script').then(() => {

          js.forEach((el) => {
            $Body.append(`<script type="text/javascript" charset="UTF-8" src="${el}"></script>`);
          });

          console.log('New page is loaded!');

          // trigger events
          if (typeof (data.events) === 'object') {
            for (const eventName in data.events) {
              $(D).trigger(eventName, [data.events[eventName]]);
            }
          }

          if (typeof callback !== 'undefined') {
            callback();
          }

          $(G).trigger(Events.AJAX);
        });
      });
    }

    static preload(items, type = 'text', cache = true) {
      if (!items.length) {
        return $.Deferred().resolve().promise();
      }

      const dfds = [];
      items.forEach((url) => {
        const dfd = $.Deferred();

        $.ajax({
          dataType: type,
          cache,
          url,
        }).always(() => {
          dfd.resolve();
        });

        dfds.push(dfd);
      });

      // return a master promise object which will resolve when all the deferred objects have resolved
      return $.when(...dfds);
    }

    static replaceRegion(html, key) {
      const $region = $(`[data-ajax-region="${key}"]`);

      if ($region.length) {
        $region.empty().append(html);
      } else {
        console.warn('Region returned without class or id!');
      }
    }

    dispose() {
      const $element = $(this._element);

      $element.removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    static _jQueryInterface() {
      return this.each(function () {
        // attach functionality to element
        const $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new AjaxUI(this);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  // jQuery interface
  $.fn[NAME] = AjaxUI._jQueryInterface;
  $.fn[NAME].Constructor = AjaxUI;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return AjaxUI._jQueryInterface;
  };

  // auto-apply
  $('.ajax').ready(() => {
    $('.ajax').jsAjaxUI();
  });

  // AJAX update browser title
  $(D).on('layoutRefresh', (e, data) => {
    D.title = data.Title;

    $Html.attr('class','');
    if(data.ClassName){
      $Html.addClass(data.ClassName);
    }
    //data.Link = (data.Link === '/home/') ? '/' : data.Link;
  });

  // Back/Forward functionality
  G.onpopstate = function(event) {
    const $existingLink = $(`a[href^="${  D.location  }"]`);

    if(event.state !== null && event.state.ajax){
      console.log('GOBACK (AJAX state)');
      AjaxUI.load(event.state.page);
    }else if($existingLink.length && $existingLink.hasClass('ajax')){
      console.log('GOBACK (AJAX link)');
      $existingLink.trigger('click');
    }else{
      console.log('GOBACK (HTTP)');
      G.location.href = D.location;
    }
  };

  return AjaxUI;
})($);

export default AjaxUI;
