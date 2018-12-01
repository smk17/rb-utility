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
export default getLocationSearch;
