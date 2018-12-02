import { IDictionary } from "../IUtilityTypes";

type Location = { search: string } & IDictionary;

/** 获取 location.search 的参数并格式化成 object */
class LocationSearch {
  public static location?: Location;

  /**
   * 获取 location.search 的参数并格式化成 object
   * @param location Location 对象包含有关当前 URL 的信息。默认是`window.location`,可传递其他路由器自带的`location`替代，例如`react-router`
   */
  public static get(location?: Location) {
    let obj: IDictionary<string> = {};
    location = location
      ? location
      : LocationSearch.location
      ? LocationSearch.location
      : window.location;
    let searchList = decodeURIComponent(location.search)
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
