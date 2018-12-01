/**
 * 类型辅助工具
 */
export default class TypeHelper {
    /**
     * 判断指定的值是否为数值型对象
     * @param obj 进行判断的值对象
     * @returns 如果是数值型，返回true；否则返回false。
     */
    static isNumber(obj: any): boolean;
    /**
     * 判断指定的值是否为数值型对象
     * @param obj 进行判断的值对象
     * @returns 如果是数值型，返回true；否则返回false。
     */
    static isArray(obj: any): boolean;
    /**
     * 判断指定变量是否为整型型
     * @param obj 进行判断的值对象
     * @returns 如果是整数型，返回true；否则返回false。
     */
    static isInteger(obj: any): boolean;
    /**
     * 判断指定变量是否为布尔型
     * @param obj 进行判断的变量
     * @returns 如果是布尔型，返回true；否则返回false。
     */
    static isBoolean(obj: any): boolean;
    /**
     * 判断指定的值是否为字符串对象
     * @param obj 进行判断的值对象
     * @returns 如果是字符串型，返回true；否则返回false。
     */
    static isString(obj: any): boolean;
    /**
     * 判断指定变量是否为函数或自定义类型
     * @param obj 进行判断的变量
     * @returns 如果是函数，返回true；否则返回false。
     */
    static isFunction(obj: any): boolean;
    /**
     * 判断指定变量是否为日期类型
     * @param obj 进行判断的值对象
     * @returns 如果是日期型，返回true；否则返回false。
     */
    static isDate(obj: any): boolean;
    /**
     * 判断当前指定变量是否为Error类型
     * @param obj 进行判断的值对象
     * @returns 如果是Error，返回true；否则返回false。
     */
    static isError(obj: any): boolean;
    /**
     * 判断指定的对象是否由指定的类型构造
     * @param obj
     * @param type
     * @returns 如果是从指定类型构造，返回true；否则返回false。
     */
    static isType(obj: any, type: any): boolean;
    /**
     * 判断指定的对象是否为文档元素
     * @param obj 进行判断的值对象
     * @returns 如果是Dom对象，返回true；否则返回false。
     */
    static isDomElement(obj: any): boolean;
    /**
     * 深度克隆
     * @param obj
     */
    static clone(obj: any): any;
}
//# sourceMappingURL=TypeHelper.d.ts.map