import { IDictionary } from "../IUtilityTypes";
export declare function urlToList(url: string): string[];
/**
 * 对 setTimeout 的封装
 * @param time
 */
export declare function sleep(time: number): Promise<void>;
/**
 * 把对象转换成用于url链接的字符串
 * @param url
 * @param corpId
 * @param params
 */
export declare function url2string(url: string, corpId?: string, params?: object): string;
/**
 * getLocationSearch 获取 window.location.search 的参数并格式化成 object
 */
export declare function getLocationSearch(): IDictionary<string | undefined>;
