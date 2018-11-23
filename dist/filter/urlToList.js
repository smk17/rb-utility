function urlToList(url) {
    var urllist = url.split("/").filter(function (i) { return i; });
    return urllist.map(function (urlItem, index) {
        return "/" + urllist.slice(0, index + 1).join("/");
    });
}
export default urlToList;
//# sourceMappingURL=urlToList.js.map