"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var LocationSearch=function(){function c(){}return c.get=function(t){var e={};t=t||(c.location?c.location:window.location);for(var o=0,n=decodeURIComponent(t.search).substring(1).split("&");o<n.length;o++){var r=n[o].split("="),a=r[0],i=r[1];e[a]=i}return e},c}(),_default=LocationSearch;exports.default=_default;
//# sourceMappingURL=LocationSearch.js.map
