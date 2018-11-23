var IDataInfo = /** @class */ (function () {
    function IDataInfo() {
    }
    return IDataInfo;
}());
export { IDataInfo };
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
//# sourceMappingURL=IServiceTypes.js.map