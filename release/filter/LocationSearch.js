/** 获取 location.search 的参数并格式化成 object */
var LocationSearch = /** @class */ (function () {
    function LocationSearch() {
    }
    /**
     * 获取 location.search 的参数并格式化成 object
     * @param location Location 对象包含有关当前 URL 的信息。默认是`window.location`,可传递其他路由器自带的`location`替代，例如`react-router`
     */
    LocationSearch.get = function (location) {
        var obj = {};
        location = location
            ? location
            : LocationSearch.location
                ? LocationSearch.location
                : window.location;
        var searchList = decodeURIComponent(location.search)
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
    };
    return LocationSearch;
}());
export default LocationSearch;
