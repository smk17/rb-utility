/** 错误异常类型 */
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["unknown"] = 0] = "unknown";
    ErrorType[ErrorType["known"] = 1] = "known";
    /** 权限 */
    ErrorType[ErrorType["permissions"] = 2] = "permissions";
})(ErrorType || (ErrorType = {}));
/**
 * 日志级别枚举
 */
export var LoggerLevelEnum;
(function (LoggerLevelEnum) {
    /** 未定义 */
    LoggerLevelEnum[LoggerLevelEnum["None"] = 0] = "None";
    /** 一般跟踪日志 */
    LoggerLevelEnum[LoggerLevelEnum["Trace"] = 1] = "Trace";
    /** 调试 */
    LoggerLevelEnum[LoggerLevelEnum["Debug"] = 2] = "Debug";
    /** 信息 */
    LoggerLevelEnum[LoggerLevelEnum["Info"] = 3] = "Info";
    /** 警告 */
    LoggerLevelEnum[LoggerLevelEnum["Warn"] = 4] = "Warn";
    /** 错误 */
    LoggerLevelEnum[LoggerLevelEnum["Error"] = 5] = "Error";
    /** 崩溃 */
    LoggerLevelEnum[LoggerLevelEnum["Fatal"] = 6] = "Fatal";
})(LoggerLevelEnum || (LoggerLevelEnum = {}));
/**
 * 日期部分类型
 */
export var DatePartEnum;
(function (DatePartEnum) {
    /** 年 */
    DatePartEnum[DatePartEnum["year"] = 1] = "year";
    /** 月 */
    DatePartEnum[DatePartEnum["month"] = 2] = "month";
    /** 日 */
    DatePartEnum[DatePartEnum["day"] = 3] = "day";
    /** * 周 */
    DatePartEnum[DatePartEnum["week"] = 4] = "week";
    /** 时 */
    DatePartEnum[DatePartEnum["hour"] = 5] = "hour";
    /** 分 */
    DatePartEnum[DatePartEnum["minute"] = 6] = "minute";
    /** 秒 */
    DatePartEnum[DatePartEnum["second"] = 7] = "second";
})(DatePartEnum || (DatePartEnum = {}));
/**
 * 排序类型枚举
 */
export var SortTypeEnum;
(function (SortTypeEnum) {
    /**
     * 正序
     */
    SortTypeEnum[SortTypeEnum["asc"] = 1] = "asc";
    /**
     * 倒序
     */
    SortTypeEnum[SortTypeEnum["desc"] = 2] = "desc";
})(SortTypeEnum || (SortTypeEnum = {}));
export class IDataInfo {
}
/** 服务请求类型 */
export var ServiceType;
(function (ServiceType) {
    ServiceType[ServiceType["Get"] = 1] = "Get";
    ServiceType[ServiceType["Post"] = 2] = "Post";
})(ServiceType || (ServiceType = {}));
/**
 * 执行服务错误处理级别枚举
 */
export var ServiceErrorLevelEnum;
(function (ServiceErrorLevelEnum) {
    /**
     * 不处理任何异常
     */
    ServiceErrorLevelEnum[ServiceErrorLevelEnum["notHandling"] = 1] = "notHandling";
    /**
     * 只处理所有请求过程中的环境异常
     */
    ServiceErrorLevelEnum[ServiceErrorLevelEnum["fail"] = 2] = "fail";
    /**
     * 只处理所有后端反馈异常
     */
    ServiceErrorLevelEnum[ServiceErrorLevelEnum["error"] = 3] = "error";
    /**
     * 处理各种异常
     */
    ServiceErrorLevelEnum[ServiceErrorLevelEnum["allError"] = 4] = "allError";
})(ServiceErrorLevelEnum || (ServiceErrorLevelEnum = {}));
