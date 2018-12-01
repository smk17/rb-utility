import { ErrorType } from "./IUtilityTypes";
import { EventDriver } from "./index";
import ConsoleHelper from "./ConsoleHelper";

/**
 * 函数执行装饰器
 */
export default class EventHelper {
  private static _lockCount = 0;
  /**
   * 执行一段普通函数代码
   *
   * 使用：`@EventHelper.exec()`
   */
  static exec(
    message: any = ConsoleHelper,
    errorText: string = "数据获取失败,请联系系统管理员！"
  ) {
    return function decorator(target, name, descriptor) {
      const original = descriptor.value;
      if (typeof original === "function") {
        descriptor.value = async function(...args) {
          try {
            const result = await original.apply(this, args);
            return result;
          } catch (e) {
            if (e) {
              let errorType = ErrorType.unknown;
              errorText = e.message || errorText;
              if (e.success === false) {
                errorText = e.message;
                errorType = ErrorType.known;
                if (e.errorType) {
                  errorType = e.errorType;
                }
              }
              message.error(errorText);
              EventDriver.send("catchError", {
                errorText,
                errorType,
                errorMessage: e
              });
            }
            throw e;
          }
        };
      }
      return descriptor;
    };
  }

  /**
   * 执行一段普通函数代码，并对该函数加锁
   *
   * 使用：`@EventHelper.execLock()`
   * @param errorText 出现错误时得提示信息文本
   */
  static execLock(message: any = ConsoleHelper, errorText: string = "未知错误") {
    return function decorator(target: any, name: string, descriptor) {
      const original = descriptor.value;
      if (typeof original === "function") {
        descriptor.value = async function(...args) {
          try {
            EventHelper.increaseLock();
            const result = await original.apply(this, args);
            EventHelper.decreaseLock();
            return result;
          } catch (e) {
            EventHelper.decreaseLock();
            if (e) {
              let errorType = ErrorType.unknown;
              errorText = e.message || errorText;
              if (e.success === false) {
                errorText = e.message;
                errorType = ErrorType.known;
                if (e.errorType) {
                  errorType = e.errorType;
                }
              }
              message.error(errorText);
              EventDriver.send("catchError", {
                errorText,
                errorType,
                errorMessage: e
              });
            }
            throw e;
          }
        };
      }
      return descriptor;
    };
  }

  /**
   * 执行一段需要把数据提交到后端的函数代码，一般应用在点击提交按钮的场景中，例如：保存提货地址
   *
   * 多按钮状态设定, 通过监听 `lockSubmit` 事件，更新对应按钮状态
   * @param successText 请求成功时得提示信息文本,为`null`时不显示提示信息
   * @param errorText 出现错误时得提示信息文本
   * @returns 声明函数需返回`bool类型`，返回`true`为显示提示信息，当`successText`为`null`时即时返回`true`也不会显示提示信息
   */
  static execSubmit(
    message: any = ConsoleHelper,
    successText: string | null = "保存成功",
    errorText: string = "未知错误"
  ) {
    return function decorator(target: any, name: string, descriptor) {
      const original = descriptor.value;
      if (typeof original === "function") {
        descriptor.value = async function(...args) {
          try {
            EventHelper.increaseLock();
            const result = await original.apply(this, args);
            if (result && successText) {
              message.success(successText, 2, () => {
                EventHelper.decreaseLock();
              });
            } else {
              EventHelper.decreaseLock();
            }
            return result;
          } catch (e) {
            EventHelper.decreaseLock();
            if (e) {
              let errorType = ErrorType.unknown;
              errorText = e.message || errorText;
              if (e.success === false) {
                errorText = e.message;
                errorType = ErrorType.known;
                if (e.errorType) {
                  errorType = e.errorType;
                }
              }
              message.error(errorText);
              EventDriver.send("catchError", {
                errorText,
                errorType,
                errorMessage: e
              });
            }
            throw e;
          }
        };
      }
      return descriptor;
    };
  }

  /**
   * 增加锁计数
   */
  private static increaseLock() {
    EventHelper._lockCount++;
  }
  /**
   * 减少锁计数
   */
  private static decreaseLock() {
    if (EventHelper._lockCount > 0) {
      EventHelper._lockCount--;
    }
  }

  /**
   * 当前缓存是否存在锁对象
   * @returns
   */
  isLock() {
    return EventHelper._lockCount !== 0;
  }
}
