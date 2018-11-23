/**
 * 公式对象
 */
export default class Formula {
    private static _formulaRegular;
    private static _getFormulaValue(formula, start, priority);
    private static _replaceSymbel(formula);
    private _fn;
    private _partake;
    /**
     * 公式对象
     * @param formula 字符串形式的公式表达式
     * @param decimal 计算后的保留位
     */
    constructor(formula: string, decimal?: number);
    /**
     * 用指定的数据进行公式计算
     * @param data 主要数据
     * @param addition 附加数据。当主要数据中不存在指定的数据时，从附加数据中获取
     * @returns 返回计算结果
     */
    calc(data: any, addition?: any): number;
    /**
     * 获取依赖信息
     */
    getPartake(): string[];
}
