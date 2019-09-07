'use strict';

import $ from 'jquery';
import Events from '../_events';
import mapBoxGL from 'mapbox-gl';
//import "./mapStorage";

import '../../scss/_components/_ui.map.scss';

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
    constructor(el) {
      this._el = el;
      const $el = $(this._el);
      const config = $el.data();

      const center = [
        (config['lng'] ? config['lng'] : $BODY.data('default-lng')),
        (config['lat'] ? config['lat'] : $BODY.data('default-lat')),
      ];
      const popup = new mapBoxGL.Popup({
        closeOnClick: false,
        className: 'popup',
      });


      currentStyle = this.getStyle();
      mapBoxGL.accessToken = $el.data('key');
      Map = new mapBoxGL.Map({
          'container': $el.find('.mapAPI-map')[0],
          'center': center,
          //hash: true,
          'style': currentStyle,
          'localIdeographFontFamily': $BODY.css('font-family'),
          'zoom': (config['mapZoom'] ? config['mapZoom'] : 10),
          'attributionControl': false,
          'antialias': true,
          /*'pitch': 45,
          'bearing': -17.6*/

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
          compact: true,
        }))
        .addControl(new mapBoxGL.NavigationControl(), 'top-right')
        .addControl(new mapBoxGL.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }), 'bottom-right')
        .addControl(new mapBoxGL.ScaleControl({
          maxWidth: 80,
          unit: 'metric',
        }), 'top-left')
        .addControl(new mapboxgl.FullscreenControl());

      $el.data('Map', Map);
      $el.data('Popup', popup);

      // event.target
      Map.on('load', (e) => {
        // Insert the layer beneath any symbol layer.
        if (config['3d']) {
          const layers = Map.getStyle().layers;
          let labelLayerId;
          for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
            }
          }

          Map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',

              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                "interpolate", ["linear"],
                ["zoom"],
                15, 0,
                15.05, ["get", "height"]
              ],
              'fill-extrusion-base': [
                "interpolate", ["linear"],
                ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
              ],
              'fill-extrusion-opacity': .6
            }
          }, labelLayerId);
        }

        const firstMarker = config['geojson'].features[0].geometry.coordinates;
        //Map.setCenter(firstMarker);
        const bounds = new mapBoxGL.LngLatBounds(firstMarker, firstMarker);

        // add markers to map
        config['geojson'].features.forEach((marker) => {
          const id = marker.id;
          const crds = marker.geometry.coordinates;
          const content = marker.properties.content;

          // create a DOM el for the marker
          const $el = $(`<div id="Marker${ id }" data-id="${ id }" class="marker">${ marker.icon }</div>`);

          $el.on('click', () => {
            popup.setLngLat(crds)
              .setHTML(content)
              .addTo(Map);

            if (config['flyToMarker']) {
              Map.flyTo({
                center: crds,
                zoom: 17,
              });
            }

            $el.trigger(Events.MAPMARKERCLICK);
          });

          // add marker to map
          new mapBoxGL.Marker($el[0])
            .setLngLat(crds)
            .addTo(Map);
          bounds.extend(crds);
        });

        Map.fitBounds(bounds, {
          padding: 30,
        });

        popup.on('close', (e) => {
          if (config['flyToBounds']) {
            Map.fitBounds(bounds, {
              padding: 30,
            });
          }
          $el.trigger(Events.MAPPOPUPCLOSE);
        });

        $el.trigger(Events.MAPLOADED);
        $(W).trigger(Events.MAPLOADED);
        console.log('Map is loaded');
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
        if (newStyle !== currentStyle) {
          Map.setStyle(api.getStyle());
        }
      }, 36000);


      $el.addClass(`${NAME}-active`);
    }

    // Public methods
    getMap() {
      return Map;
    }

    getStyle() {
      const $el = $(this._el);
      return $el.data('map-style');
      return 'mapbox://styles/mapbox/streets-v9';
      const hour = new Date().getHours();
      if (hour < 6 || hour > 18) {
        // night
        //return 'mapbox://styles/mapbox/streets-v7';
        return 'mapbox://styles/tony-air/cjeacwih92iu42rpd8tcmuyb2';
      }
      // day
      return 'mapbox://styles/mapbox/streets-v9';
    }

    dispose() {
      const $el = $(this._el);

      $el.removeClass(`${NAME}-active`);
      $.removeData(this._el, DATA_KEY);
      this._el = null;
    }

    static _jQueryInterface() {
      if (typeof W.localStorage !== 'undefined') {
        return this.each(function() {
          // attach functionality to el
          const $el = $(this);
          let data = $el.data(DATA_KEY);

          if (!data) {
            data = new MapAPI(this);
            $el.data(DATA_KEY, data);
          }
        });
      }
    }
  }

  // jQuery interface
  $.fn[NAME] = MapAPI._jQueryInterface;
  $.fn[NAME].Constructor = MapAPI;
  $.fn[NAME].noConflict = function() {
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
