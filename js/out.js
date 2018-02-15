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

console.log('clocks');

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
      clock.appendChild(cityName).innerText = this.city.toUpperCase();
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
      // console.log(hrs);
      var hrsDeg = hrs / 12 * 360 + mins / 60 * 30 + 90 + this.deg; // + 0.5 each minute
      // console.log('GET HRS ' + hrsDeg + " " + this.city);
      hourHand.style.transform = 'rotate(' + hrsDeg + 'deg)';

      // avoiding hands from rotating back to starting position when 90deg is reached
      secDeg === 90 ? secHand.style.transition = '0s' : secHand.style.transition = '0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
      minDeg === 90 ? minHand.style.transition = '0s' : minHand.style.transition = '0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';

      // // need to make one loop for all hands and put bellow to seperate function
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

var London = new Clock(-180, 'london');
London.createClock();
//
var Warsaw = new Clock(0, 'warsaw');
Warsaw.createClock();
//
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
	module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./clock.scss", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./clock.scss");

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
exports.push([module.i, "body {\n  background-color: #b1adac; }\n  body * {\n    box-sizing: border-box; }\n\n#root {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly; }\n  #root .clock-container {\n    margin-top: 100px;\n    padding: 10px; }\n    #root .clock-container .clock {\n      width: 320px;\n      height: 320px;\n      background-color: #000;\n      border-radius: 100%;\n      position: relative;\n      /* IE10+ */\n      background-image: -ms-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* Mozilla Firefox */\n      background-image: -moz-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* Opera */\n      background-image: -o-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* Webkit (Safari/Chrome 10) */\n      background-image: -webkit-gradient(radial, right top, 0, right top, 572, color-stop(0, #454545), color-stop(100, #000000));\n      /* Webkit (Chrome 11+) */\n      background-image: -webkit-radial-gradient(right top, ellipse farthest-corner, #454545 0%, #000000 100%);\n      /* W3C Markup */\n      background-image: radial-gradient(ellipse farthest-corner at right top, #454545 0%, #000000 100%);\n      -webkit-box-shadow: -25px 35px 11px -1px rgba(0, 0, 0, 0.75);\n      -moz-box-shadow: -25px 35px 11px -1px rgba(0, 0, 0, 0.75);\n      box-shadow: -25px 35px 11px -1px rgba(0, 0, 0, 0.75); }\n      #root .clock-container .clock .clock-face {\n        width: 84%;\n        height: 84%;\n        background-color: #fff;\n        z-index: 10;\n        border-radius: 100%;\n        left: 8%;\n        top: 8%;\n        position: relative;\n        /* IE10+ */\n        background-image: -ms-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* Mozilla Firefox */\n        background-image: -moz-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* Opera */\n        background-image: -o-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* Webkit (Safari/Chrome 10) */\n        background-image: -webkit-gradient(radial, right top, 0, right top, 515, color-stop(0, #F6F8F9), color-stop(30, #E5EBEE), color-stop(51, #DCE3E8), color-stop(100, #f5f7f9));\n        /* Webkit (Chrome 11+) */\n        background-image: -webkit-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        /* W3C Markup */\n        background-image: radial-gradient(ellipse farthest-side at right top, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n        -webkit-box-shadow: inset 0px 0px 13px 2px rgba(0, 0, 0, 0.75);\n        -moz-box-shadow: inset 0px 0px 13px 2px rgba(0, 0, 0, 0.75);\n        box-shadow: inset 0px 0px 13px 2px rgba(0, 0, 0, 0.75); }\n        #root .clock-container .clock .clock-face .face-cover {\n          position: relative;\n          z-index: 100;\n          width: 90%;\n          height: 90%;\n          background-color: #fff;\n          border-radius: 100%;\n          top: 5%;\n          left: 5%;\n          /* IE10+ */\n          background-image: -ms-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* Mozilla Firefox */\n          background-image: -moz-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* Opera */\n          background-image: -o-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* Webkit (Safari/Chrome 10) */\n          background-image: -webkit-gradient(radial, right top, 0, right top, 515, color-stop(0, #F6F8F9), color-stop(30, #E5EBEE), color-stop(51, #DCE3E8), color-stop(100, #f5f7f9));\n          /* Webkit (Chrome 11+) */\n          background-image: -webkit-radial-gradient(right top, ellipse farthest-side, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%);\n          /* W3C Markup */\n          background-image: radial-gradient(ellipse farthest-side at right top, #F6F8F9 0%, #E5EBEE 30%, #DCE3E8 51%, #f5f7f9 100%); }\n        #root .clock-container .clock .clock-face .marker {\n          height: 2.5%;\n          width: 100%;\n          background-color: #000;\n          position: absolute;\n          top: 48.8%;\n          border-radius: 5%; }\n        #root .clock-container .clock .clock-face .pin {\n          position: relative;\n          width: 7%;\n          height: 7%;\n          background-color: #000;\n          border-radius: 100%;\n          bottom: 43.6%;\n          left: 46.6%;\n          z-index: 1000; }\n        #root .clock-container .clock .clock-face .hand {\n          background-color: #000;\n          position: absolute;\n          border-bottom-left-radius: 50px;\n          border-top-left-radius: 50px;\n          transform-origin: 100%;\n          z-index: 1000; }\n        #root .clock-container .clock .clock-face .bottom-shadow {\n          -webkit-box-shadow: -1px 1px 2px 0px rgba(0, 0, 0, 0.75);\n          -moz-box-shadow: -1px 1px 2px 0px rgba(0, 0, 0, 0.75);\n          box-shadow: -1px 1px 2px 0px rgba(0, 0, 0, 0.75); }\n        #root .clock-container .clock .clock-face .upper-shadow {\n          -webkit-box-shadow: 1px -1px 2px 0px rgba(0, 0, 0, 0.75);\n          -moz-box-shadow: 1px -1px 2px 0px rgba(0, 0, 0, 0.75);\n          box-shadow: 1px -1px 2px 0px rgba(0, 0, 0, 0.75); }\n        #root .clock-container .clock .clock-face .hour-hand {\n          top: 47.9%;\n          left: 16%;\n          height: 10px;\n          width: 34%;\n          transform: 0s; }\n        #root .clock-container .clock .clock-face .min-hand {\n          top: 48.7%;\n          left: 10%;\n          height: 2.5%;\n          width: 40%; }\n        #root .clock-container .clock .clock-face .second-hand {\n          top: 49.6%;\n          left: 6.2%;\n          height: 2px;\n          width: 44%; }\n      #root .clock-container .clock .city-name {\n        margin-top: 100px;\n        font-size: 1.5em;\n        font-weight: bolder;\n        text-align: center;\n        padding: 8px 0;\n        border: 1px solid black; }\n", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDQ1MjM3ZWMwYzEyYTExNDY3MDEiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL3N0eWxlL2Nsb2NrLnNjc3M/NmJjYSIsIndlYnBhY2s6Ly8vLi9zdHlsZS9jbG9jay5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiQ2xvY2siLCJkZWciLCJjaXR5Iiwic2V0SW50ZXJ2YWwiLCJzZXREYXRlIiwicm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJjbG9jayIsImNsb2NrRmFjZSIsImlkIiwibWFya2VyQ292ZXIiLCJoYW5kUGluIiwiaGFuZENsYXNzIiwiZm9yRWFjaCIsImVsIiwiaGFuZHMiLCJzdW0iLCJpIiwibWFya2VycyIsImNsb25lIiwiY2xvbmVOb2RlIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJjaXR5TmFtZSIsImlubmVyVGV4dCIsInRvVXBwZXJDYXNlIiwiY2l0eUlEIiwiaG91ckhhbmQiLCJmaXJzdENoaWxkIiwibmV4dFNpYmxpbmciLCJtaW5IYW5kIiwic2VjSGFuZCIsIm5vdyIsIkRhdGUiLCJzZWNvbmRzIiwiZ2V0U2Vjb25kcyIsInNlY0RlZyIsIm1pbnMiLCJnZXRNaW51dGVzIiwibWluRGVnIiwiaHJzIiwiZ2V0SG91cnMiLCJocnNEZWciLCJ0cmFuc2l0aW9uIiwiTG9uZG9uIiwiY3JlYXRlQ2xvY2siLCJXYXJzYXciLCJNb3Njb3ciLCJUb2t5byJdLCJtYXBw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b2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ0NTIzN2VjMGMxMmExMTQ2NzAxIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICcuLi9zdHlsZS9jbG9jay5zY3NzJztcbmNvbnNvbGUubG9nKCdjbG9ja3MnKTtcblxuXG5cbmNsYXNzIENsb2NrIHtcbiAgY29uc3RydWN0b3IoZGVnLCBjaXR5KSB7XG4gICAgdGhpcy5kZWcgPSBkZWc7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcblxuICAgIHNldEludGVydmFsKCgpID0+IHRoaXMuc2V0RGF0ZSgpLCAxMDAwKTtcbiAgfVxuXG4gIGNyZWF0ZUNsb2NrKCkge1xuXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5cbiAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm9vdC5hcHBlbmRDaGlsZChjaXR5KS5jbGFzc05hbWUgPSAnY2xvY2stY29udGFpbmVyJztcblxuICAgIGNvbnN0IGNsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2l0eS5hcHBlbmRDaGlsZChjbG9jaykuY2xhc3NOYW1lID0gJ2Nsb2NrJztcblxuICAgIGNvbnN0IGNsb2NrRmFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsb2NrLmFwcGVuZENoaWxkKGNsb2NrRmFjZSkuY2xhc3NOYW1lID0gJ2Nsb2NrLWZhY2UnXG4gICAgY2xvY2tGYWNlLmlkID0gdGhpcy5jaXR5O1xuXG4gICAgY29uc3QgbWFya2VyQ292ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQobWFya2VyQ292ZXIpLmNsYXNzTmFtZSA9ICdmYWNlLWNvdmVyJztcblxuICAgIGNvbnN0IGhhbmRQaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQoaGFuZFBpbikuY2xhc3NOYW1lID0gJ3Bpbic7XG5cbiAgICBjb25zdCBoYW5kQ2xhc3MgPSBbJ2hhbmQgaG91ci1oYW5kJywgJ2hhbmQgbWluLWhhbmQnLCAnaGFuZCBzZWNvbmQtaGFuZCddO1xuICAgIGhhbmRDbGFzcy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICBjb25zdCBoYW5kcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaGFuZHMuY2xhc3NOYW1lID0gZWw7XG4gICAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQoaGFuZHMpXG4gICAgfSlcblxuXG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKysgKSB7XG4gICAgICBjb25zdCBtYXJrZXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBjbG9uZSA9IG1hcmtlcnMuY2xvbmVOb2RlKCk7XG4gICAgICBjbG9ja0ZhY2UuYXBwZW5kQ2hpbGQoY2xvbmUpLmNsYXNzTmFtZSA9ICdtYXJrZXInO1xuICAgICAgbGV0IGRlZyA9IDMwO1xuICAgICAgY2xvbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3N1bX1kZWcpYDtcbiAgICAgIHN1bSArPSBkZWc7XG4gICAgfVxuXG5cbiAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsb2NrLmFwcGVuZENoaWxkKGNpdHlOYW1lKS5pbm5lclRleHQgPSB0aGlzLmNpdHkudG9VcHBlckNhc2UoKTtcbiAgICBjaXR5TmFtZS5jbGFzc05hbWUgPSAnY2l0eS1uYW1lJztcbiAgfVxuXG4gIHNldERhdGUoKSB7XG4gICAgY29uc3QgY2l0eUlEID0gdGhpcy5jaXR5XG4gICAgLy8gZm9yIGVhY2ggaW5kaXZpZHVhbCBjbG9ja1xuICAgIGNvbnN0IGhvdXJIYW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2l0eUlEfWApLmZpcnN0Q2hpbGQubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgY29uc3QgbWluSGFuZCA9IGhvdXJIYW5kLm5leHRTaWJsaW5nO1xuICAgIGNvbnN0IHNlY0hhbmQgPSBtaW5IYW5kLm5leHRTaWJsaW5nO1xuXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHNlY29uZHMgPSBub3cuZ2V0U2Vjb25kcygpO1xuICAgIGNvbnN0IHNlY0RlZyA9ICgoc2Vjb25kcyAvIDYwKSAqIDM2MCkgKyA5MDsgLy8gOTAgLSBwb3NpdGlvbmluZyBoYW5kcyBvbiBZIGF4aXMgKHN0YXJ0KSArIHNlY0RlZyBlYWNoIHNlY29uZFxuICAgIHNlY0hhbmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3NlY0RlZ31kZWcpYDtcbiAgICAvLyAxcywgMW1pbiA9IDZkZWdcblxuICAgIGNvbnN0IG1pbnMgPSBub3cuZ2V0TWludXRlcygpO1xuICAgIC8vIGFkZCBiZWxvdyAoKHNlY29uZHMgLyA2MCkgKiA2KSBhbmQgbWluRGVnIHdpbGwgYWRkaXRpb25hbGx5IGluY3JlYXNlIDAuMSBlYWNoIHNlY29uZCBnaXZpbmcgc21vb3RoIG1vdmUgb2YgbWluSGFuZCBiZXR3ZWVuIG1pbnV0ZXMgb3ZlciA2MHNcbiAgICBjb25zdCBtaW5EZWcgPSAoKG1pbnMgLyA2MCkgKiAzNjApICsgOTA7XG4gICAgbWluSGFuZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7bWluRGVnfWRlZylgO1xuXG4gICAgLy8gMWggPSAzMGRlZ1xuXG4gICAgY29uc3QgaHJzID0gbm93LmdldEhvdXJzKCk7XG4gICAgLy8gY29uc29sZS5sb2coaHJzKTtcbiAgICBjb25zdCBocnNEZWcgPSAoKGhycyAvIDEyKSAqIDM2MCkgKyAoKG1pbnMgLyA2MCkgKiAzMCkgKyA5MCArIHRoaXMuZGVnICA7IC8vICsgMC41IGVhY2ggbWludXRlXG4gICAgLy8gY29uc29sZS5sb2coJ0dFVCBIUlMgJyArIGhyc0RlZyArIFwiIFwiICsgdGhpcy5jaXR5KTtcbiAgICBob3VySGFuZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7aHJzRGVnfWRlZylgO1xuXG4gICAgLy8gYXZvaWRpbmcgaGFuZHMgZnJvbSByb3RhdGluZyBiYWNrIHRvIHN0YXJ0aW5nIHBvc2l0aW9uIHdoZW4gOTBkZWcgaXMgcmVhY2hlZFxuICAgIChzZWNEZWcgPT09IDkwKSA/IHNlY0hhbmQuc3R5bGUudHJhbnNpdGlvbiA9ICcwcycgOiBzZWNIYW5kLnN0eWxlLnRyYW5zaXRpb24gPSAnMC4ycyBjdWJpYy1iZXppZXIoMC40LCAyLjA4LCAwLjU1LCAwLjQ0KSc7XG4gICAgKG1pbkRlZyA9PT0gOTApID8gbWluSGFuZC5zdHlsZS50cmFuc2l0aW9uID0gJzBzJyA6IG1pbkhhbmQuc3R5bGUudHJhbnNpdGlvbiA9ICcwLjJzIGN1YmljLWJlemllcigwLjQsIDIuMDgsIDAuNTUsIDAuNDQpJztcblxuICAgIC8vIC8vIG5lZWQgdG8gbWFrZSBvbmUgbG9vcCBmb3IgYWxsIGhhbmRzIGFuZCBwdXQgYmVsbG93IHRvIHNlcGVyYXRlIGZ1bmN0aW9uXG4gICAgLy8gY29uc3Qgc2VjU2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY29uZC1oYW5kJyk7XG4gICAgLy8gY29uc3QgbWluU2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbi1oYW5kJyk7XG4gICAgLy8gY29uc3QgaHJzU2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvdXItaGFuZCcpO1xuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgc2VjU2hhZG93Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAvLyBjb25zb2xlLmxvZyhzZWNTaGFkb3cpO1xuICAgIC8vXG4gICAgLy8gICBpZiAoc2VjRGVnID49IDMwMCAmJiBzZWNEZWcgPD0gNDUwIHx8IHNlY0RlZyA+PSAwICYmIHNlY0RlZyA8IDEyMCkge1xuICAgIC8vICAgICBzZWNTaGFkb3dbaV0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgICBzZWNTaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgndXBwZXItc2hhZG93Jyk7XG4gICAgLy8gICB9XG4gICAgLy8gICBlbHNlIHtcbiAgICAvLyAgICAgc2VjU2hhZG93W2ldLmNsYXNzTGlzdC5hZGQoJ3VwcGVyLXNoYWRvdycpO1xuICAgIC8vICAgICBzZWNTaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbWluU2hhZG93Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAvLyBjb25zb2xlLmxvZyhtaW5TaGFkb3cpO1xuICAgIC8vXG4gICAgLy8gICBpZiAobWluRGVnID49IDMwMCAmJiBtaW5EZWcgPD0gNDUwIHx8IG1pbkRlZyA+PSAwICYmIG1pbkRlZyA8IDEyMCkge1xuICAgIC8vICAgICBtaW5TaGFkb3dbaV0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgICBtaW5TaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgndXBwZXItc2hhZG93Jyk7XG4gICAgLy8gICB9XG4gICAgLy8gICBlbHNlIHtcbiAgICAvLyAgICAgbWluU2hhZG93W2ldLmNsYXNzTGlzdC5hZGQoJ3VwcGVyLXNoYWRvdycpO1xuICAgIC8vICAgICBtaW5TaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhzZWNEZWcpO1xuICAgIC8vIC8vIGNvbnNvbGUubG9nKGhyc0RlZyArIFwiIFwiICsgdGhpcy5jaXR5KTtcbiAgICAvLyAvLyBjb25zb2xlLmxvZyh0aGlzLmNpdHkpO1xuICAgIC8vIC8vIGNvbnNvbGUubG9nKGhyc0RlZyk7XG4gICAgLy8gLy8gY29uc29sZS5sb2coaHJzU2hhZG93WzBdLmNsYXNzTGlzdCk7XG4gICAgLy8gLy9cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhocnNTaGFkb3cpO1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgaHJzU2hhZG93Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhocnNTaGFkb3dbaV0pO1xuICAgIC8vICAgLy8gY29uc29sZS5sb2codGhpcy5jaXR5KTtcbiAgICAvLyAgIC8vIGZvciB0aW1lIG92ZXIgTEEoLTI3MCkgMXN0IGNvbmRpdGlvbiBoYXMgdG8gYmUgZXh0ZW5kZWQgbW9yZSBiZWxvdyAtMTgwXG4gICAgLy8gICBpZiAoaHJzRGVnID49IC0xODAgJiYgaHJzRGVnIDwgLTYwIHx8IGhyc0RlZyA+PSAxMjAgJiYgaHJzRGVnIDw9IDMwMCB8fCBocnNEZWcgPj0gNDgwICYmIGhyc0RlZyA8PSA2NjApIHtcbiAgICAvLyAgICAgaHJzU2hhZG93W2ldLmNsYXNzTGlzdC5hZGQoJ3VwcGVyLXNoYWRvdycpO1xuICAgIC8vICAgICBocnNTaGFkb3dbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYm90dG9tLXNoYWRvdycpO1xuICAgIC8vICAgfVxuICAgIC8vICAgZWxzZSB7XG4gICAgLy8gICAgIGhyc1NoYWRvd1tpXS5jbGFzc0xpc3QuYWRkKCdib3R0b20tc2hhZG93Jyk7XG4gICAgLy8gICAgIGhyc1NoYWRvd1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd1cHBlci1zaGFkb3cnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cbn1cblxuY29uc3QgTG9uZG9uID0gbmV3IENsb2NrKC0xODAsICdsb25kb24nKTtcbkxvbmRvbi5jcmVhdGVDbG9jaygpO1xuLy9cbmNvbnN0IFdhcnNhdyA9IG5ldyBDbG9jaygwLCAnd2Fyc2F3Jyk7XG5XYXJzYXcuY3JlYXRlQ2xvY2soKTtcbi8vXG5jb25zdCBNb3Njb3cgPSBuZXcgQ2xvY2soNjAsICdtb3Njb3cnKTtcbk1vc2Nvdy5jcmVhdGVDbG9jaygpO1xuXG5jb25zdCBUb2t5byA9IG5ldyBDbG9jaygyNDAsICd0b2t5bycpO1xuVG9reW8uY3JlYXRlQ2xvY2soKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Nsb2NrLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY2xvY2suc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY2xvY2suc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3R5bGUvY2xvY2suc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2IxYWRhYzsgfVxcbiAgYm9keSAqIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbiNyb290IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTsgfVxcbiAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xcbiAgICBwYWRkaW5nOiAxMHB4OyB9XFxuICAgICNyb290IC5jbG9jay1jb250YWluZXIgLmNsb2NrIHtcXG4gICAgICB3aWR0aDogMzIwcHg7XFxuICAgICAgaGVpZ2h0OiAzMjBweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIC8qIElFMTArICovXFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1zLXJhZGlhbC1ncmFkaWVudChyaWdodCB0b3AsIGVsbGlwc2UgZmFydGhlc3QtY29ybmVyLCAjNDU0NTQ1IDAlLCAjMDAwMDAwIDEwMCUpO1xcbiAgICAgIC8qIE1vemlsbGEgRmlyZWZveCAqL1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1jb3JuZXIsICM0NTQ1NDUgMCUsICMwMDAwMDAgMTAwJSk7XFxuICAgICAgLyogT3BlcmEgKi9cXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LWNvcm5lciwgIzQ1NDU0NSAwJSwgIzAwMDAwMCAxMDAlKTtcXG4gICAgICAvKiBXZWJraXQgKFNhZmFyaS9DaHJvbWUgMTApICovXFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIHJpZ2h0IHRvcCwgMCwgcmlnaHQgdG9wLCA1NzIsIGNvbG9yLXN0b3AoMCwgIzQ1NDU0NSksIGNvbG9yLXN0b3AoMTAwLCAjMDAwMDAwKSk7XFxuICAgICAgLyogV2Via2l0IChDaHJvbWUgMTErKSAqL1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1jb3JuZXIsICM0NTQ1NDUgMCUsICMwMDAwMDAgMTAwJSk7XFxuICAgICAgLyogVzNDIE1hcmt1cCAqL1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGZhcnRoZXN0LWNvcm5lciBhdCByaWdodCB0b3AsICM0NTQ1NDUgMCUsICMwMDAwMDAgMTAwJSk7XFxuICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAtMjVweCAzNXB4IDExcHggLTFweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgICAgIC1tb3otYm94LXNoYWRvdzogLTI1cHggMzVweCAxMXB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcXG4gICAgICBib3gtc2hhZG93OiAtMjVweCAzNXB4IDExcHggLTFweCByZ2JhKDAsIDAsIDAsIDAuNzUpOyB9XFxuICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2Uge1xcbiAgICAgICAgd2lkdGg6IDg0JTtcXG4gICAgICAgIGhlaWdodDogODQlO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICAgIHotaW5kZXg6IDEwO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgICAgIGxlZnQ6IDglO1xcbiAgICAgICAgdG9wOiA4JTtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIC8qIElFMTArICovXFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAvKiBNb3ppbGxhIEZpcmVmb3ggKi9cXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAvKiBPcGVyYSAqL1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAvKiBXZWJraXQgKFNhZmFyaS9DaHJvbWUgMTApICovXFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgcmlnaHQgdG9wLCAwLCByaWdodCB0b3AsIDUxNSwgY29sb3Itc3RvcCgwLCAjRjZGOEY5KSwgY29sb3Itc3RvcCgzMCwgI0U1RUJFRSksIGNvbG9yLXN0b3AoNTEsICNEQ0UzRTgpLCBjb2xvci1zdG9wKDEwMCwgI2Y1ZjdmOSkpO1xcbiAgICAgICAgLyogV2Via2l0IChDaHJvbWUgMTErKSAqL1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgIC8qIFczQyBNYXJrdXAgKi9cXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGZhcnRoZXN0LXNpZGUgYXQgcmlnaHQgdG9wLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMTNweCAycHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcXG4gICAgICAgIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxM3B4IDJweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxM3B4IDJweCByZ2JhKDAsIDAsIDAsIDAuNzUpOyB9XFxuICAgICAgICAjcm9vdCAuY2xvY2stY29udGFpbmVyIC5jbG9jayAuY2xvY2stZmFjZSAuZmFjZS1jb3ZlciB7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgei1pbmRleDogMTAwO1xcbiAgICAgICAgICB3aWR0aDogOTAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDkwJTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgICAgICAgdG9wOiA1JTtcXG4gICAgICAgICAgbGVmdDogNSU7XFxuICAgICAgICAgIC8qIElFMTArICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tcy1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgICAgLyogTW96aWxsYSBGaXJlZm94ICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otcmFkaWFsLWdyYWRpZW50KHJpZ2h0IHRvcCwgZWxsaXBzZSBmYXJ0aGVzdC1zaWRlLCAjRjZGOEY5IDAlLCAjRTVFQkVFIDMwJSwgI0RDRTNFOCA1MSUsICNmNWY3ZjkgMTAwJSk7XFxuICAgICAgICAgIC8qIE9wZXJhICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLXJhZGlhbC1ncmFkaWVudChyaWdodCB0b3AsIGVsbGlwc2UgZmFydGhlc3Qtc2lkZSwgI0Y2RjhGOSAwJSwgI0U1RUJFRSAzMCUsICNEQ0UzRTggNTElLCAjZjVmN2Y5IDEwMCUpO1xcbiAgICAgICAgICAvKiBXZWJraXQgKFNhZmFyaS9DaHJvbWUgMTApICovXFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQocmFkaWFsLCByaWdodCB0b3AsIDAsIHJpZ2h0IHRvcCwgNTE1LCBjb2xvci1zdG9wKDAsICNGNkY4RjkpLCBjb2xvci1zdG9wKDMwLCAjRTVFQkVFKSwgY29sb3Itc3RvcCg1MSwgI0RDRTNFOCksIGNvbG9yLXN0b3AoMTAwLCAjZjVmN2Y5KSk7XFxuICAgICAgICAgIC8qIFdlYmtpdCAoQ2hyb21lIDExKykgKi9cXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQocmlnaHQgdG9wLCBlbGxpcHNlIGZhcnRoZXN0LXNpZGUsICNGNkY4RjkgMCUsICNFNUVCRUUgMzAlLCAjRENFM0U4IDUxJSwgI2Y1ZjdmOSAxMDAlKTtcXG4gICAgICAgICAgLyogVzNDIE1hcmt1cCAqL1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiByYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBmYXJ0aGVzdC1zaWRlIGF0IHJpZ2h0IHRvcCwgI0Y2RjhGOSAwJSwgI0U1RUJFRSAzMCUsICNEQ0UzRTggNTElLCAjZjVmN2Y5IDEwMCUpOyB9XFxuICAgICAgICAjcm9vdCAuY2xvY2stY29udGFpbmVyIC5jbG9jayAuY2xvY2stZmFjZSAubWFya2VyIHtcXG4gICAgICAgICAgaGVpZ2h0OiAyLjUlO1xcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICB0b3A6IDQ4LjglO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1JTsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLnBpbiB7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgd2lkdGg6IDclO1xcbiAgICAgICAgICBoZWlnaHQ6IDclO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICAgICAgICBib3R0b206IDQzLjYlO1xcbiAgICAgICAgICBsZWZ0OiA0Ni42JTtcXG4gICAgICAgICAgei1pbmRleDogMTAwMDsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLmhhbmQge1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwcHg7XFxuICAgICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwcHg7XFxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDEwMCU7XFxuICAgICAgICAgIHotaW5kZXg6IDEwMDA7IH1cXG4gICAgICAgICNyb290IC5jbG9jay1jb250YWluZXIgLmNsb2NrIC5jbG9jay1mYWNlIC5ib3R0b20tc2hhZG93IHtcXG4gICAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAtMXB4IDFweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC43NSk7XFxuICAgICAgICAgIC1tb3otYm94LXNoYWRvdzogLTFweCAxcHggMnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAtMXB4IDFweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC43NSk7IH1cXG4gICAgICAgICNyb290IC5jbG9jay1jb250YWluZXIgLmNsb2NrIC5jbG9jay1mYWNlIC51cHBlci1zaGFkb3cge1xcbiAgICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDFweCAtMXB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcXG4gICAgICAgICAgLW1vei1ib3gtc2hhZG93OiAxcHggLTFweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC43NSk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDFweCAtMXB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjc1KTsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLmhvdXItaGFuZCB7XFxuICAgICAgICAgIHRvcDogNDcuOSU7XFxuICAgICAgICAgIGxlZnQ6IDE2JTtcXG4gICAgICAgICAgaGVpZ2h0OiAxMHB4O1xcbiAgICAgICAgICB3aWR0aDogMzQlO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IDBzOyB9XFxuICAgICAgICAjcm9vdCAuY2xvY2stY29udGFpbmVyIC5jbG9jayAuY2xvY2stZmFjZSAubWluLWhhbmQge1xcbiAgICAgICAgICB0b3A6IDQ4LjclO1xcbiAgICAgICAgICBsZWZ0OiAxMCU7XFxuICAgICAgICAgIGhlaWdodDogMi41JTtcXG4gICAgICAgICAgd2lkdGg6IDQwJTsgfVxcbiAgICAgICAgI3Jvb3QgLmNsb2NrLWNvbnRhaW5lciAuY2xvY2sgLmNsb2NrLWZhY2UgLnNlY29uZC1oYW5kIHtcXG4gICAgICAgICAgdG9wOiA0OS42JTtcXG4gICAgICAgICAgbGVmdDogNi4yJTtcXG4gICAgICAgICAgaGVpZ2h0OiAycHg7XFxuICAgICAgICAgIHdpZHRoOiA0NCU7IH1cXG4gICAgICAjcm9vdCAuY2xvY2stY29udGFpbmVyIC5jbG9jayAuY2l0eS1uYW1lIHtcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwMHB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBwYWRkaW5nOiA4cHggMDtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUvY2xvY2suc2Nzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9