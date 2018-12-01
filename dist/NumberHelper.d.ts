/**
 * 数值帮助类
 */
export default class NumberHelper {
    /**
     * 将可以表示为数值的字符串转变成数值对象
     * @param value 字符串型数值变量
     */
    static parse(value: number | string): number;
    private static _eRegExp;
    private static _clearRegExp;
    private static _zeroRegex;
    private static _isNumberFormat;
    private static _getNumberFormat;
    private static _pad;
    private static _doFormatNumber;
    /**
     * 对指定的数值型四舍五入到指定的精度范围内
     * @param value 要进行精度处理的数值
     * @param decimal 要保留的精度值(小数位).默认为0
     * @returns 返回处理后的值
     */
    static round(value: number, decimal?: number): number;
    /**
     * 对指定的数值型保留到指定的精度范围内，且不进行四舍五入
     * @param value 要进行精度处理的数值
     * @param decimal 要保留的精度值(小数位).默认为0
     * @returns 返回处理后的值
     */
    static unround(value: number, decimal?: number): number;
    /**
     * 对指定的2个数进行指定的算术运算
     * @param left 左操作数
     * @param right 右操作数
     * @param op 运算类型。可以是('+','-','*','/')其中的一个
     * @param decimal 要保留的小数位。可以是0－6范围内的整型，含0和6。默认为6
     * @returns 返回计算后的值
     */
    static calculate(left: number | string, right: number | string, op: string, decimal?: number): number;
    /**
     * 格式化数值对象到指定的格式
     * @param value 一个数值对象或者可以转换成数值对象的字符串
     * @param format 格式信息('#'表示可选占位符;'0'表示固定占位符;'.'表示小数点,只能出现一次;','表示千分号,且只能出现一次;其它符号只能出现在2端,如:￥#,##0.00%).特别说明虽然最后加了'%',但是不会对数值进行*100处理
     * @returns 返回格式化后的字符串形式
     */
    static format(value: number | string, format: string): string;
}
//# sourceMappingURL=NumberHelper.d.ts.map