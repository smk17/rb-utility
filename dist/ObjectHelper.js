"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _TypeHelper=_interopRequireDefault(require("./TypeHelper"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var ObjectHelper=function(){function o(){}return o.equals=function(e,r){if(e===r)return!0;if(!(e instanceof Object&&r instanceof Object))return!1;if(e.constructor!==r.constructor)return!1;for(var t in e)if(e.hasOwnProperty(t)){if(!r.hasOwnProperty(t))return!1;if(e[t]!==r[t]){if("object"!==_typeof(e[t]))return!1;if(!o.equals(e[t],r[t]))return!1}}for(var t in r)if(r.hasOwnProperty(t)&&!e.hasOwnProperty(t))return!1;return!0},o.map=function(e,r){var t,o=[];if(e)if(_TypeHelper.default.isArray(e))for(t=0;t<e.length;t++)o.push(r(e[t],t));else for(t in e)e.hasOwnProperty(t)&&o.push(r(e[t],t));return o},o}(),_default=ObjectHelper;exports.default=_default;
//# sourceMappingURL=ObjectHelper.js.map
