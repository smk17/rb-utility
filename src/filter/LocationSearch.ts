import { IDictionary } from "../IUtilityTypes";

type Location = { search?: string; query?: IDictionary<string> } & IDictionary;

/** 获取 location.search 的参数并格式化成 object */
class LocationSearch {
  public static location?: Location;

  /**
   * 获取 location.search 的参数并格式化成 object
   * @param location Location 对象包含有关当前 URL 的信息。默认是`window.location`,可传递其他路由器自带的`location`替代，例如`react-router`
   */
  public static get(location?: Location) {
    let search = window.location.search;
    if (location) {
      if (location.query) {
        return location.query;
      } else if (location.search) {
        search = location.search;
      }
    } else if (LocationSearch.location) {
      if (LocationSearch.location.query) {
        return LocationSearch.location.query;
      } else if (LocationSearch.location.search) {
        search = LocationSearch.location.search;
      }
    }
    let obj: IDictionary<string> = {};
    let searchList = decodeURIComponent(search)
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
}

export default LocationSearch;
