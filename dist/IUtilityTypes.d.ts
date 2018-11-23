/** 错误异常类型 */
export declare enum ErrorType {
    unknown = 0,
    known = 1,
    /** 权限 */
    permissions = 2,
}
/**
 * 日志级别枚举
 */
export declare enum LoggerLevelEnum {
    /** 未定义 */
    None = 0,
    /** 一般跟踪日志 */
    Trace = 1,
    /** 调试 */
    Debug = 2,
    /** 信息 */
    Info = 3,
    /** 警告 */
    Warn = 4,
    /** 错误 */
    Error = 5,
    /** 崩溃 */
    Fatal = 6,
}
/**
 * 日期部分类型
 */
export declare enum DatePartEnum {
    /** 年 */
    year = 1,
    /** 月 */
    month = 2,
    /** 日 */
    day = 3,
    /** * 周 */
    week = 4,
    /** 时 */
    hour = 5,
    /** 分 */
    minute = 6,
    /** 秒 */
    second = 7,
}
/**
 * 排序类型枚举
 */
export declare enum SortTypeEnum {
    /**
     * 正序
     */
    asc = 1,
    /**
     * 倒序
     */
    desc = 2,
}
export interface IDeferredExecutionOption {
    context?: any;
    data?: any;
    timeout?: number;
}
export interface ICurrencyParams {
    _currency?: string;
    decimals?: number;
    /** 是否计算并显示 `万` 或 `亿` */
    unit?: boolean;
}
export interface IFormulaValueInfo {
    value: string;
    nextIndex: number;
    symbolValue?: string;
}
export interface IDictionary<T = any> {
    [key: string]: T;
}
