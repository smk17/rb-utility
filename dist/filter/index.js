var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
export function urlToList(url) {
    var urllist = url.split("/").filter(function (i) { return i; });
    return urllist.map(function (urlItem, index) {
        return "/" + urllist.slice(0, index + 1).join("/");
    });
}
/**
 * 对 setTimeout 的封装
 * @param time
 */
export function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
/**
 * 把对象转换成用于url链接的字符串
 * @param url
 * @param corpId
 * @param params
 */
export function url2string(url, corpId, params) {
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
/**
 * getLocationSearch 获取 window.location.search 的参数并格式化成 object
 */
export function getLocationSearch() {
    var obj = {};
    var searchList = decodeURIComponent(window.location.search)
        .substring(1)
        .split("&");
    for (var _i = 0, searchList_1 = searchList; _i < searchList_1.length; _i++) {
        var search = searchList_1[_i];
        var element = search.split("=");
        var key = element[0];
        var val = element[1];
        obj[key] = val;
    }
    return obj;
}
//# sourceMappingURL=index.js.map