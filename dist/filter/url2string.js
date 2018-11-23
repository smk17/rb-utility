var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * 把对象转换成用于url链接的字符串
 * @param url
 * @param corpId
 * @param params
 */
function url2string(url, corpId, params) {
    if (params === void 0) { params = {}; }
    var paramsArr = [];
    if (corpId)
        params = __assign({ corpId: corpId }, params);
    // params = {...FilterHelper.getLocationSearch(), ...params}
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            paramsArr.push(key + "=" + encodeURIComponent(params[key]));
        }
    }
    if (paramsArr.length > 0) {
        url = url + (url.search(/\?/g) === -1 ? "?" : "&");
        url = url + paramsArr.join("&");
    }
    return url;
}
export default url2string;
//# sourceMappingURL=url2string.js.map