!function(){var t={4409:function(t){function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function DBSCAN(t,r,o,i){this.dataset=[],this.epsilon=1,this.minPts=2,this.distance=this._euclideanDistance,this.clusters=[],this.noise=[],this._visited=[],this._assigned=[],this._datasetLength=0,this._init(t,r,o,i)}DBSCAN.prototype.run=function(t,r,o,i){this._init(t,r,o,i);for(var a=0;a<this._datasetLength;a++)if(1!==this._visited[a]){this._visited[a]=1;var u=this._regionQuery(a);if(u.length<this.minPts)this.noise.push(a);else{var l=this.clusters.length;this.clusters.push([]),this._addToCluster(a,l),this._expandCluster(l,u)}}return this.clusters},DBSCAN.prototype._init=function(t,r,o,i){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+_typeof(t)+" given");this.dataset=t,this.clusters=[],this.noise=[],this._datasetLength=t.length,this._visited=new Array(this._datasetLength),this._assigned=new Array(this._datasetLength)}r&&(this.epsilon=r),o&&(this.minPts=o),i&&(this.distance=i)},DBSCAN.prototype._expandCluster=function(t,r){for(var o=0;o<r.length;o++){var i=r[o];if(1!==this._visited[i]){this._visited[i]=1;var a=this._regionQuery(i);a.length>=this.minPts&&(r=this._mergeArrays(r,a))}1!==this._assigned[i]&&this._addToCluster(i,t)}},DBSCAN.prototype._addToCluster=function(t,r){this.clusters[r].push(t),this._assigned[t]=1},DBSCAN.prototype._regionQuery=function(t){for(var r=[],o=0;o<this._datasetLength;o++){this.distance(this.dataset[t],this.dataset[o])<this.epsilon&&r.push(o)}return r},DBSCAN.prototype._mergeArrays=function(t,r){for(var o=r.length,i=0;i<o;i++){var a=r[i];t.indexOf(a)<0&&t.push(a)}return t},DBSCAN.prototype._euclideanDistance=function(t,r){for(var o=0,i=Math.min(t.length,r.length);i--;)o+=(t[i]-r[i])*(t[i]-r[i]);return Math.sqrt(o)},t.exports&&(t.exports=DBSCAN)},7543:function(t){function KMEANS(t,r,o){this.k=3,this.dataset=[],this.assignments=[],this.centroids=[],this.init(t,r,o)}KMEANS.prototype.init=function(t,r,o){this.assignments=[],this.centroids=[],"undefined"!==typeof t&&(this.dataset=t),"undefined"!==typeof r&&(this.k=r),"undefined"!==typeof o&&(this.distance=o)},KMEANS.prototype.run=function(t,r){this.init(t,r);for(var o=this.dataset.length,i=0;i<this.k;i++)this.centroids[i]=this.randomCentroid();for(var a=!0;a;){a=this.assign();for(var u=0;u<this.k;u++){for(var l=new Array(h),c=0,p=0;p<h;p++)l[p]=0;for(var d=0;d<o;d++){var h=this.dataset[d].length;if(u===this.assignments[d]){for(p=0;p<h;p++)l[p]+=this.dataset[d][p];c++}}if(c>0){for(p=0;p<h;p++)l[p]/=c;this.centroids[u]=l}else this.centroids[u]=this.randomCentroid(),a=!0}}return this.getClusters()},KMEANS.prototype.randomCentroid=function(){var t,r,o=this.dataset.length-1;do{r=Math.round(Math.random()*o),t=this.dataset[r]}while(this.centroids.indexOf(t)>=0);return t},KMEANS.prototype.assign=function(){for(var t,r=!1,o=this.dataset.length,i=0;i<o;i++)(t=this.argmin(this.dataset[i],this.centroids,this.distance))!=this.assignments[i]&&(this.assignments[i]=t,r=!0);return r},KMEANS.prototype.getClusters=function(){for(var t,r=new Array(this.k),o=0;o<this.assignments.length;o++)"undefined"===typeof r[t=this.assignments[o]]&&(r[t]=[]),r[t].push(o);return r},KMEANS.prototype.argmin=function(t,r,o){for(var i,a=Number.MAX_VALUE,u=0,l=r.length,c=0;c<l;c++)(i=o(t,r[c]))<a&&(a=i,u=c);return u},KMEANS.prototype.distance=function(t,r){for(var o=0,i=Math.min(t.length,r.length);i--;){var a=t[i]-r[i];o+=a*a}return Math.sqrt(o)},t.exports&&(t.exports=KMEANS)},4930:function(t,r,o){function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}if(t.exports)var i=o(672);function OPTICS(t,r,o,i){this.epsilon=1,this.minPts=1,this.distance=this._euclideanDistance,this._reachability=[],this._processed=[],this._coreDistance=0,this._orderedList=[],this._init(t,r,o,i)}OPTICS.prototype.run=function(t,r,o,a){this._init(t,r,o,a);for(var u=0,l=this.dataset.length;u<l;u++)if(1!==this._processed[u]){this._processed[u]=1,this.clusters.push([u]);var c=this.clusters.length-1;this._orderedList.push(u);var p=new i(null,null,"asc"),d=this._regionQuery(u);void 0!==this._distanceToCore(u)&&(this._updateQueue(u,d,p),this._expandCluster(c,p))}return this.clusters},OPTICS.prototype.getReachabilityPlot=function(){for(var t=[],r=0,o=this._orderedList.length;r<o;r++){var i=this._orderedList[r],a=this._reachability[i];t.push([i,a])}return t},OPTICS.prototype._init=function(t,r,o,i){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+_typeof(t)+" given");this.dataset=t,this.clusters=[],this._reachability=new Array(this.dataset.length),this._processed=new Array(this.dataset.length),this._coreDistance=0,this._orderedList=[]}r&&(this.epsilon=r),o&&(this.minPts=o),i&&(this.distance=i)},OPTICS.prototype._updateQueue=function(t,r,o){var i=this;this._coreDistance=this._distanceToCore(t),r.forEach((function(r){if(void 0===i._processed[r]){var a=i.distance(i.dataset[t],i.dataset[r]),u=Math.max(i._coreDistance,a);void 0===i._reachability[r]?(i._reachability[r]=u,o.insert(r,u)):u<i._reachability[r]&&(i._reachability[r]=u,o.remove(r),o.insert(r,u))}}))},OPTICS.prototype._expandCluster=function(t,r){for(var o=r.getElements(),i=0,a=o.length;i<a;i++){var u=o[i];if(void 0===this._processed[u]){var l=this._regionQuery(u);this._processed[u]=1,this.clusters[t].push(u),this._orderedList.push(u),void 0!==this._distanceToCore(u)&&(this._updateQueue(u,l,r),this._expandCluster(t,r))}}},OPTICS.prototype._distanceToCore=function(t){for(var r=this.epsilon,o=0;o<r;o++){if(this._regionQuery(t,o).length>=this.minPts)return o}},OPTICS.prototype._regionQuery=function(t,r){r=r||this.epsilon;for(var o=[],i=0,a=this.dataset.length;i<a;i++)this.distance(this.dataset[t],this.dataset[i])<r&&o.push(i);return o},OPTICS.prototype._euclideanDistance=function(t,r){for(var o=0,i=Math.min(t.length,r.length);i--;)o+=(t[i]-r[i])*(t[i]-r[i]);return Math.sqrt(o)},t.exports&&(t.exports=OPTICS)},672:function(t){function PriorityQueue(t,r,o){this._queue=[],this._priorities=[],this._sorting="desc",this._init(t,r,o)}PriorityQueue.prototype.insert=function(t,r){for(var o=this._queue.length,i=o;i--;){var a=this._priorities[i];"desc"===this._sorting?r>a&&(o=i):r<a&&(o=i)}this._insertAt(t,r,o)},PriorityQueue.prototype.remove=function(t){for(var r=this._queue.length;r--;){if(t===this._queue[r]){this._queue.splice(r,1),this._priorities.splice(r,1);break}}},PriorityQueue.prototype.forEach=function(t){this._queue.forEach(t)},PriorityQueue.prototype.getElements=function(){return this._queue},PriorityQueue.prototype.getElementPriority=function(t){return this._priorities[t]},PriorityQueue.prototype.getPriorities=function(){return this._priorities},PriorityQueue.prototype.getElementsWithPriorities=function(){for(var t=[],r=0,o=this._queue.length;r<o;r++)t.push([this._queue[r],this._priorities[r]]);return t},PriorityQueue.prototype._init=function(t,r,o){if(t&&r){if(this._queue=[],this._priorities=[],t.length!==r.length)throw new Error("Arrays must have the same length");for(var i=0;i<t.length;i++)this.insert(t[i],r[i])}o&&(this._sorting=o)},PriorityQueue.prototype._insertAt=function(t,r,o){this._queue.length===o?(this._queue.push(t),this._priorities.push(r)):(this._queue.splice(o,0,t),this._priorities.splice(o,0,r))},t.exports&&(t.exports=PriorityQueue)},3960:function(t,r,o){t.exports&&(t.exports={DBSCAN:o(4409),KMEANS:o(7543),OPTICS:o(4930),PriorityQueue:o(672)})},6412:function(t){"use strict";function _createForOfIteratorHelper(t,r){var o="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=function _unsupportedIterableToArray(t,r){if(!t)return;if("string"===typeof t)return _arrayLikeToArray(t,r);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return _arrayLikeToArray(t,r)}(t))||r&&t&&"number"===typeof t.length){o&&(t=o);var i=0,a=function F(){};return{s:a,n:function n(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function e(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,l=!0,c=!1;return{s:function s(){o=o.call(t)},n:function n(){var t=o.next();return l=t.done,t},e:function e(t){c=!0,u=t},f:function f(){try{l||null==o.return||o.return()}finally{if(c)throw u}}}}function _arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var o=0,i=new Array(r);o<r;o++)i[o]=t[o];return i}function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}t.exports=function equal(t,r){if(t===r)return!0;if(t&&r&&"object"==_typeof(t)&&"object"==_typeof(r)){if(t.constructor!==r.constructor)return!1;var o,i,a;if(Array.isArray(t)){if((o=t.length)!=r.length)return!1;for(i=o;0!==i--;)if(!equal(t[i],r[i]))return!1;return!0}if(t instanceof Map&&r instanceof Map){if(t.size!==r.size)return!1;var u,l=_createForOfIteratorHelper(t.entries());try{for(l.s();!(u=l.n()).done;)if(i=u.value,!r.has(i[0]))return!1}catch(y){l.e(y)}finally{l.f()}var c,p=_createForOfIteratorHelper(t.entries());try{for(p.s();!(c=p.n()).done;)if(!equal((i=c.value)[1],r.get(i[0])))return!1}catch(y){p.e(y)}finally{p.f()}return!0}if(t instanceof Set&&r instanceof Set){if(t.size!==r.size)return!1;var d,h=_createForOfIteratorHelper(t.entries());try{for(h.s();!(d=h.n()).done;)if(i=d.value,!r.has(i[0]))return!1}catch(y){h.e(y)}finally{h.f()}return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(r)){if((o=t.length)!=r.length)return!1;for(i=o;0!==i--;)if(t[i]!==r[i])return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if((o=(a=Object.keys(t)).length)!==Object.keys(r).length)return!1;for(i=o;0!==i--;)if(!Object.prototype.hasOwnProperty.call(r,a[i]))return!1;for(i=o;0!==i--;){var g=a[i];if(!equal(t[g],r[g]))return!1}return!0}return t!==t&&r!==r}},78:function(t){"use strict";t.exports={eudist:function eudist(t,r){for(var o=t.length,i=0,a=0;a<o;a++){var u=(t[a]||0)-(r[a]||0);i+=u*u}return i},mandist:function mandist(t,r){for(var o=t.length,i=0,a=0,u=0;u<o;u++)i+=(a=(t[u]||0)-(r[u]||0))>=0?a:-a;return i},dist:function dist(t,r,o){var i=Math.abs(t-r);return o?i:i*i}}},9894:function(t,r,o){"use strict";var i=o(78),a=i.eudist,u=i.dist;t.exports={kmrand:function kmrand(t,r){for(var o={},i=[],a=r<<2,u=t.length,l=t[0].length>0;i.length<r&&a-- >0;){var c=t[Math.floor(Math.random()*u)],p=l?c.join("_"):"".concat(c);o[p]||(o[p]=!0,i.push(c))}if(i.length<r)throw new Error("Error initializating clusters");return i},kmpp:function kmpp(t,r,o){var i=o||(t[0].length?a:u),l=[],c=t.length,p=t[0].length>0,d=t[Math.floor(Math.random()*c)];p?d.join("_"):"".concat(d);for(l.push(d);l.length<r;){for(var h=[],g=l.length,y=0,m=[],v=0;v<c;v++){for(var _=1/0,b=0;b<g;b++){var k=i(t[v],l[b]);k<=_&&(_=k)}h[v]=_}for(var P=0;P<c;P++)y+=h[P];for(var M=0;M<c;M++)m[M]={i:M,v:t[M],pr:h[M]/y,cs:0};m.sort((function(t,r){return t.pr-r.pr})),m[0].cs=m[0].pr;for(var w=1;w<c;w++)m[w].cs=m[w-1].cs+m[w].pr;for(var S=Math.random(),C=0;C<c-1&&m[C++].cs<S;);l.push(m[C-1].v)}return l}}},2085:function(t,r,o){"use strict";var i=o(78),a=o(9894),u=i.eudist,l=(i.mandist,i.dist,a.kmrand),c=a.kmpp;function init(t,r,o){o=o||[];for(var i=0;i<t;i++)o[i]=r;return o}function test(t,r){for(var o=Array.isArray(t),i=this.centroids,a=i.length,l=1/0,c=0,p=0;p<a;p++){var d=r?r(t,i[p]):o?u(t,i[p]):Math.abs(t-i[p]);d<=l&&(l=d,c=p)}return{idx:c,centroid:i[c]}}t.exports=function skmeans(t,r,o,i,a){var p=[],d=[],h=[],g=[],y=!1,m=i||1e4,v=t.length,_=t[0].length,b=_>0,k=[];if(o)p="kmrand"==o?l(t,r):"kmpp"==o?c(t,r,a):o;else for(var P={},M=0;p.length<r;){var w=Math.floor(Math.random()*v);P[w]||(P[w]=!0,p[M++]=t[w])}do{init(r,0,k);for(var S=0;S<v;S++){for(var C=1/0,x=0,O=0;O<r;O++){(g=a?a(t[S],p[O]):b?u(t[S],p[O]):Math.abs(t[S]-p[O]))<=C&&(C=g,x=O)}h[S]=x,k[x]++}var A=[];d=[];if(b)for(var E=0;E<r;E++)A[E]=init(_,0,A[E]),d[E]=p[E];else for(var T=0;T<r;T++)A[T]=0,d[T]=p[T];if(b){for(var D=0;D<r;D++)p[D]=[];for(var L=0;L<v;L++)for(var N=A[h[L]],I=t[L],j=0;j<_;j++)N[j]+=I[j];y=!0;for(var q=0;q<r;q++){for(var B=p[q],G=A[q],Q=d[q],R=k[q],H=0;H<_;H++)B[H]=G[H]/R||0;if(y)for(var z=0;z<_;z++)if(Q[z]!=B[z]){y=!1;break}}}else{for(var K=0;K<v;K++){A[h[K]]+=t[K]}for(var U=0;U<r;U++)p[U]=A[U]/k[U]||0;y=!0;for(var Z=0;Z<r;Z++)if(d[Z]!=p[Z]){y=!1;break}}y=y||--m<=0}while(!y);return{it:(i||1e4)-m,k:r,idxs:h,centroids:p,test:test}}}},r={};function __webpack_require__(o){var i=r[o];if(void 0!==i)return i.exports;var a=r[o]={exports:{}};return t[o](a,a.exports,__webpack_require__),a.exports}__webpack_require__.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},function(){"use strict";var t={};__webpack_require__.r(t);var r="ajax-load",o="load-ready",i="map-loaded",a="map-api-loaded",u="map-marker-click",l="map-popup-close";__webpack_require__(2085);__webpack_require__(3960);var c;Math.fround||(c=new Float32Array(1));__webpack_require__(6412);var p;!function(t){t.CLUSTERING_BEGIN="clusteringbegin",t.CLUSTERING_END="clusteringend",t.CLUSTER_CLICK="click"}(p||(p={}));function map_google_marker_typeof(t){return map_google_marker_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},map_google_marker_typeof(t)}function map_google_marker_defineProperties(t,r){for(var o=0;o<r.length;o++){var i=r[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function map_google_marker_setPrototypeOf(t,r){return map_google_marker_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(t,r){return t.__proto__=r,t},map_google_marker_setPrototypeOf(t,r)}function map_google_marker_createSuper(t){var r=function map_google_marker_isNativeReflectConstruct(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function _createSuperInternal(){var o,i=map_google_marker_getPrototypeOf(t);if(r){var a=map_google_marker_getPrototypeOf(this).constructor;o=Reflect.construct(i,arguments,a)}else o=i.apply(this,arguments);return map_google_marker_possibleConstructorReturn(this,o)}}function map_google_marker_possibleConstructorReturn(t,r){if(r&&("object"===map_google_marker_typeof(r)||"function"===typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return map_google_marker_assertThisInitialized(t)}function map_google_marker_assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function map_google_marker_getPrototypeOf(t){return map_google_marker_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(t){return t.__proto__||Object.getPrototypeOf(t)},map_google_marker_getPrototypeOf(t)}var d={init:function init(){return function(t){!function map_google_marker_inherits(t,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(t,"prototype",{value:Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),writable:!1}),r&&map_google_marker_setPrototypeOf(t,r)}(GoogleMapsHtmlOverlay,google.maps.OverlayView);var r=map_google_marker_createSuper(GoogleMapsHtmlOverlay);function GoogleMapsHtmlOverlay(t){var o;!function map_google_marker_classCallCheck(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,GoogleMapsHtmlOverlay);var i=map_google_marker_assertThisInitialized(o=r.call(this));return i.ownerMap=t.map,i.position=t.position,i.html=t.html?t.html:'<div class="mapboxgl-marker"><i class="marker-icon fas fa-map-marker-alt"></i></div>',i.divClass=t.divClass,i.align=t.align,i.isDebugMode=t.debug,i.onClick=t.onClick,i.onMouseOver=t.onMouseOver,i.isBoolean=function(t){return"boolean"===typeof t},i.isNotUndefined=function(t){return"undefined"!==typeof t},i.hasContent=function(t){return t.length>0},i.isString=function(t){return"string"===typeof t},i.isFunction=function(t){return"function"===typeof t},o}return function map_google_marker_createClass(t,r,o){return r&&map_google_marker_defineProperties(t.prototype,r),o&&map_google_marker_defineProperties(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}(GoogleMapsHtmlOverlay,[{key:"onAdd",value:function onAdd(){var t=this;t.div=document.createElement("div"),t.div.style.position="absolute",t.isNotUndefined(t.divClass)&&t.hasContent(t.divClass)&&(t.div.className=t.divClass),t.isNotUndefined(t.html)&&t.hasContent(t.html)&&t.isString(t.html)&&(t.div.innerHTML=t.html),t.isBoolean(t.isDebugMode)&&t.isDebugMode&&(t.div.className="debug-mode",t.div.innerHTML='<div style="height: 10px; width: 10px; background: red; border-radius: 100%;"></div><div style="position: absolute; top: 5px; padding: 5px; width: 130px; text-align: center; font-size: 18px; text-transform: uppercase; font-weight: bolder; background: red; color: white; font-family: Arial;">Debug mode</div>',t.div.setAttribute("style","position: absolute;border: 5px dashed red;height: 150px;width: 150px;display: flex;justify-content: center;align-items: center;")),t.getPanes().overlayMouseTarget.appendChild(t.div),google.maps.event.addDomListener(t.div,"click",(function(r){google.maps.event.trigger(t,"click"),t.isFunction(t.onClick)&&t.onClick(),r.stopPropagation()})),google.maps.event.addDomListener(t.div,"mouseover",(function(r){google.maps.event.trigger(t,"mouseover"),t.isFunction(t.onMouseOver)&&t.onMouseOver(),r.stopPropagation()}))}},{key:"draw",value:function draw(){var t=this,r=document.querySelector(".popup");r.length||(r=t.div);var o=t.getProjection();if(!o)return console.log("GoogleMapsHtmlOverlay: current map is missing"),null;var i=o.fromLatLngToDivPixel(t.getPosition()),a={y:void 0,x:void 0},u=r.offsetWidth,l=r.offsetHeight;switch(Array.isArray(t.align)?t.align.join(" "):""){case"left top":a.y=l,a.x=u;break;case"left center":a.y=l/2,a.x=u;break;case"left bottom":a.y=0,a.x=u;break;case"center top":a.y=l,a.x=u/2;break;case"center center":default:a.y=l/2,a.x=u/2;break;case"center bottom":a.y=0,a.x=u/2;break;case"right top":a.y=l,a.x=0;break;case"right center":a.y=l/2,a.x=0;break;case"right bottom":a.y=0,a.x=0}t.div.style.top="".concat(i.y-a.y,"px"),t.div.style.left="".concat(i.x-a.x,"px")}},{key:"getPosition",value:function getPosition(){return new google.maps.LatLng(this.position)}},{key:"getDiv",value:function getDiv(){return this.div}},{key:"setPosition",value:function setPosition(t,r){var o=this;o.position=t,o.align=r,o.draw()}},{key:"remove",value:function remove(){this.setMap(null),this.div.remove()}},{key:"getDraggable",value:function getDraggable(){return!1}}]),GoogleMapsHtmlOverlay}()}};function map_google_defineProperties(t,r){for(var o=0;o<r.length;o++){var i=r[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var h=function(r){var o=function(){function GoogleMapsDriver(){!function map_google_classCallCheck(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,GoogleMapsDriver)}return function map_google_createClass(t,r,o){return r&&map_google_defineProperties(t.prototype,r),o&&map_google_defineProperties(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}(GoogleMapsDriver,[{key:"getName",value:function getName(){return"GoogleMapsDriver"}},{key:"init",value:function init(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this;i.el=t,i.config=o,i.markers=[],r["init".concat(i.getName())]=function(){i.googleApiLoaded()};var a=document.createElement("script");a.src="https://maps.googleapis.com/maps/api/js?key=".concat(o.key,"&callback=init").concat(i.getName()),a.async=!0,a.defer=!0,document.head.appendChild(a)}},{key:"googleApiLoaded",value:function googleApiLoaded(){var r=this,o=r.el,i=r.config,u=o.querySelector(".mapAPI-map"),l=i.mapZoom&&"0"!==i.mapZoom?parseInt(i.mapZoom):10,c=i.center&&","!==i.center?{lat:i.center[1],lng:i.center[0]}:{lat:0,lng:0},p=i.style?i.style:null;console.log("".concat(r.getName(),": API is loaded")),r.MarkerUI=d.init(),r.map=new google.maps.Map(u,{zoom:l,center:c,fullscreenControl:!0,styles:p}),r.default_zoom=l,u.classList.add("mapboxgl-map"),r.popup=new r.MarkerUI({map:r.map,align:["center","top"],divClass:"mapboxgl-popup popup mapboxgl-popup-anchor-bottom d-none",html:'<div class="mapboxgl-popup-tip"></div><div class="mapboxgl-popup-content"><div class="mapboxgl-popup-close-button" type="button" aria-label="Close popup">\xd7</div><div class="html"></div></div>'}),r.popup.setMap(r.map),r.geocoder=new google.maps.Geocoder,r.cluster=new t.default(r.map,null,{styles:[{width:30,height:30,className:"mapboxgl-cluster"}]}),o.dispatchEvent(new Event(a))}},{key:"addMarker",value:function addMarker(t,r){var o=this,i={lat:t[1],lng:t[0]},a=new o.MarkerUI({position:i,map:o.map,align:["center","top"],html:'<div class="mapboxgl-marker"><div id="Marker'.concat(r.id,'" data-id="').concat(r.id,'" class="marker">').concat(r.icon,"</div></div>"),onClick:function onClick(){var t=document.querySelector("#Marker".concat(r.id));o.showPopup(i,r.content),t.dispatchEvent(new Event(u))}});return o.markers.push(a),o.cluster.addMarker(a),a}},{key:"showPopup",value:function showPopup(t,r){var o=this,i=o.popup.getDiv();o.config.flyToMarker&&(o.map.setCenter(t),o.config.noZoom||o.map.setZoom(18)),i.style.opacity="0",i.classList.remove("d-none"),i.querySelector(".mapboxgl-popup-content .html").innerHTML=r,i.querySelector(".mapboxgl-popup-close-button").addEventListener("click",(function(t){t.preventDefault(),o.hidePopup()})),o.popup.setPosition(t,["center","top"]),i.style.opacity="1",i.style["margin-top"]="-1rem"}},{key:"hidePopup",value:function hidePopup(){var t=this;t.popup.getDiv().classList.add("d-none"),t.config.noRestoreBounds&&!t.config.flyToBounds||t.restoreBounds(),t.el.dispatchEvent(new Event(l))}},{key:"geocode",value:function geocode(t,r){var o=this;o.geocoder.geocode({address:t},(function(t,i){if("OK"===i)return"function"===typeof r&&r(t),t;console.error("".concat(o.getName(),": Geocode was not successful for the following reason: ").concat(i))}))}},{key:"reverseGeocode",value:function reverseGeocode(t,r){var o=this;o.geocoder.geocode({location:latlng},(function(t,i){if("OK"===i)return"function"===typeof r&&r(t),t;console.error("".concat(o.getName(),": Reverse Geocoding was not successful for the following reason: ").concat(i))}))}},{key:"addGeoJson",value:function addGeoJson(t){var r=this,o=JSON.parse(t.geojson),i=(o.features[0].geometry.coordinates,new google.maps.LatLngBounds);o.features.forEach((function(o){var a=o.id,u=o.geometry.coordinates,l=o.properties.content;r.addMarker(u,{id:a,content:l,icon:o.icon,flyToMarker:t.flyToMarker}),i.extend({lat:u[1],lng:u[0]})})),r.markers.length>1?r.map.fitBounds(i,{padding:30}):r.markers[0]&&r.map.setCenter(r.markers[0].getPosition()),r.default_bounds=i,r.default_zoom=r.map.getZoom()}},{key:"getMap",value:function getMap(){return this.map}},{key:"getPopup",value:function getPopup(){return this.popup}},{key:"restoreBounds",value:function restoreBounds(){var t=this;t.default_bounds&&t.markers.length>1?t.map.fitBounds(t.default_bounds,{padding:30}):(t.markers[0]&&t.map.setCenter(t.markers[0].getPosition()),t.restoreZoom())}},{key:"restoreZoom",value:function restoreZoom(){this.map.setZoom(this.default_zoom)}}]),GoogleMapsDriver}();return o}(window),g={ENVS:["xs","sm","md","lg","xl","xxl","xxxl"],MAP_DRIVER:h};function map_api_defineProperties(t,r){for(var o=0;o<r.length;o++){var i=r[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}!function(t){var u="js-mapapi",l=g.MAP_DRIVER,c=function(){function MapAPI(t){!function map_api_classCallCheck(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,MapAPI);var r=this,o=new l,i=document.querySelector("body"),c=t.dataset;c.center=[c.lng?c.lng:i.dataset["default-lng"],c.lat?c.lat:i.dataset["default-lat"]],c.icon||(c.icon='<i class="fas fa-map-marker-alt"></i>'),console.log("".concat(u,": init ").concat(o.getName(),"...")),r.drv=o,r.el=t,r.config=c,o.init(t,c),t.addEventListener(a,(function(){r.addMarkers()}))}return function map_api_createClass(t,r,o){return r&&map_api_defineProperties(t.prototype,r),o&&map_api_defineProperties(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}(MapAPI,[{key:"getMap",value:function getMap(){return ui.map}},{key:"dispose",value:function dispose(){this.el=null,this.el.classList.remove("".concat(u,"-active"))}},{key:"addMarkers",value:function addMarkers(){console.log("".concat(u,": addMarkers"));var t=this,r=t.el,o=t.drv,a=t.config;if(t.map=o.getMap(),a.geojson)console.log("".concat(u,": setting up geocode data")),o.addGeoJson(a);else if(a.address)console.log(a.address),console.log("".concat(u,": setting up address marker")),o.geocode(a.address,(function(r){console.log(r);var i=r[0].geometry.location.lat(),l=r[0].geometry.location.lng();console.log("".concat(u,": setting up single lat/lng marker lat: ").concat(i," lng: ").concat(l)),o.addMarker([l,i],a),t.map.setCenter({lat:i,lng:l})}));else if(a.lat&&a.lng){var l=a.lat,c=a.lng;console.log("".concat(u,": setting up single lat/lng marker lat: ").concat(l," lng: ").concat(c)),o.addMarker([c,l],a)}r.classList.add("".concat(u,"-active")),r.dispatchEvent(new Event(i)),console.log("".concat(u,": Map is loaded"))}}]),MapAPI}(),p=function init(){console.log("".concat(u,": init")),document.querySelectorAll(".".concat(u)).forEach((function(t,r){new c(t)}))};t.addEventListener("".concat(o),p),t.addEventListener("".concat(r),p)}(window)}()}();