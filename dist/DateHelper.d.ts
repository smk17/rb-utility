import { DatePartEnum } from "./IUtilityTypes";
/**
 * 日期帮助类
 */
export default class DateHelper {
    private static _dateFormatExp;
    private static _dateFormatExp2;
    private static _dateFormatExp3;
    private static _isoDateFormatExp;
    private static _isoDateFormatExp2;
    private static _isoDateFormatExp3;
    private static _isoDateFormatExp4;
    private static _isoDateFormatExp5;
    static _fixDate(d: Date, check: Date): void;
    static parseISO8601(value: string): Date | null;
    /**
     * 将一个日期字符串转换成一个日期对象
     * @param value 受支持的日期字符串，格式为：yyyy-MM-dd HH:mm:ss
     * @returns 一个日期对象
     */
    static parse(value: Date | number | string): Date | null;
    /**
     * 格式化日期对象
     * @param date 日期对象
     * @param format 格式
     * @returns 返回格式化后的字符串
     */
    static format(date: Date | number | string | null, format?: string): string;
    /**
     * 格式化日期对象，判断是否是今年，返回对应字符串
     */
    static formatDate(value: Date | number | string): string | number;
    static formatDateTime(value: Date | number | string): string | number;
    /**
     * 计算两个日期之间的间隔
     * @param left 左值
     * @param right 右值
     * @param datepart 计算类型
     * @returns 返回间隔数
     */
    static diff(left: Date | string | number, right: Date | string | number, datepart: DatePartEnum): number;
    /**
     * 在日期中添加或减去指定的时间间隔
     * @param date 要进行处理的日期对象或可以转换成日期的字符串
     * @param datepart 计算类型
     * @param interval 间隔
     * @returns 返回日期对象
     */
    static add(value: Date | string | number, datepart: DatePartEnum, interval: number): Date | null;
}
