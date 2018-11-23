import { LoggerLevelEnum } from "./IUtilityTypes";
/**
 * 环境对象
 */
export default class Environment {
    private static s_data;
    private static s_globalErrorCallback(ex);
    /**
     * 初始化，由平台统一调用
     * @param data 初始数据
     */
    static initialize(data: any): void;
    /**
     * 弹出层淡出淡入时间
     * @returns
     */
    static readonly tierFadeTime: number;
    /**
     * 当前是否为调试模式
     */
    static readonly isDebug: boolean;
    /**
     * 获取写日志的级别
     */
    static readonly loggerLevel: number;
    /**
     * 获取当前显示的本地化信息
     */
    static readonly location: string;
    /**
     * 写日志
     * @param loggerLevel 日志级别
     * @param logInfo 日志信息
     */
    static writeLog(loggerLevel: LoggerLevelEnum, logInfo: any): void;
    /**
     * 复位全局异常处理
     */
    static resetGlobalErrorCallback(): void;
    /**
     * 处理捕获到的全局异常
     * @param ex 异常对象
     */
    static __processError(ex: any): void;
    /**
     * 指定自定义的全局异常回调处理
     * @param {type} ex
     * @returns
     */
    static globalErrorCallback: (ex) => void;
}
