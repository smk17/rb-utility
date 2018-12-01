/**
 * getLocationSearch 获取 window.location.search 的参数并格式化成 object
 */
export function getLocationSearch() {
    let obj = {};
    let searchList = decodeURIComponent(window.location.search)
        .substring(1)
        .split("&");
    for (const search of searchList) {
        const element = search.split("=");
        const key = element[0];
        const val = element[1];
        obj[key] = val;
    }
    return obj;
}
export default getLocationSearch;
