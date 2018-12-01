"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var TypeHelper=function(){function r(){}return r.isNumber=function(e){return"number"==typeof e},r.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},r.isInteger=function(e){return"number"==typeof e&&e%1==0},r.isBoolean=function(e){return"boolean"==typeof e},r.isString=function(e){return"string"==typeof e},r.isFunction=function(e){return"function"==typeof e},r.isDate=function(e){return e&&e.constructor===Date},r.isError=function(e){return e&&e.constructor===Error},r.isType=function(e,t){if(null==e)return!0;switch(_typeof(e)){case"function":return t===Function;case"boolean":return t===Boolean;case"string":return t===String;case"number":return t===Number;case"symbol":return t===Symbol;default:return e instanceof t}},r.isDomElement=function(e){if(!e)return!1;var t=!1;if("number"!=typeof e.nodeType){var n=e.ownerDocument||e.document||e;if(n!==e)t=(n.defaultView||n.parentWindow)!==e;else t=!n.body||!r.isDomElement(n.body)}return!t},r.clone=function(e){if(e){if(e.clone)return e.clone();switch(_typeof(e)){case"number":case"string":case"boolean":case"function":case"symbol":return e;default:var t={},n=void 0;for(n in e)e.hasOwnProperty(n)&&(t[n]=r.clone(e[n]));return t}}return e},r}(),_default=TypeHelper;exports.default=_default;
//# sourceMappingURL=TypeHelper.js.map
