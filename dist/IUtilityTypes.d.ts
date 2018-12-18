/** 错误异常类型 */
export declare enum ErrorType {
    unknown = 0,
    known = 1,
    /** 权限 */
    permissions = 2,
    /** 业务异常 */
    business = 3
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
    Fatal = 6
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
    second = 7
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
    desc = 2
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
export interface ILoginResult {
    rights: {
        [key: string]: string;
    };
    success: boolean;
}
export interface IServiceResult<T> {
    /** 数据 */
    data: T;
    /** 第几页 */
    pageIndex: number;
    /** 总数 */
    totalCount: number;
}
export interface IDataSourceExtraParam {
    /**
     * 字符串值
     * 1. 当以`script:`开头表示该字符串为脚本
     * 2. 当以`page:`开头表示该字符串为获取当前`url`中`search`区域的某一个值
     */
    value: string;
}
export interface IOrderDictionary {
    name: string;
    sortType: number;
}
export interface IServiceParams {
    id: string;
    pageAddress: {
        pageMode: number;
        pageId: string;
        moduleId: string;
        systemId: string;
    };
}
export interface IGetServiceParams extends IServiceParams {
    mode: number;
    attachParams?: object;
}
export interface ISaveServiceParams extends IServiceParams {
    params: object;
}
/**
 * 控制器请求对象
 */
export interface IControllerRequest {
    /**
     * 当前要请求的控制器id
     */
    id: any;
    /**
     * 调用参数
     */
    params: any;
}
/**
 * 要执行的服务信息
 */
export interface IServiceInfo {
    /**
     * 服务名称
     */
    name: string;
    /**
     * 服务参数
     */
    params: any;
    /**
     * 是否采用同步执行，默认为false
     */
    isSynch?: boolean;
    /**
     * 是否自己处理，默认为success
     */
    handlingErrorLevel?: boolean | number;
}
export declare class IDataInfo {
    /**
     * 数据id(1.系统数据源：系统id/数据源id；2.页面数据源：系统id/模块id/页面id/数据源id)
     */
    id: any;
    pageMode: any;
    mode: any;
    orderby: any;
    pageSize: any;
    pageIndex: any;
    params: any;
}
/** 服务请求类型 */
export declare enum ServiceType {
    Get = 1,
    Post = 2
}
/**
 * 执行服务错误处理级别枚举
 */
export declare enum ServiceErrorLevelEnum {
    /**
     * 不处理任何异常
     */
    notHandling = 1,
    /**
     * 只处理所有请求过程中的环境异常
     */
    fail = 2,
    /**
     * 只处理所有后端反馈异常
     */
    error = 3,
    /**
     * 处理各种异常
     */
    allError = 4
}
//# sourceMappingURL=IUtilityTypes.d.ts.map