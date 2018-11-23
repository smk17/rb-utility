import { IDictionary } from "../IUtilityTypes";

export function urlToList(url: string) {
  const urllist = url.split("/").filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join("/")}`;
  });
}

/**
 * 对 setTimeout 的封装
 * @param time
 */
export function sleep(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
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
export function url2string(url: string, corpId?: string, params: object = {}) {
  let paramsArr: string[] = [];
  if (corpId) params = { corpId, ...params };
  // params = {...FilterHelper.getLocationSearch(), ...params}
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      paramsArr.push(`${key}=${encodeURIComponent(params[key])}`);
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
export function getLocationSearch(): IDictionary<string | undefined> {
  let obj: IDictionary<string> = {};
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
