"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,r,n){return r&&_defineProperties(e.prototype,r),n&&_defineProperties(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var JsonHelper=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"toJson",value:function(e){if(null==e)return"null";if(e.toJSON)return e.toJSON();try{return JSON.stringify(e)}catch(e){return console.log(e),""}}},{key:"parseJson",value:function(r){if(r&&"null"!==r&&"undefined"!==r)try{return JSON.parse(r)}catch(e){return console.error(e,r),{}}return null}},{key:"paramValueToString",value:function(e){return"string"==typeof e?e:t.toJson(e)}},{key:"paramsValueConvertToString",value:function(e){var r;if(e)for(var n in e)e.hasOwnProperty(n)&&(null==(r=e[n])?delete e[n]:"string"!=typeof r&&(e[n]=t.toJson(r)))}}]),t}();exports.default=JsonHelper;
//# sourceMappingURL=JsonHelper.js.map
