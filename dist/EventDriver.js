"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var EventDriver=function(){function f(){}return f.register=function(e,r){var t=f.regtable[e]||[];t.push(r),f.regtable[e]=t},f.unregister=function(e,r){for(var t=f.regtable[e]||[],a=-1,n=0;n<t;n++)if(t[n]===r){a=n;break}-1!==a&&t.splice(a,1)},f.send=function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];var a=f.regtable[e];if(a)for(var n=0,i=a;n<i.length;n++){i[n].apply(void 0,r)}},f.regtable=[],f}(),_default=EventDriver;exports.default=_default;
//# sourceMappingURL=EventDriver.js.map
