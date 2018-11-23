/**
 * 把对象转换成用于url链接的字符串
 * @param url
 * @param corpId
 * @param params
 */
function url2string(url: string, corpId?: string, params: object = {}) {
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

export default url2string;
