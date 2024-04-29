!function(){"use strict";var e={6793:function(e){e.exports=function makeYoutubeEmbed(e){if("string"===typeof e){var t=function getId(e){var t=e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);if(t&&11==t[2].length)return t[2]}(e);return t?"//www.youtube.com/embed/"+t:void 0}}}},t={};function __webpack_require__(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,__webpack_require__),o.exports}!function(){var e="ajax-load",t="load-ready";function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _toConsumableArray(e){return function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function _iterableToArray(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function _unsupportedIterableToArray(e,t){if(!e)return;if("string"===typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(e,t)}(e)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,_toPropertyKey(a.key),a)}}function _defineProperty(e,t,n){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=_typeof(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==_typeof(t)?t:t+""}var n=window,a=function(){return function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}((function MetaWindow(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{shown:!1},a=arguments.length>1?arguments[1]:void 0;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,MetaWindow),_defineProperty(this,"state",{content:"",type:["empty"],shown:!1,loading:!1,error:!1,embed:!1,collections:[],current:null,target:null,extraClass:null}),_defineProperty(this,"show",(function(){var t=e;console.log("".concat(t.name,": show")),t.setState({shown:!0}),n.dispatchEvent(new Event("{ui.name}.show"))})),_defineProperty(this,"hide",(function(){var t=e;console.log("".concat(t.name,": hide")),t.setState({shown:!1}),n.dispatchEvent(new Event("{ui.name}.hide"))})),_defineProperty(this,"next",(function(){var t=e,a=t.state.current.getAttribute("data-gallery"),o=t._currIndex();o<t.state.collections[a].length-1?o++:o=0,t.state.collections[a][o].click(),console.log("".concat(t.name,": next")),n.dispatchEvent(new Event("{ui.name}.next"))})),_defineProperty(this,"prev",(function(){var t=e,a=t.state.current.getAttribute("data-gallery"),o=t._currIndex();o>0?o--:o=t.state.collections[a].length-1,t.state.collections[a][o].click(),console.log("".concat(t.name,": prev")),n.dispatchEvent(new Event("{ui.name}.prev"))})),_defineProperty(this,"reset",(function(){e.setState({content:"",type:["empty"],shown:!1,loading:!1,error:!1,embed:!1})})),_defineProperty(this,"load",(function(t){var a=e;a.reset(),a.setState({loading:!0}),a.show(),window.fetch(t,{mode:"no-cors"}).then((function(e){var o=e.headers.get("content-type").toLowerCase();console.log(e),console.log("".concat(a.name,": response content-type: ").concat(o));switch(o){case"image/jpeg":case"image/png":case"image/svg+xml":case"image/bmp":case"image/gif":case"image/tiff":case"image/webp":case"image/jpg":case"image/svg":e.arrayBuffer().then((function(e){a.setContent('<img src="data:'.concat(o,";base64,").concat(a._imageEncode(e),'" />'),"meta-".concat(a.name,"--image"))}));break;case"application/json":case"application/ld+json":case"application/json; charset=utf-8":a.setContent("".concat((!1).Content),["meta-".concat(a.name,"--text"),"meta-".concat(a.name,"--html"),"meta-".concat(a.name,"--json")]);break;case"video/mp4":a.setContent('<video controls autoplay><source src="'.concat(t,'" type="video/mp4">Your browser does not support the video tag.</video>'),["meta-".concat(a.name,"--image"),"meta-".concat(a.name,"--video")]);break;case"text/html":case"application/xhtml+xml":case"text/plain":case"text/html; charset=utf-8":case"application/xhtml+xml; charset=utf-8":case"text/plain; charset=utf-8":e.text().then((function(e){a.setContent(e,["meta-".concat(a.name,"--text"),"meta-".concat(a.name,"--html"),"meta-".concat(a.name,"--pajax")])}));break;default:console.warn("".concat(a.name,": Unknown response content-type!"))}n.dispatchEvent(new Event("{ui.name}.loaded"))})).catch((function(e){console.error(e);var t="";if(e.response)switch(e.response.status){case 404:t="Not Found.";break;case 500:t="Server issue, please try again latter.";break;default:t="Something went wrong."}else e.request?t="No response received":console.warn("Error",e.message);a.setState({error:t}),n.dispatchEvent(new Event("{ui.name}.error"))})).then((function(){a.setState({loading:!1}),setTimeout((function(){a.state.current.classList.remove("loading")}),1e3)}))})),_defineProperty(this,"_currIndex",(function(){var t=e,n=t.state.current,a=n.getAttribute("data-gallery");return t.state.collections[a].indexOf(n)})),_defineProperty(this,"embed",(function(t){var n=e;console.log("".concat(n.name,": embed")),n.reset(),n.setState({embed:t,loading:!1,type:["meta-".concat(n.name,"--embed"),"meta-".concat(n.name,"--video")]}),n.show()})),_defineProperty(this,"setCaption",(function(t){var n=e;console.log("".concat(n.name,": setCaption")),n.state.caption=t})),_defineProperty(this,"addExtraClass",(function(t){var n=e;t&&t.length&&(console.log("".concat(n.name,": addExtraClass(").concat(t,")")),n.state.extraClass=t)})),_defineProperty(this,"getCaption",(function(){return e.state.caption})),_defineProperty(this,"_imageEncode",(function(e){var t="";return[].slice.call(new Uint8Array(e)).forEach((function(e){t+=String.fromCharCode(e)})),window.btoa(t)})),_defineProperty(this,"setContent",(function(t,n){var a=e;console.log("".concat(a.name,": setContent"));var o=n||["meta-".concat(a.name,"--html"),"meta-".concat(a.name,"--text")];Array.isArray(o)||(o=n.split(" ")),a.setState({content:t,type:o})})),_defineProperty(this,"getHtml",(function(){var t=e;if(t.state.embed){var n=__webpack_require__(6793)(t.state.embed);t.state.content='<iframe width="600" height="380" src="'.concat(n,'" frameborder="0"></iframe>')}return t.state.content}));var o=this;switch(o.name=o.constructor.name,console.log("".concat(o.name,": init")),o.setState(t),a){case"show":case"hide":o.hide()}n.dispatchEvent(new Event("{ui.name}.init"))}),[{key:"cleanLinks",value:function cleanLinks(){document.querySelectorAll('[data-toggle="lightbox"]').forEach((function(e){e.classList.remove("loading")}))}},{key:"collectGaleries",value:function collectGaleries(e){var t=this;e&&(t.state.collections[e]=[],document.querySelectorAll('[data-toggle="lightbox"][data-gallery="'.concat(e,'"]')).forEach((function(n){t.state.collections[e].push(n)})))}},{key:"toggle",value:function toggle(e){var t=this;t.cleanLinks();var n=e.getAttribute("href")||e.getAttribute("data-href"),a=e.getAttribute("data-embed");e.classList.add("loading"),t.state.current=e;var o=e.getAttribute("data-title");o?t.setCaption(o):t.setCaption(""),a?t.embed(n):t.load(n),t.addExtraClass(e.getAttribute("data-lightbox-class"))}},{key:"init",value:function init(){var e=this;console.log("MetaWindow: [links] init"),document.querySelectorAll('[data-toggle="lightbox"],[data-gallery]').forEach((function(t){var n=t.getAttribute("data-gallery");e.collectGaleries(n),t.addEventListener("click",(function(t){t.preventDefault(),console.log("MetaWindow: [link] click");var n=t.currentTarget;e.toggle(n)}))}))}},{key:"setState",value:function setState(e){var t=this;t.state=Object.assign({},t.state,e),t.render()}},{key:"render",value:function render(){var e,t=this,n=t.name,a=t.state.current;t.state.target.innerHTML="";var o=document.createElement("div");o.classList.add("meta-".concat(n)),(e=o.classList).add.apply(e,_toConsumableArray(t.state.type)),t.state.target.append(o);var r=document.createElement("div");r.classList.add("meta-".concat(n,"-overlay")),t.state.shown&&r.classList.add("meta-".concat(n,"-overlay--open")),t.state.loading&&r.classList.add("meta-".concat(n,"-overlay--loading")),t.state.error&&r.classList.add("meta-".concat(n,"-overlay--error")),o.append(r);var i=document.createElement("div");i.classList.add("meta-content"),r.append(i);var c=document.createElement("button");if(c.classList.add("meta-nav","meta-close","a"),c.innerHTML='<i class="icon fa fas fa-times"></i> <span class="visually-hidden">Close</span>',c.addEventListener("click",(function(e){e.preventDefault(),t.hide()})),i.append(c),a){var s=a.getAttribute("data-gallery");if(s&&t.state.collections[s].length>1){var l=document.createElement("nav");l.classList.add("meta-navs");var d=document.createElement("button");d.classList.add("meta-nav","meta-nav-arrow","meta-nav-arrow__prev","a"),d.innerHTML='<i class="icon fa fas fa-chevron-left"></i> <span class="visually-hidden">Previous</span>',d.addEventListener("click",(function(e){e.preventDefault(),t.prev()})),l.append(d);var u=document.createElement("button");u.classList.add("meta-nav","meta-nav-arrow","meta-nav-arrow__next","a"),u.innerHTML='<i class="icon fa fas fa-chevron-right"></i> <span class="visually-hidden">Next</span>',u.addEventListener("click",(function(e){e.preventDefault(),t.next()})),l.append(u),i.append(l)}}var m=document.createElement("section");if(m.classList.add("meta-wrap","typography"),t.state.extraClass&&m.classList.add(t.state.extraClass),m.innerHTML=t.getHtml(),i.append(m),t.state.error){var p=document.createElement("div");p.classList.add("meta-error"),p.innerHTML=t.state.error,i.append(p)}else if(t.state.caption){var f=document.createElement("div");f.classList.add("meta-caption"),f.innerHTML=t.getCaption(),i.append(f)}return"undefined"!==typeof window.FontAwesome&&window.FontAwesome.dom.i2svg(),t}}])}(),o=a,r=document.getElementById("MetaLightboxApp");r||(console.warn("MetaWindow: missing container #MetaLightboxApp - create new one"),(r=document.createElement("div")).setAttribute("id","MetaLightboxApp"),document.querySelector("body").append(r));var i=function init(){var e=window.MetaWindow;"undefined"===typeof e&&(e=new o({target:r}),window.MetaWindow=e),e.init()};window.addEventListener("".concat(t),i),window.addEventListener("".concat(e),i),window.addEventListener("MetaWindow.initLinks",i);jQuery.entwine("ss",(function($){$('[data-toggle="lightbox"]').entwine({onmatch:function onmatch(){console.log("Init lightbox links at CMS"),window.dispatchEvent(new Event("MetaWindow.initLinks"))}})}))}()}();