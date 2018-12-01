// import Axios from "axios";
// import "whatwg-fetch";
import {
  IServiceInfo,
  ServiceErrorLevelEnum,
  ServiceType
} from "./IUtilityTypes";
import JsonHelper from "./JsonHelper";
import ConsoleHelper from "./ConsoleHelper";
import EventDriver from "./EventDriver";

export default class ServiceHelper {
  /** 数据请求失败时重新请求的次数 */
  public static RELOADCOUNT = 5;
  /** 数据超时时间 */
  public static TIMEOUT = 30000;
  private static _toParamString = async val => {
    if (val === null || val === undefined) {
      return null;
    }
    switch (typeof val) {
      case "string":
        return val;
      case "boolean":
        return val ? "true" : "false";
      case "number":
        return val.toString();
      default:
        const momentAsync = await import(/* webpackChunkName: "momentjs" */ "moment");
        const moment = (momentAsync as any).default;
        if (moment.isDate(val)) {
          return moment(val).format("yyyy-MM-dd HH:mm:ss");
        }
        if (
          val.data &&
          val.data instanceof Blob &&
          typeof val.fileName === "string"
        ) {
          return val;
        }
        if (typeof val === "object") {
          for (const key in val) {
            if (val.hasOwnProperty(key)) {
              if (typeof val[key] === "object")
                val[key] = JsonHelper.toJson(val[key]);
            }
          }
        }
        return JsonHelper.toJson(val);
    }
  };

  /**
   * 异常处理.如果是 `UserException` 异常,则会直接弹出异常信息;否则会写入异常日志,并弹出 `操作失败，请关闭重试！`
   * @param ex 异常对象
   */
  private static _dispose(ex, rejct?: (ex) => void) {
    if (!ex) return;
    switch (ex.name) {
      case "PassException":
        return;
      case "BusinessException":
        switch (ex.type) {
          case "ReferencedDataException":
            {
              let datas = ex.referencedDatas;
              if (datas.length > 5) {
                datas[5] = "等";
              }
              ex.success = false;
              ex.message = "被使用的数据：" + datas.join("，") + ex.message;
              if (rejct) rejct(ex);
            }
            break;
          default:
            ex.success = false;
            if (rejct) rejct(ex);
            break;
        }
        break;
      case "RightsException":
      case "SystemException":
      case "AuthorizationException":
      case "ClientDisposeException":
      case "OpenDBConnectionException":
        ex.success = false;
        if (rejct) rejct(ex);
        break;
      default:
        let message = ex + "";
        if (message.search("Network request failed")) {
          let data = {
            // success: false,
            name: "RequestServiceException",
            status: 704,
            message: "网络请求失败，错误码：704"
          };
          if (rejct) rejct(data);
        } else {
          let data = {
            success: false,
            message
          };
          if (rejct) rejct(data);
        }
        break;
    }
  }

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
  //               key + "=" + (await ServiceHelper._toParamString(service.params[key]));
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
  //       timeout: ServiceHelper.TIMEOUT
  //     });
  //     if (response) {
  //       if (response.status >= 200 && response.status < 300) {
  //         const { data } = response;
  //         let ex = data.e;
  //         if (ex) {
  //           if (ex.name === "BusinessException") {
  //             if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
  //               ServiceHelper._dispose(ex, rejct);
  //             }
  //           } else if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
  //             ServiceHelper._dispose(ex, rejct);
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
  //         ServiceHelper._dispose(error, rejct);
  //       }
  //     } else {
  //       error = new Error("response is null");
  //       error.name = "RequestNullException";
  //       ServiceHelper._dispose(error, rejct);
  //     }
  //   });
  // }

  /**
   * 执行指定的服务
   * @param service 要执行的服务
   */
  private static _executeService<T>(host: string, service: IServiceInfo) {
    return new Promise<T>(async (resolve, rejct) => {
      let formData;
      let isFormData = false;
      let handlingErrorLevel =
        service.handlingErrorLevel || ServiceErrorLevelEnum.allError;
      if (service.params) {
        if (service.params instanceof FormData) {
          formData = service.params;
          isFormData = true;
        } else {
          try {
            formData = "";
            for (let key in service.params) {
              if (service.params.hasOwnProperty(key)) {
                if (formData) {
                  formData += "&";
                }
                formData +=
                  key +
                  "=" +
                  (await ServiceHelper._toParamString(service.params[key]));
              }
            }
          } catch (ex) {
            if (handlingErrorLevel >= ServiceErrorLevelEnum.fail) {
              console.warn("FormatError");
              ServiceHelper._dispose(ex, rejct);
              console.error("FormData format error: " + ex);
            } else {
              rejct({
                type: "FormatError",
                name: "参数格式化出错，请检查参数格式",
                message: ex
              });
            }
          }
        }
      }
      let headers = new Headers({
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
          headers,
          body: formData
        }),
        new Promise<null>((_, reject) => {
          setTimeout(() => {
            let result = {
              data: {
                success: false,
                message: "网络请求超时啦～"
              }
            };
            reject(result.data);
          }, ServiceHelper.TIMEOUT);
        })
      ])
        .then(response => {
          // response 有可能为null
          let error: Error;
          if (response) {
            if (response.status >= 200 && response.status < 300) {
              return response.text();
            } else {
              error = new Error(response.statusText);
              error.name = "RequestServiceException";
              error["status"] = response.status;
              throw error;
            }
          } else {
            error = new Error("response is null");
            error.name = "RequestNullException";
            throw error;
          }
        })
        .then(res => {
          const result = JsonHelper.parseJson(res);
          // console.log(result);
          if (service.name === "/anonymity/writelog") {
            return;
          }
          let ex = result.e;
          if (ex) {
            if (ex.name === "BusinessException") {
              if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
                ServiceHelper._dispose(ex, rejct);
              }
            } else if (handlingErrorLevel >= ServiceErrorLevelEnum.allError) {
              ServiceHelper._dispose(ex, rejct);
            }
            rejct(ex);
          } else {
            // result.data 有可能为null
            if (result.data) {
              if (result.data.success === false) {
                rejct(result.data);
              } else {
                resolve(result.data);
              }
            } else {
              ConsoleHelper.error(service.name, "获取数据为null");
              resolve(undefined);
            }
          }
        })
        .catch(ex => {
          if (service.name === "/anonymity/writelog") {
            return;
          }
          if (handlingErrorLevel >= ServiceErrorLevelEnum.fail) {
            // console.warn(ex);
            ServiceHelper._dispose(ex, rejct);
          } else {
            rejct(ex);
          }
        });
    });
  }

  /**
   * 写日志
   * 把日志数据上传到服务器
   * @param data 日志数据
   */
  public static async writeLog(data) {
    // 把日志数据上传到服务器
    ConsoleHelper.log(JsonHelper.toJson(data), "@dy/service/ServiceHelper.ts:239");
    // ServiceHelper._executeService({
    //   name: "/anonymity/writelog",
    //   params: data
    // })
  }
  /**
   * 执行指定的服务
   * @param service 要执行的服务
   * @param type 服务的类型
   */
  public static executeService<T>(
    host: string,
    service: IServiceInfo,
    type: ServiceType = ServiceType.Get
  ) {
    return new Promise<T>((resolve, rejct) => {
      let reloading = ServiceHelper.RELOADCOUNT;
      let execute = () => {
        ServiceHelper._executeService<T>(host, service)
          .then(res => {
            resolve(res);
            if (type === ServiceType.Get)
              EventDriver.send("networkError", false, () => {});
          })
          .catch(err => {
            if (err.success === false) {
              rejct(err);
              return;
            }
            if (err.name === "RequestServiceException") {
              if (
                err.status === 408 ||
                err.status === 503 ||
                err.status === 504 ||
                err.status === 704
              ) {
                if (reloading > 0) {
                  ConsoleHelper.log(
                    "数据请求失败，重新请求，请求计数：" + reloading,
                    "@dy/service/ServiceHelper.ts:273"
                  );
                  execute();
                  reloading--;
                } else {
                  if (type === ServiceType.Get)
                    EventDriver.send("networkError", true, execute);
                  rejct(err);
                }
              } else rejct(err);
            } else rejct(err);
          });
      };
      execute();
    });
  }
}
