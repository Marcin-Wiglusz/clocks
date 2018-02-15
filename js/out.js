/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
  function Clock(deg, city) {
    var _this = this;

    _classCallCheck(this, Clock);

    this.deg = deg;
    this.city = city;

    setInterval(function () {
      return _this.setDate();
    }, 1000);
  }

  _createClass(Clock, [{
    key: 'createClock',
    value: function createClock() {

      var root = document.getElementById('root');

      var city = document.createElement('div');
      root.appendChild(city).className = 'clock-container';

      var clock = document.createElement('div');
      city.appendChild(clock).className = 'clock';

      var clockFace = document.createElement('div');
      clock.appendChild(clockFace).className = 'clock-face';
      clockFace.id = this.city;

      var markerCover = document.createElement('div');
      clockFace.appendChild(markerCover).className = 'face-cover';

      var handPin = document.createElement('div');
      clockFace.appendChild(handPin).className = 'pin';

      var handClass = ['hand hour-hand', 'hand min-hand', 'hand second-hand'];
      handClass.forEach(function (el) {
        var hands = document.createElement('div');
        hands.className = el;
        clockFace.appendChild(hands);
      });

      var sum = 0;
      for (var i = 0; i < 6; i++) {
        var markers = document.createElement('div');
        var clone = markers.cloneNode();
        clockFace.appendChild(clone).className = 'marker';
        var deg = 30;
        clone.style.transform = 'rotate(' + sum + 'deg)';
        sum += deg;
      }

      var cityName = document.createElement('div');
      clock.appendChild(cityName).innerText = this.city.replace(/-/g, ' ').toUpperCase();
      cityName.className = 'city-name';
    }
  }, {
    key: 'setDate',
    value: function setDate() {
      var cityID = this.city;
      // for each individual clock
      var hourHand = document.getElementById('' + cityID).firstChild.nextSibling.nextSibling;
      var minHand = hourHand.nextSibling;
      var secHand = minHand.nextSibling;

      var now = new Date();

      var seconds = now.getSeconds();
      var secDeg = seconds / 60 * 360 + 90; // 90 - positioning hands on Y axis (start) + secDeg each second
      secHand.style.transform = 'rotate(' + secDeg + 'deg)';
      // 1s, 1min = 6deg

      var mins = now.getMinutes();
      // add below ((seconds / 60) * 6) and minDeg will additionally increase 0.1 each second giving smooth move of minHand between minutes over 60s
      var minDeg = mins / 60 * 360 + 90;
      minHand.style.transform = 'rotate(' + minDeg + 'deg)';

      // 1h = 30deg

      var hrs = now.getHours();
      var hrsDeg = hrs / 12 * 360 + mins / 60 * 30 + 90 + this.deg; // + 0.5 each minute
      hourHand.style.transform = 'rotate(' + hrsDeg + 'deg)';

      // avoiding hands from rotating back to starting position when 90deg is reached
      secDeg === 90 ? secHand.style.transition = '0s' : secHand.style.transition = '0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
      minDeg === 90 ? minHand.style.transition = '0s' : minHand.style.transition = '0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';

      // need to make one loop for all hands and put bellow to seperate function
      // doesn't work properly at the moment - hour hand glitches

      // const secShadow = document.querySelectorAll('.second-hand');
      // const minShadow = document.querySelectorAll('.min-hand');
      // const hrsShadow = document.querySelectorAll('.hour-hand');
      //
      //
      //
      // for (var i = 0; i < secShadow.length; i++) {
      //   // console.log(secShadow);
      //
      //   if (secDeg >= 300 && secDeg <= 450 || secDeg >= 0 && secDeg < 120) {
      //     secShadow[i].classList.add('bottom-shadow');
      //     secShadow[i].classList.remove('upper-shadow');
      //   }
      //   else {
      //     secShadow[i].classList.add('upper-shadow');
      //     secShadow[i].classList.remove('bottom-shadow');
      //   }
      // }
      //
      // for (var i = 0; i < minShadow.length; i++) {
      //   // console.log(minShadow);
      //
      //   if (minDeg >= 300 && minDeg <= 450 || minDeg >= 0 && minDeg < 120) {
      //     minShadow[i].classList.add('bottom-shadow');
      //     minShadow[i].classList.remove('upper-shadow');
      //   }
      //   else {
      //     minShadow[i].classList.add('upper-shadow');
      //     minShadow[i].classList.remove('bottom-shadow');
      //   }
      // }
      // // console.log(secDeg);
      // // console.log(hrsDeg + " " + this.city);
      // // console.log(this.city);
      // // console.log(hrsDeg);
      // // console.log(hrsShadow[0].classList);
      // //
      // // console.log(hrsShadow);
      // for (var i = 0; i < hrsShadow.length; i++) {
      //   console.log(hrsShadow[i]);
      //   // console.log(this.city);
      //   // for time over LA(-270) 1st condition has to be extended more below -180
      //   if (hrsDeg >= -180 && hrsDeg < -60 || hrsDeg >= 120 && hrsDeg <= 300 || hrsDeg >= 480 && hrsDeg <= 660) {
      //     hrsShadow[i].classList.add('upper-shadow');
      //     hrsShadow[i].classList.remove('bottom-shadow');
      //   }
      //   else {
      //     hrsShadow[i].classList.add('bottom-shadow');
      //     hrsShadow[i].classList.remove('upper-shadow');
      //   }
      // }
    }
  }]);

  return Clock;
}();

var London = new Clock(-180, 'new-york');
London.createClock();

var Warsaw = new Clock(0, 'warsaw');
Warsaw.createClock();

var Moscow = new Clock(60, 'moscow');
Moscow.createClock();

var Tokyo = new Clock(240, 'tokyo');
Tokyo.createClock();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  vertical-align: baseline; }\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\n* {\n  box-sizing: border-box; }\n\nbody {\n  background-color: #f9f9f9; }\n\n#root {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly; }\n  #root .clock-container {\n    margin-top: 6.250em;\n    padding: 0.625em; }\n    #root .clock-container .clock {\n      width: 20.000em;\n      height: 20.000em;\n      background-color: #000;\n      border-radius: 100%;\n      position: relative;\n      /* IE10+ */\n      background-image: -ms-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* Mozilla Firefox */\n      background-image: -moz-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* Opera */\n      background-image: -o-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* Webkit (Safari/Chrome 10) */\n      background-image: -webkit-gradient(radial, right top, 0, right top, 572, color-stop(0, #454545), color-stop(100, #000000));\n      /* Webkit (Chrome 11+) */\n      background-image: -webkit-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* W3C Markup */\n      background-image: radial-gradient(ellipse farthest-corner at right top, #454545 0%, #000000 100%);\n      -webkit-box-shadow: -25px 35px 11px -1px rgba(0, 0, 0, 0.75);\n      -moz-box-shadow: -25px 35px 11px -1px rgba(0, 0, 0, 0.75);\n      box-shadow: -25px 35px 11px -1px rgba(0, 0, 0, 0.75); }\n      #root .clock-container .clock .clock-face {\n        width: 84%;\n        height: 84%;\n        background-color: #fff;\n        z-index: 10;\n        border-radius: 100%;\n        left: 8%;\n        top: 8%;\n        position: relative;\n        /* IE10+ */\n        background-image: -ms-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* Mozilla Firefox */\n        background-image: clockGrad -moz-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* Opera */\n        background-image: -o-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* Webkit (Safari/Chrome 10) */\n        background-image: -webkit-gradient(radial, right top, 0, right top, 515, color-stop(0, #F6F8F9), color-stop(30, #E5EBEE), color-stop(51, #DCE3E8), color-stop(100, #f5f7f9));\n        /* Webkit (Chrome 11+) */\n        background-image: -webkit-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* W3C Markup */\n        background-image: radial-gradient(ellipse farthest-side at right top, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        -webkit-box-shadow: inset 0px 0px 13px 2px rgba(0, 0, 0, 0.75);\n        -moz-box-shadow: inset 0px 0px 13px 2px rgba(0, 0, 0, 0.75);\n        box-shadow: inset 0px 0px 13px 2px rgba(0, 0, 0, 0.75); }\n        #root .clock-container .clock .clock-face .face-cover {\n          position: relative;\n          z-index: 100;\n          width: 90%;\n          height: 90%;\n          background-color: #fff;\n          border-radius: 100%;\n          top: 5%;\n          left: 5%;\n          /* IE10+ */\n          background-image: -ms-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* Mozilla Firefox */\n          background-image: clockGrad -moz-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* Opera */\n          background-image: -o-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* Webkit (Safari/Chrome 10) */\n          background-image: -webkit-gradient(radial, right top, 0, right top, 515, color-stop(0, #F6F8F9), color-stop(30, #E5EBEE), color-stop(51, #DCE3E8), color-stop(100, #f5f7f9));\n          /* Webkit (Chrome 11+) */\n          background-image: -webkit-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* W3C Markup */\n          background-image: radial-gradient(ellipse farthest-side at right top, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%); }\n        #root .clock-container .clock .clock-face .marker {\n          height: 2.5%;\n          width: 100%;\n          background-color: #000;\n          position: absolute;\n          top: 48.8%; }\n        #root .clock-container .clock .clock-face .pin {\n          position: relative;\n          width: 7%;\n          height: 7%;\n          background-color: #000;\n          border-radius: 100%;\n          bottom: 43.6%;\n          left: 46.6%;\n          z-index: 1000; }\n        #root .clock-container .clock .clock-face .hand {\n          background-color: #000;\n          position: absolute;\n          border-bottom-left-radius: 3.125em;\n          border-top-left-radius: 3.125em;\n          transform-origin: 100%;\n          z-index: 1000; }\n        #root .clock-container .clock .clock-face .hour-hand {\n          top: 47.9%;\n          left: 16%;\n          height: 0.625em;\n          width: 34%; }\n        #root .clock-container .clock .clock-face .min-hand {\n          top: 48.7%;\n          left: 10%;\n          height: 2.5%;\n          width: 40%; }\n        #root .clock-container .clock .clock-face .second-hand {\n          top: 49.6%;\n          left: 6.2%;\n          height: 0.125em;\n          width: 44%; }\n      #root .clock-container .clock .city-name {\n        background-color: #e8e8e8;\n        width: 50%;\n        margin: 4.167em auto 0;\n        font-size: 1.5em;\n        font-family: sans-serif;\n        color: #414142;\n        text-align: center;\n        padding: 0.500em 0;\n        -webkit-box-shadow: -2px 2px 5px 0px rgba(0, 0, 0, 0.75);\n        -moz-box-shadow: -2px 2px 5px 0px rgba(0, 0, 0, 0.75);\n        box-shadow: -2px 2px 5px 0px rgba(0, 0, 0, 0.75); }\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGI2ZTYyNWM2ZDA1YWM4M2YwODkiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL3N0eWxlL21haW4uc2Nzcz8wNjliIiwid2VicGFjazovLy8uL3N0eWxlL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsiQ2xvY2siLCJkZWciLCJjaXR5Iiwic2V0SW50ZXJ2YWwiLCJzZXREYXRlIiwicm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJjbG9jayIsImNsb2NrRmFjZSIsImlkIiwibWFya2VyQ292ZXIiLCJoYW5kUGluIiwiaGFuZENsYXNzIiwiZm9yRWFjaCIsImVsIiwiaGFuZHMiLCJzdW0iLCJpIiwibWFya2VycyIsImNsb25lIiwiY2xvbmVOb2RlIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJjaXR5TmFtZSIsImlubmVyVGV4dCIsInJlcGxhY2UiLCJ0b1VwcGVyQ2FzZSIsImNpdHlJRCIsImhvdXJIYW5kIiwiZmlyc3RDaGlsZCIsIm5leHRTaWJsaW5nIiwibWluSGFuZCIsInNlY0hhbmQiLCJub3ciLCJEYXRlIiwic2Vjb25kcyIsImdldFNlY29uZHMiLCJzZWNEZWciLCJtaW5zIiwiZ2V0TWludXRlcyIsIm1pbkRlZyIsImhycyIsImdldEhvdXJzIiwiaHJzRGVnIiwidHJhbnNpdGlvbiIsIkxvbmRvbiIsImNyZWF0ZUNsb2NrIiwiV2Fyc2F3IiwiTW9zY293IiwiVG9reW8iXSwibWFwcGluZ3MiOiI7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LCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YjZlNjI1YzZkMDVhYzgzZjA4OSIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCAnLi4vc3R5bGUvbWFpbi5zY3NzJztcblxuXG5cbmNsYXNzIENsb2NrIHtcbiAgY29uc3RydWN0b3IoZGVnLCBjaXR5KSB7XG4gICAgdGhpcy5kZWcgPSBkZWc7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcblxuICAgIHNldEludGVydmFsKCgpID0+IHRoaXMuc2V0RGF0ZSgpLCAxMDAwKTtcbiAgfVxuXG4gIGNyZWF0ZUNsb2NrKCkge1xuXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5cbiAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm9vdC5hcHBlbmRDaGlsZChjaXR5KS5jbGFzc05hbWUgPSAnY2xvY2stY29udGFpbmVyJztcblxuICAgIGNvbnN0IGNsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2l0eS5hcHBlbmRDaGlsZChjbG9jaykuY2xhc3NOYW1lID0gJ2Nsb2NrJztcblxuICAgIGNvbnN0IGNsb2NrRmFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsb2NrLmFwcGVuZENoaWxkKGNsb2NrRmFjZSkuY2xhc3NOYW1lID0gJ2Nsb2NrLWZhY2UnXG4gICAgY2xvY2tGYWNlLmlkID0gdGhpcy5jaXR5O1xuXG4gICAgY29uc3QgbWFya2VyQ292ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQobWFya2VyQ292ZXIpLmNsYXNzTmFtZSA9ICdmYWNlLWNvdmVyJztcblxuICAgIGNvbnN0IGhhbmRQaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQoaGFuZFBpbikuY2xhc3NOYW1lID0gJ3Bpbic7XG5cbiAgICBjb25zdCBoYW5kQ2xhc3MgPSBbJ2hhbmQgaG91ci1oYW5kJywgJ2hhbmQgbWluLWhhbmQnLCAnaGFuZCBzZWNvbmQtaGFuZCddO1xuICAgIGhhbmRDbGFzcy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICBjb25zdCBoYW5kcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaGFuZHMuY2xhc3NOYW1lID0gZWw7XG4gICAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQoaGFuZHMpXG4gICAgfSlcblxuXG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKysgKSB7XG4gICAgICBjb25zdCBtYXJrZXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBjbG9uZSA9IG1hcmtlcnMuY2xvbmVOb2RlKCk7XG4gICAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQoY2xvbmUpLmNsYXNzTmFtZSA9ICdtYXJrZXInO1xuICAgICAgbGV0IGRlZyA9IDMwO1xuICAgICAgY2xvbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3N1bX1kZWcpYDtcbiAgICAgIHN1bSArPSBkZWc7XG4gICAgfVxuXG5cbiAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsb2NrLmFwcGVuZENoaWxkKGNpdHlOYW1lKS5pbm5lclRleHQgPSB0aGlzLmNpdHkucmVwbGFjZSgvLS9nLCAnICcpLnRvVXBwZXJDYXNlKCk7XG4gICAgY2l0eU5hbWUuY2xhc3NOYW1lID0gJ2NpdHktbmFtZSc7XG4gIH1cblxuICBzZXREYXRlKCkge1xuICAgIGNvbnN0IGNpdHlJRCA9IHRoaXMuY2l0eVxuICAgIC8vIGZvciBlYWNoIGluZGl2aWR1YWwgY2xvY2tcbiAgICBjb25zdCBob3VySGFuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NpdHlJRH1gKS5maXJzdENoaWxkLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuICAgIGNvbnN0IG1pbkhhbmQgPSBob3VySGFuZC5uZXh0U2libGluZztcbiAgICBjb25zdCBzZWNIYW5kID0gbWluSGFuZC5uZXh0U2libGluZztcblxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBzZWNvbmRzID0gbm93LmdldFNlY29uZHMoKTtcbiAgICBjb25zdCBzZWNEZWcgPSAoKHNlY29uZHMgLyA2MCkgKiAzNjApICsgOTA7IC8vIDkwIC0gcG9zaXRpb25pbmcgaGFuZHMgb24gWSBheGlzIChzdGFydCkgKyBzZWNEZWcgZWFjaCBzZWNvbmRcbiAgICBzZWNIYW5kLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtzZWNEZWd9ZGVnKWA7XG4gICAgLy8gMXMsIDFtaW4gPSA2ZGVnXG5cbiAgICBjb25zdCBtaW5zID0gbm93LmdldE1pbnV0ZXMoKTtcbiAgICAvLyBhZGQgYmVsb3cgKChzZWNvbmRzIC8gNjApICogNikgYW5kIG1pbkRlZyB3aWxsIGFkZGl0aW9uYWxseSBpbmNyZWFzZSAwLjEgZWFjaCBzZWNvbmQgZ2l2aW5nIHNtb290aCBtb3ZlIG9mIG1pbkhhbmQgYmV0d2VlbiBtaW51dGVzIG92ZXIgNjBzXG4gICAgY29uc3QgbWluRGVnID0gKChtaW5zIC8gNjApICogMzYwKSArIDkwO1xuICAgIG1pbkhhbmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke21pbkRlZ31kZWcpYDtcblxuICAgIC8vIDFoID0gMzBkZWdcblxuICAgIGNvbnN0IGhycyA9IG5vdy5nZXRIb3VycygpO1xuICAgIGNvbnN0IGhyc0RlZyA9ICgoaHJzIC8gMTIpICogMzYwKSArICgobWlucyAvIDYwKSAqIDMwKSArIDkwICsgdGhpcy5kZWcgIDsgLy8gKyAwLjUgZWFjaCBtaW51dGVcbiAgICBob3VySGFuZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7aHJzRGVnfWRlZylgO1xuXG4gICAgLy8gYXZvaWRpbmcgaGFuZHMgZnJvbSByb3RhdGluZyBiYWNrIHRvIHN0YXJ0aW5nIHBvc2l0aW9uIHdoZW4gOTBkZWcgaXMgcmVhY2hlZFxuICAgIChzZWNEZWcgPT09IDkwKSA/IHNlY0hhbmQuc3R5bGUudHJhbnNpdGlvbiA9ICcwcycgOiBzZWNIYW5kLnN0eWxlLnRyYW5zaXRpb24gPSAnMC4ycyBjdWJpYy1iZXppZXIoMC40LCAyLjA4LCAwLjU1LCAwLjQ0KSc7XG4gICAgKG1pbkRlZyA9PT0gOTApID8gbWluSGFuZC5zdHlsZS50cmFuc2l0aW9uID0gJzBzJyA6IG1pbkhhbmQuc3R5bGUudHJhbnNpdGlvbiA9ICcwLjJzIGN1YmljLWJlemllcigwLjQsIDIuMDgsIDAuNTUsIDAuNDQpJztcblxuXG5cblxuXG4gICAgLy8gbmVlZCB0byBtYWtlIG9uZSBsb29wIGZvciBhbGwgaGFuZHMgYW5kIHB1dCBiZWxsb3cgdG8gc2VwZXJhdGUgZnVuY3Rpb25cbiAgICAvLyBkb2Vzbid0IHdvcmsgcHJvcGVybHkgYXQgdGhlIG1vbWVudCAtIGhvdXIgaGFuZCBnbGl0Y2hlc1xuXG4gICAgLy8gY29uc3Qgc2VjU2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY29uZC1oYW5kJyk7XG4gICAgLy8gY29uc3QgbWluU2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbi1oYW5kJyk7XG4gICAgLy8gY29uc3QgaHJzU2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvdXItaGFuZCcpO1xuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgc2VjU2hhZG93Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAvLyBjb25zb2xlLmxvZyhzZWNTaGFkb3cpO1xuICAgIC8vXG4gICAgLy8gICBpZiAoc2VjRGVnID49IDMwMCAmJiBzZWNEZWcgPD0gNDUwIHx8IHNlY0RlZyA+PSAwICYmIHNlY0RlZyA8IDEyMCkge1xuICAgIC8vICAgICBzZWNTaGFkb3dbaV0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgICBzZWNTaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgndXBwZXItc2hhZG93Jyk7XG4gICAgLy8gICB9XG4gICAgLy8gICBlbHNlIHtcbiAgICAvLyAgICAgc2VjU2hhZG93W2ldLmNsYXNzTGlzdC5hZGQoJ3VwcGVyLXNoYWRvdycpO1xuICAgIC8vICAgICBzZWNTaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbWluU2hhZG93Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAvLyBjb25zb2xlLmxvZyhtaW5TaGFkb3cpO1xuICAgIC8vXG4gICAgLy8gICBpZiAobWluRGVnID49IDMwMCAmJiBtaW5EZWcgPD0gNDUwIHx8IG1pbkRlZyA+PSAwICYmIG1pbkRlZyA8IDEyMCkge1xuICAgIC8vICAgICBtaW5TaGFkb3dbaV0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgICBtaW5TaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgndXBwZXItc2hhZG93Jyk7XG4gICAgLy8gICB9XG4gICAgLy8gICBlbHNlIHtcbiAgICAvLyAgICAgbWluU2hhZG93W2ldLmNsYXNzTGlzdC5hZGQoJ3VwcGVyLXNoYWRvdycpO1xuICAgIC8vICAgICBtaW5TaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhzZWNEZWcpO1xuICAgIC8vIC8vIGNvbnNvbGUubG9nKGhyc0RlZyArIFwiIFwiICsgdGhpcy5jaXR5KTtcbiAgICAvLyAvLyBjb25zb2xlLmxvZyh0aGlzLmNpdHkpO1xuICAgIC8vIC8vIGNvbnNvbGUubG9nKGhyc0RlZyk7XG4gICAgLy8gLy8gY29uc29sZS5sb2coaHJzU2hhZG93WzBdLmNsYXNzTGlzdCk7XG4gICAgLy8gLy9cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhocnNTaGFkb3cpO1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgaHJzU2hhZG93Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhocnNTaGFkb3dbaV0pO1xuICAgIC8vICAgLy8gY29uc29sZS5sb2codGhpcy5jaXR5KTtcbiAgICAvLyAgIC8vIGZvciB0aW1lIG92ZXIgTEEoLTI3MCkgMXN0IGNvbmRpdGlvbiBoYXMgdG8gYmUgZXh0ZW5kZWQgbW9yZSBiZWxvdyAtMTgwXG4gICAgLy8gICBpZiAoaHJzRGVnID49IC0xODAgJiYgaHJzRGVnIDwgLTYwIHx8IGhyc0RlZyA+PSAxMjAgJiYgaHJzRGVnIDw9IDMwMCB8fCBocnNEZWcgPj0gNDgwICYmIGhyc0RlZyA8PSA2NjApIHtcbiAgICAvLyAgICAgaHJzU2hhZG93W2ldLmNsYXNzTGlzdC5hZGQoJ3VwcGVyLXNoYWRvdycpO1xuICAgIC8vICAgICBocnNTaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgfVxuICAgIC8vICAgZWxzZSB7XG4gICAgLy8gICAgIGhyc1NoYWRvd1tpXS5jbGFzc0xpc3QuYWRkKCdib3R0b20tc2hhZG93Jyk7XG4gICAgLy8gICAgIGhyc1NoYWRvd1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd1cHBlci1zaGFkb3cnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cbn1cblxuY29uc3QgTG9uZG9uID0gbmV3IENsb2NrKC0xODAsICduZXcteW9yaycpO1xuTG9uZG9uLmNyZWF0ZUNsb2NrKCk7XG5cbmNvbnN0IFdhcnNhdyA9IG5ldyBDbG9jaygwLCAnd2Fyc2F3Jyk7XG5XYXJzYXcuY3JlYXRlQ2xvY2soKTtcblxuY29uc3QgTW9zY293ID0gbmV3IENsb2NrKDYwLCAnbW9zY293Jyk7XG5Nb3Njb3cuY3JlYXRlQ2xvY2soKTtcblxuY29uc3QgVG9reW8gPSBuZXcgQ2xvY2soMjQwLCAndG9reW8nKTtcblRva3lvLmNyZWF0ZUNsb2NrKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYWluLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYWluLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3N0eWxlL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLCBhLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsIGRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwgc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwgYiwgdSwgaSwgY2VudGVyLCBkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLCBmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwgdGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsIGFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBmaWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LCB0aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgfVxcblxcbiNyb290IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTsgfVxcbiAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IDYuMjUwZW07XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW07IH1cXG4gICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sge1xcbiAgICAgIHdpZHRoOiAyMC4wMDBlbTtcXG4gICAgICBoZWlnaHQ6IDIwLjAwMGVtO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgLyogSUUxMCsgKi9cXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1jb3JuZXIsICM0NTQ1NDUgMCUsICMwMDAwMDAgMTAwJSk7XFxuICAgICAgLyogTW96aWxsYSBGaXJlZm94ICovXFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LWNvcm5lciwgIzQ1NDU0NSAwJSwgIzAwMDAwMCAxMDAlKTtcXG4gICAgICAvKiBPcGVyYSAqL1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLXJhZGlhbC1ncmFkaWVudChyaWdodCB0b3AsIGVsbGlwc2UgZmFydGhlc3QtY29ybmVyLCAjNDU0NTQ1IDAlLCAjMDAwMDAwIDEwMCUpO1xcbiAgICAgIC8qIFdlYmtpdCAoU2FmYXJpL0Nocm9tZSAxMCkgKi9cXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgcmlnaHQgdG9wLCAwLCByaWdodCB0b3AsIDU3MiwgY29sb3Itc3RvcCgwLCAjNDU0NTQ1KSwgY29sb3Itc3RvcCgxMDAsICMwMDAwMDApKTtcXG4gICAgICAvKiBXZWJraXQgKENocm9tZSAxMSspICovXFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LWNvcm5lciwgIzQ1NDU0NSAwJSwgIzAwMDAwMCAxMDAlKTtcXG4gICAgICAvKiBXM0MgTWFya3VwICovXFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgZmFydGhlc3QtY29ybmVyIGF0IHJpZ2h0IHRvcCwgIzQ1NDU0NSAwJSwgIzAwMDAwMCAxMDAlKTtcXG4gICAgICAtd2Via2l0LWJveC1zaGFkb3c6IC0yNXB4IDM1cHggMTFweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC43NSk7XFxuICAgICAgLW1vei1ib3gtc2hhZG93OiAtMjVweCAzNXB4IDExcHggLTFweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgICAgIGJveC1zaGFkb3c6IC0yNXB4IDM1cHggMTFweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC43NSk7IH1cXG4gICAgICAjcm9vdCAuY2xvY2stY29udGFpbmVyIC5jbG9jayAuY2xvY2stZmFjZSB7XFxuICAgICAgICB3aWR0aDogODQlO1xcbiAgICAgICAgaGVpZ2h0OiA4NCU7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgICAgei1pbmRleDogMTA7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICAgICAgbGVmdDogOCU7XFxuICAgICAgICB0b3A6IDglO1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgLyogSUUxMCsgKi9cXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tcy1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgIC8qIE1vemlsbGEgRmlyZWZveCAqL1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogY2xvY2tHcmFkIC1tb3otcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAvKiBPcGVyYSAqL1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAvKiBXZWJraXQgKFNhZmFyaS9DaHJvbWUgMTApICovXFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgcmlnaHQgdG9wLCAwLCByaWdodCB0b3AsIDUxNSwgY29sb3Itc3RvcCgwLCAjRjZGOEY5KSwgY29sb3Itc3RvcCgzMCwgI0U1RUJFRSksIGNvbG9yLXN0b3AoNTEsICNEQ0UzRTgpLCBjb2xvci1zdG9wKDEwMCwgI2Y1ZjdmOSkpO1xcbiAgICAgICAgLyogV2Via2l0IChDaHJvbWUgMTErKSAqL1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgIC8qIFczQyBNYXJrdXAgKi9cXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGZhcnRoZXN0LXNpZGUgYXQgcmlnaHQgdG9wLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMTNweCAycHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcXG4gICAgICAgIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxM3B4IDJweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxM3B4IDJweCByZ2JhKDAsIDAsIDAsIDAuNzUpOyB9XFxuICAgICAgICAjcm9vdCAuY2xvY2stY29udGFpbmVyIC5jbG9jayAuY2xvY2stZmFjZSAuZmFjZS1jb3ZlciB7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgei1pbmRleDogMTAwO1xcbiAgICAgICAgICB3aWR0aDogOTAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDkwJTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgICAgICAgdG9wOiA1JTtcXG4gICAgICAgICAgbGVmdDogNSU7XFxuICAgICAgICAgIC8qIElFMTArICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tcy1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgICAgLyogTW96aWxsYSBGaXJlZm94ICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGNsb2NrR3JhZCAtbW96LXJhZGlhbC1ncmFkaWVudChyaWdodCB0b3AsIGVsbGlwc2UgZmFydGhlc3Qtc2lkZSwgI0Y2RjhGOSAwJSwgI0U1RUJFRSAzMCUsICNEQ0UzRTggNTElLCAjZjVmN2Y5IDEwMCUpO1xcbiAgICAgICAgICAvKiBPcGVyYSAqL1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgICAgLyogV2Via2l0IChTYWZhcmkvQ2hyb21lIDEwKSAqL1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgcmlnaHQgdG9wLCAwLCByaWdodCB0b3AsIDUxNSwgY29sb3Itc3RvcCgwLCAjRjZGOEY5KSwgY29sb3Itc3RvcCgzMCwgI0U1RUJFRSksIGNvbG9yLXN0b3AoNTEsICNEQ0UzRTgpLCBjb2xvci1zdG9wKDEwMCwgI2Y1ZjdmOSkpO1xcbiAgICAgICAgICAvKiBXZWJraXQgKENocm9tZSAxMSspICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAgIC8qIFczQyBNYXJrdXAgKi9cXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgZmFydGhlc3Qtc2lkZSBhdCByaWdodCB0b3AsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLm1hcmtlciB7XFxuICAgICAgICAgIGhlaWdodDogMi41JTtcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgdG9wOiA0OC44JTsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLnBpbiB7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgd2lkdGg6IDclO1xcbiAgICAgICAgICBoZWlnaHQ6IDclO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICAgICAgICBib3R0b206IDQzLjYlO1xcbiAgICAgICAgICBsZWZ0OiA0Ni42JTtcXG4gICAgICAgICAgei1pbmRleDogMTAwMDsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLmhhbmQge1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDMuMTI1ZW07XFxuICAgICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDMuMTI1ZW07XFxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDEwMCU7XFxuICAgICAgICAgIHotaW5kZXg6IDEwMDA7IH1cXG4gICAgICAgICNyb290IC5jbG9jay1jb250YWluZXIgLmNsb2NrIC5jbG9jay1mYWNlIC5ob3VyLWhhbmQge1xcbiAgICAgICAgICB0b3A6IDQ3LjklO1xcbiAgICAgICAgICBsZWZ0OiAxNiU7XFxuICAgICAgICAgIGhlaWdodDogMC42MjVlbTtcXG4gICAgICAgICAgd2lkdGg6IDM0JTsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLm1pbi1oYW5kIHtcXG4gICAgICAgICAgdG9wOiA0OC43JTtcXG4gICAgICAgICAgbGVmdDogMTAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDIuNSU7XFxuICAgICAgICAgIHdpZHRoOiA0MCU7IH1cXG4gICAgICAgICNyb290IC5jbG9jay1jb250YWluZXIgLmNsb2NrIC5jbG9jay1mYWNlIC5zZWNvbmQtaGFuZCB7XFxuICAgICAgICAgIHRvcDogNDkuNiU7XFxuICAgICAgICAgIGxlZnQ6IDYuMiU7XFxuICAgICAgICAgIGhlaWdodDogMC4xMjVlbTtcXG4gICAgICAgICAgd2lkdGg6IDQ0JTsgfVxcbiAgICAgICNyb290IC5jbG9jay1jb250YWluZXIgLmNsb2NrIC5jaXR5LW5hbWUge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcXG4gICAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgICBtYXJnaW46IDQuMTY3ZW0gYXV0byAwO1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgICAgICAgY29sb3I6ICM0MTQxNDI7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBwYWRkaW5nOiAwLjUwMGVtIDA7XFxuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IC0ycHggMnB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcXG4gICAgICAgIC1tb3otYm94LXNoYWRvdzogLTJweCAycHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgICAgICAgYm94LXNoYWRvdzogLTJweCAycHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNzUpOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=