"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var DeferredExecution=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"execute",value:function(e,t){var i=this;this._timeoutHandle&&clearTimeout(this._timeoutHandle),this._timeoutHandle=setTimeout(function(){if(t&&t.context)return e.call(t.context,t.data),void(i._timeoutHandle=0);e()},t&&t.timeout&&0<t.timeout?t.timeout:0)}},{key:"cancl",value:function(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}}]),e}();exports.default=DeferredExecution;
//# sourceMappingURL=DeferredExecution.js.map
