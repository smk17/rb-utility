import ConsoleHelper from "./ConsoleHelper";
import ErrorHelper from "./ErrorHelper";
import TypeHelper from "./TypeHelper";
import JsonHelper from "./JsonHelper";
/**
 * 环境对象
 */
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.s_globalErrorCallback = function (ex) {
        if (Environment.isDebug) {
            // UI.Dialogs.error(ex.message, ErrorHelper.__printException(ex));
            ConsoleHelper.error({ message: ex.message, stack: ErrorHelper.__printException(ex) });
        }
        else {
            // UI.Dialogs.error("当前操作失败，请联系系统管理员。" + (ex.no ? "操作编号：" + ex.no : ""));
            ConsoleHelper.error("当前操作失败，请联系系统管理员。" + (ex.no ? "操作编号：" + ex.no : ""));
        }
    };
    /**
     * 初始化，由平台统一调用
     * @param data 初始数据
     */
    Environment.initialize = function (data) {
        Environment.s_data = data;
    };
    Object.defineProperty(Environment, "tierFadeTime", {
        /**
         * 弹出层淡出淡入时间
         * @returns
         */
        get: function () {
            return Environment.s_data.tierFadeTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment, "isDebug", {
        /**
         * 当前是否为调试模式
         */
        get: function () {
            return Environment.s_data.isDebug;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment, "loggerLevel", {
        /**
         * 获取写日志的级别
         */
        get: function () {
            return Environment.s_data.loggerLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment, "location", {
        /**
         * 获取当前显示的本地化信息
         */
        get: function () {
            return Environment.s_data.location;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 写日志
     * @param loggerLevel 日志级别
     * @param logInfo 日志信息
     */
    Environment.writeLog = function (loggerLevel, logInfo) {
        if (loggerLevel >= Environment.loggerLevel) {
            if (logInfo) {
                var data = {
                    isException: TypeHelper.isType(logInfo, Error),
                    loggerLevel: loggerLevel,
                    url: window.location.href
                };
                if (TypeHelper.isString(logInfo)) {
                    data.message = logInfo;
                }
                else {
                    var additionData = {}, value = void 0;
                    if (TypeHelper.isError(logInfo)) {
                        additionData["message"] = logInfo.message;
                        additionData["stack"] = logInfo.stack;
                    }
                    for (var key in logInfo) {
                        if (logInfo.hasOwnProperty(key)) {
                            value = logInfo[key];
                            if (typeof value !== "string") {
                                value = JsonHelper.toJson(value);
                            }
                            additionData[key] = value;
                        }
                    }
                    data.additionData = additionData;
                }
                // 调用服务写日志
                // ServiceHelper.service({ type: "common", name: "log", params: { data: data } });
            }
        }
    };
    /**
     * 复位全局异常处理
     */
    Environment.resetGlobalErrorCallback = function () {
        Environment.globalErrorCallback = Environment.s_globalErrorCallback;
    };
    /**
     * 处理捕获到的全局异常
     * @param ex 异常对象
     */
    Environment.__processError = function (ex) {
        if (Environment.globalErrorCallback) {
            Environment.globalErrorCallback(ex);
        }
    };
    Environment.s_data = {
        tierFadeTime: 200,
        isDebug: false,
        loggerLevel: 6,
        location: "zh-cn"
    };
    /**
     * 指定自定义的全局异常回调处理
     * @param {type} ex
     * @returns
     */
    Environment.globalErrorCallback = Environment.s_globalErrorCallback;
    return Environment;
}());
export default Environment;
