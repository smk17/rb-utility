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
        var search = window.location.search;
        if (location) {
            if (location.search) {
                search = location.search;
            }
        }
        else if (LocationSearch.location) {
            if (LocationSearch.location.search) {
                search = LocationSearch.location.search;
            }
        }
        var searchList = decodeURIComponent(search)
            .substring(1)
            .split("&");
        for (var _i = 0, searchList_1 = searchList; _i < searchList_1.length; _i++) {
            var search_1 = searchList_1[_i];
            var element = search_1.split("=");
            var key = element[0];
            var val = element[1];
            obj[key] = val;
        }
        return obj;
    };
    return LocationSearch;
}());
export default LocationSearch;
