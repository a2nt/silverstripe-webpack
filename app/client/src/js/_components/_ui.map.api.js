'use strict';

import $ from 'jquery';
import Events from "../_events";
import mapBoxGL from "mapbox-gl";
//import "./mapStorage";

import "../../scss/types/MapPage.scss";

const W = window;

const MapAPI = (($) => {
  const STORAGE = W.localStorage;

  // Constants
  const NAME = 'jsMapAPI';
  const DATA_KEY = NAME;
  const $BODY = $('body');
  let Map;
  let currentStyle;

  class MapAPI {
    // Constructor
    constructor(element) {
      this._element = element;
      const $element = $(this._element);
      currentStyle = this.getStyle();

      mapBoxGL.accessToken = 'pk.eyJ1IjoidG9ueS1haXIiLCJhIjoiY2l1OHoxZGp4MDAxZzJ0cHl0Y25jOWFpMCJ9.BC-YvTC2hUKhNbae4iAPCA';

      Map = new mapBoxGL.Map({
        container: $element.find('.mapAPI-map')[0],
        center: [$BODY.data('default-lng'), $BODY.data('default-lat')],
        //hash: true,
        style: currentStyle,
        //localIdeographFontFamily: $BODY.css('font-family'),
        zoom: $element.data('map-zoom'),
        attributionControl: false
        /*transformRequest: (url, resourceType)=> {
          if(resourceType === 'Source' && url.startsWith('http://myHost')) {
            return {
              url: url.replace('http', 'https'),
              headers: { 'my-custom-header': true},
              credentials: 'include'  // Include cookies for cross-origin requests
            }
          }
        }*/
      })
        .addControl(new mapBoxGL.AttributionControl({
          compact: true
        }))
        .addControl(new mapBoxGL.NavigationControl(), 'top-right')
        .addControl(new mapBoxGL.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),'bottom-right')
        .addControl(new mapboxgl.ScaleControl({
          maxWidth: 80,
          unit: 'metric'
        }),'top-left');

      // event.target
      Map.on('load',(e) => {
        console.log('Map is loaded');
        /*Map.addSource('dem', {
          "type": "raster-dem",
          "url": "mapbox://mapbox.terrain-rgb"
        });
        Map.addLayer({
          "id": "hillshading",
          "source": "dem",
          "type": "hillshade"
        });*/
      });

      /*Map.on('render',function(event){
        console.log('map moved');
        console.log(event);
      });

      // event: MapDataEvent
      Map.on('dataloading',() => {
        console.log('Loading map data');
        //console.log(event);
      });

      // event: MapDataEvent
      Map.on('data',(event) => {
        console.log('Map data updated');
        //console.log(event);
      });*/

      // check time every 60 mins and change to night style
      const api = this;
      setInterval(() => {
        const newStyle = api.getStyle();
        if(newStyle !== currentStyle){
          Map.setStyle(api.getStyle());
        }
      },36000);


      $element.addClass(`${NAME}-active`);
    }

    // Public methods
    getMap() {
      return Map;
    }

    getStyle() {
      return 'mapbox://styles/mapbox/streets-v9';
      const hour = new Date().getHours();
      if(hour < 6 || hour > 18) {
        // night
        //return 'mapbox://styles/mapbox/streets-v7';
        return 'mapbox://styles/tony-air/cjeacwih92iu42rpd8tcmuyb2';
      }else{
        // day
        return 'mapbox://styles/mapbox/streets-v9';
      }
    }

    dispose() {
      const $element = $(this._element);

      $element.removeClass(`${NAME}-active`);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    static _jQueryInterface() {
      if (typeof W.localStorage !== 'undefined') {
        return this.each(function () {
          // attach functionality to element
          const $element = $(this);
          let data = $element.data(DATA_KEY);

          if (!data) {
            data = new MapAPI(this);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }
  }

  // jQuery interface
  $.fn[NAME] = MapAPI._jQueryInterface;
  $.fn[NAME].Constructor = MapAPI;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return MapAPI._jQueryInterface;
  };

  // auto-apply
  $(W).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    $('.mapAPI-map-container').jsMapAPI();
  });

  return MapAPI;
})($);

export default MapAPI;
