/** 错误异常类型 */
export enum ErrorType {
  unknown,
  known,
  /** 权限 */
  permissions
}

/**
 * 日志级别枚举
 */
export enum LoggerLevelEnum {
  /** 未定义 */
  None = 0,
  /** 一般跟踪日志 */
  Trace = 1,
  /** 调试 */
  Debug,
  /** 信息 */
  Info,
  /** 警告 */
  Warn,
  /** 错误 */
  Error,
  /** 崩溃 */
  Fatal
}

/**
 * 日期部分类型
 */
export enum DatePartEnum {
  /** 年 */
  year = 1,
  /** 月 */
  month,
  /** 日 */
  day,
  /** * 周 */
  week,
  /** 时 */
  hour,
  /** 分 */
  minute,
  /** 秒 */
  second
}

/**
 * 排序类型枚举
 */
export enum SortTypeEnum {
  /**
   * 正序
   */
  asc = 1,
  /**
   * 倒序
   */
  desc
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