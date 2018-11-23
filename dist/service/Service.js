var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// import Axios from "axios";
import "whatwg-fetch";
import { JsonHelper, ConsoleHelper, EventDriver } from "../index";
import { ServiceErrorLevelEnum, ServiceType } from "./IServiceTypes";
var Service = /** @class */ (function () {
    function Service() {
    }
    /**
     * 异常处理.如果是 `UserException` 异常,则会直接弹出异常信息;否则会写入异常日志,并弹出 `操作失败，请关闭重试！`
     * @param ex 异常对象
     */
    Service._dispose = function (ex, rejct) {
        if (!ex)
            return;
        switch (ex.name) {
            case "PassException":
                return;
            case "BusinessException":
                switch (ex.type) {
                    case "ReferencedDataException":
                        {
                            var datas = ex.referencedDatas;
                            if (datas.length > 5) {
                                datas[5] = "等";
                            }
                            ex.success = false;
                            ex.message = "被使用的数据：" + datas.join("，") + ex.message;
                            if (rejct)
                                rejct(ex);
                        }
                        break;
                    default:
                        ex.success = false;
                        if (rejct)
                            rejct(ex);
                        break;
                }
                break;
            case "RightsException":
            case "SystemException":
            case "AuthorizationException":
            case "ClientDisposeException":
            case "OpenDBConnectionException":
                ex.success = false;
                if (rejct)
                    rejct(ex);
                break;
            default:
                var message = ex + "";
                if (message.search("Network request failed")) {
                    var data = {
                        // success: false,
                        name: "RequestServiceException",
                        status: 704,
                        message: "网络请求失败，错误码：704"
                    };
                    if (rejct)
                        rejct(data);
                }
                else {
                    var data = {
                        success: false,
                        message: message
                    };
                    if (rejct)
                        rejct(data);
                }
                break;
        }
    };
    /**
     * 执行指定的服务
     * @param service 要执行的服务
     */
    // private static __executeService<T>(host: string, service: IServiceInfo) {
    //   return new Promise<T>(async (resolve, rejct) => {
    //     const { name } = service;
    //     const handlingErrorLevel =
    //       service.handlingErrorLevel || ServiceErrorLevelEnum.allError;
    //     let formData: string = "",
    //       error: Error;
    //     if (service.params) {
    //       try {
    //         formData = "";
    //         for (const key in service.params) {
    //           if (service.params.hasOwnProperty(key)) {
    //             if (formData) {
    //               formData += "&";
    //             }
    //             formData +=
    //               key + "=" + (await Service._toParamString(service.params[key]));
    //           }
    //         }
    //       } catch (ex) {
    //         rejct({
    //           type: "FormatError",
    //           name: "参数格式化出错，请检查参数格式",
    //           message: ex
    //         });
    //       }
    //     }
    //     const response = await Axios.post(host + name, formData, {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Accept: "application/json"
    //       },
    //       timeout: Service.TIMEOUT
    //     });
    //     if (response) {
    //       if (response.status >= 200 && response.status < 300) {
    //         const { data } = response;
    //         let ex = data.e;
    //         if (ex) {
    //           if (ex.name === "BusinessException") {
    //             if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
    //               Service._dispose(ex, rejct);
    //             }
    //           } else if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
    //             Service._dispose(ex, rejct);
    //           }
    //           rejct(ex);
    //         } else {
    //           const result = data;
    //           // result.data 有可能为null
    //           if (result.data) {
    //             if (result.data.success === false) {
    //               rejct(result.data);
    //             } else {
    //               resolve(result.data);
    //             }
    //           } else {
    //             ConsoleHelper.error(service.name, "获取数据为null");
    //             resolve(undefined);
    //           }
    //         }
    //       } else {
    //         error = new Error(response.statusText);
    //         error.name = "RequestServiceException";
    //         error["status"] = response.status;
    //         Service._dispose(error, rejct);
    //       }
    //     } else {
    //       error = new Error("response is null");
    //       error.name = "RequestNullException";
    //       Service._dispose(error, rejct);
    //     }
    //   });
    // }
    /**
     * 执行指定的服务
     * @param service 要执行的服务
     */
    Service._executeService = function (host, service) {
        var _this = this;
        return new Promise(function (resolve, rejct) { return __awaiter(_this, void 0, void 0, function () {
            var formData, isFormData, handlingErrorLevel, _a, _b, _i, key, _c, _d, ex_1, headers;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        isFormData = false;
                        handlingErrorLevel = service.handlingErrorLevel || ServiceErrorLevelEnum.allError;
                        if (!service.params) return [3 /*break*/, 7];
                        if (!(service.params instanceof FormData)) return [3 /*break*/, 1];
                        formData = service.params;
                        isFormData = true;
                        return [3 /*break*/, 7];
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        formData = "";
                        _a = [];
                        for (_b in service.params)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!service.params.hasOwnProperty(key)) return [3 /*break*/, 4];
                        if (formData) {
                            formData += "&";
                        }
                        _c = formData;
                        _d = key + "=";
                        return [4 /*yield*/, Service._toParamString(service.params[key])];
                    case 3:
                        formData = _c + (_d + (_e.sent()));
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _e.sent();
                        if (handlingErrorLevel >= ServiceErrorLevelEnum.fail) {
                            console.warn("FormatError");
                            Service._dispose(ex_1, rejct);
                            console.error("FormData format error: " + ex_1);
                        }
                        else {
                            rejct({
                                type: "FormatError",
                                name: "参数格式化出错，请检查参数格式",
                                message: ex_1
                            });
                        }
                        return [3 /*break*/, 7];
                    case 7:
                        headers = new Headers({
                            "Content-Type": "application/x-www-form-urlencoded",
                            Accept: "application/json"
                        });
                        if (!isFormData) {
                            headers["Content-Type"] = "application/x-www-form-urlencoded";
                        }
                        // console.log("_executeService", formData);
                        Promise.race([
                            fetch(host + service.name, {
                                method: "POST",
                                cache: "no-cache",
                                credentials: "include",
                                headers: headers,
                                body: formData
                            }),
                            new Promise(function (_, reject) {
                                setTimeout(function () {
                                    var result = {
                                        data: {
                                            success: false,
                                            message: "网络请求超时啦～"
                                        }
                                    };
                                    reject(result.data);
                                }, Service.TIMEOUT);
                            })
                        ])
                            .then(function (response) {
                            // response 有可能为null
                            var error;
                            if (response) {
                                if (response.status >= 200 && response.status < 300) {
                                    return response.text();
                                }
                                else {
                                    error = new Error(response.statusText);
                                    error.name = "RequestServiceException";
                                    error["status"] = response.status;
                                    throw error;
                                }
                            }
                            else {
                                error = new Error("response is null");
                                error.name = "RequestNullException";
                                throw error;
                            }
                        })
                            .then(function (res) {
                            var result = JsonHelper.parseJson(res);
                            // console.log(result);
                            if (service.name === "/anonymity/writelog") {
                                return;
                            }
                            var ex = result.e;
                            if (ex) {
                                if (ex.name === "BusinessException") {
                                    if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
                                        Service._dispose(ex, rejct);
                                    }
                                }
                                else if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
                                    Service._dispose(ex, rejct);
                                }
                                rejct(ex);
                            }
                            else {
                                // result.data 有可能为null
                                if (result.data) {
                                    if (result.data.success === false) {
                                        rejct(result.data);
                                    }
                                    else {
                                        resolve(result.data);
                                    }
                                }
                                else {
                                    ConsoleHelper.error(service.name, "获取数据为null");
                                    resolve(undefined);
                                }
                            }
                        })
                            .catch(function (ex) {
                            if (service.name === "/anonymity/writelog") {
                                return;
                            }
                            if (handlingErrorLevel >= ServiceErrorLevelEnum.fail) {
                                // console.warn(ex);
                                Service._dispose(ex, rejct);
                            }
                            else {
                                rejct(ex);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 写日志
     * 把日志数据上传到服务器
     * @param data 日志数据
     */
    Service.writeLog = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 把日志数据上传到服务器
                ConsoleHelper.logDev(JsonHelper.toJson(data), "@dy/service/Service.ts:239");
                return [2 /*return*/];
            });
        });
    };
    /**
     * 执行指定的服务
     * @param service 要执行的服务
     * @param type 服务的类型
     */
    Service.executeService = function (host, service, type) {
        if (type === void 0) { type = ServiceType.Get; }
        return new Promise(function (resolve, rejct) {
            var reloading = Service.RELOADCOUNT;
            var execute = function () {
                Service._executeService(host, service)
                    .then(function (res) {
                    resolve(res);
                    if (type === ServiceType.Get)
                        EventDriver.send("networkError", false, function () { });
                })
                    .catch(function (err) {
                    if (err.success === false) {
                        rejct(err);
                        return;
                    }
                    if (err.name === "RequestServiceException") {
                        if (err.status === 408 ||
                            err.status === 503 ||
                            err.status === 504 ||
                            err.status === 704) {
                            if (reloading > 0) {
                                ConsoleHelper.logDev("数据请求失败，重新请求，请求计数：" + reloading, "@dy/service/Service.ts:273");
                                execute();
                                reloading--;
                            }
                            else {
                                if (type === ServiceType.Get)
                                    EventDriver.send("networkError", true, execute);
                                rejct(err);
                            }
                        }
                        else
                            rejct(err);
                    }
                    else
                        rejct(err);
                });
            };
            execute();
        });
    };
    /** 数据请求失败时重新请求的次数 */
    Service.RELOADCOUNT = 5;
    /** 数据超时时间 */
    Service.TIMEOUT = 30000;
    Service._toParamString = function (val) { return __awaiter(_this, void 0, void 0, function () {
        var _a, momentAsync, moment, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (val === null || val === undefined) {
                        return [2 /*return*/, null];
                    }
                    _a = typeof val;
                    switch (_a) {
                        case "string": return [3 /*break*/, 1];
                        case "boolean": return [3 /*break*/, 2];
                        case "number": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 4];
                case 1: return [2 /*return*/, val];
                case 2: return [2 /*return*/, val ? "true" : "false"];
                case 3: return [2 /*return*/, val.toString()];
                case 4: return [4 /*yield*/, import(/* webpackChunkName: "momentjs" */ "moment")];
                case 5:
                    momentAsync = _b.sent();
                    moment = momentAsync.default;
                    if (moment.isDate(val)) {
                        return [2 /*return*/, moment(val).format("yyyy-MM-dd HH:mm:ss")];
                    }
                    if (val.data &&
                        val.data instanceof Blob &&
                        typeof val.fileName === "string") {
                        return [2 /*return*/, val];
                    }
                    if (typeof val === "object") {
                        for (key in val) {
                            if (val.hasOwnProperty(key)) {
                                if (typeof val[key] === "object")
                                    val[key] = JsonHelper.toJson(val[key]);
                            }
                        }
                    }
                    return [2 /*return*/, JsonHelper.toJson(val)];
            }
        });
    }); };
    return Service;
}());
export default Service;
//# sourceMappingURL=Service.js.map