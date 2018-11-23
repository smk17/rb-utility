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
    static platformTo(key: string, ...args: any[]): string;
    /**
     * 将开发语言转换成本地语言
     * @param key 开发语言
     * @param args 替换参数
     * @returns 返回本地化语言
     */
    static to(key: string, ...args: any[]): string;
}
