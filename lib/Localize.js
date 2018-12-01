import StringHelper from "./StringHelper";
/**
 * 本地化
 */
export default class Localize {
    /**
     * 将开发语言转换成本地语言
     * @param key 开发语言
     * @param args 替换参数
     * @returns 返回本地化语言
     */
    static platformTo(key, ...args) {
        if (args.length > 0) {
            return StringHelper.format(key, args);
        }
        else {
            return key;
        }
    }
    /**
     * 将开发语言转换成本地语言
     * @param key 开发语言
     * @param args 替换参数
     * @returns 返回本地化语言
     */
    static to(key, ...args) {
        if (args.length > 0) {
            return StringHelper.format(key, args);
        }
        else {
            return key;
        }
    }
}
