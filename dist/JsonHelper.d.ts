import { IDictionary } from "./IUtilityTypes";
/**
 * Json辅助工具
 * @returns
 */
export default class JsonHelper {
    /**
     * 将对象序列化成json字符串
     * @param {any} data 需要进行序列化的对象
     * @returns 返回序列化后的json字符串
     */
    static toJson(data: any): string;
    /**
     * 将json字符串反序列化成对象
     * @param {string} json json字符串
     * @returns 返回对应的对象
     */
    static parseJson(json: string): any;
    /**
     * 将参数值转换到字符串形式
     * @param value 参数的原始值
     */
    static paramValueToString(value: any): string;
    /**
     * 将参数值转换到字符串形式
     * @param value 参数的原始值
     */
    static paramsValueConvertToString(paramValues: IDictionary): void;
}
