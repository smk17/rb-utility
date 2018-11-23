import ConsoleHelper from "./ConsoleHelper";
import StringBuilder from "./StringBuilder";
import StringHelper from "./StringHelper";
import Environment from "./Environment";
import JsonHelper from "./JsonHelper";
import Localize from "./Localize";
import { LoggerLevelEnum } from "./IUtilityTypes";

/**
 * 异常错误对象
 */
export default class ErrorHelper {
  /**
   * 打印异常信息
   * @param e 服务端异常对象
   * @param sb
   */
  private static __printExceptionTo(e: Error, sb: StringBuilder) {
    sb.appendLine("异常类型：", e.name).appendLine("异常消息：", e.message);
    if (e.stack) {
      sb.appendLine("堆栈信息：").appendLine(e.stack);
    }
    if (e["data"]) {
      sb.appendLine("异常数据：").appendLine(JsonHelper.toJson(e["data"]));
    }
    if (e["innerException"]) {
      sb.append("内部异常：");
      ErrorHelper.__printExceptionTo(e["innerException"], sb);
    }
  }

  /**
   * 打印异常信息
   * @param e 服务端异常对象
   */
  static __printException(e: Error) {
    if (e.name === "BusinessException") {
      return e.message;
    }
    let sb = new StringBuilder();
    ErrorHelper.__printExceptionTo(e, sb);
    return sb.toString();
  }

  /**
   * 创建参数异常对象
   * @param kind 参数异常类型
   * @param paramName 参数名称
   * @param message 异常消息
   * @returns 返回Error对象
   */
  private static _errorArgument(kind, paramName, message): Error {
    let name = "Argument" + kind + "Exception";
    if (paramName) {
      message += "\n" + Localize.to("参数名：{0}。", paramName);
    }
    return ErrorHelper.create(name, message, "", null, { paramName });
  }

  /**
   * 创建异常对象
   * @param kind 异常类型
   * @param message 异常消息
   * @returns 返回Error对象
   */
  private static _error(kind, message) {
    return ErrorHelper.create(kind + "Exception", message, "");
  }

  /**
   * 创建一个Error对象
   * @param name 异常名称
   * @param message 错误消息
   * @param stack 堆栈信息
   * @param innerException 内部错误对象
   * @param data 错误的具体信息.默认为null
   * @returns 返回Error对象
   */
  static create(
    name: string,
    message: string,
    stack?: string,
    innerException?: any,
    data?: any
  ): Error {
    let err = new Error();
    err.name = name;
    err.message = message;
    if (stack) {
      err.stack = stack;
    }
    if (innerException) {
      err["innerException"] = innerException;
    }
    if (data) {
      err["data"] = data;
    }
    return err;
  }

  /**
   * 创建一个参数错误异常
   * @param paramName 参数名称
   * @param message 异常消息
   * @returns 返回一个ArgumentException异常对象
   */
  static argument(paramName: string, message?: string): Error {
    return ErrorHelper._errorArgument("", paramName, message || "值并不在预期的范围内。");
  }

  /**
   * 创建一个空值参数异常对象
   * @param paramName 参数名称
   * @param message 异常消息
   * @returns 返回一个ArgumentNullException异常对象
   */
  static argumentNull(paramName: string, message?: string): Error {
    return ErrorHelper._errorArgument("Null", paramName, message || "值不能为null。");
  }

  /**
   * 创建一个参数值超出运行范围的异常对象
   * @param paramName 参数名称
   * @param actualValue 该参数的实际值.默认为null
   * @param message 异常具体消息
   * @returns 返回一个ArgumentOutOfRangeException异常对
   */
  static argumentOutOfRange(paramName: string, actualValue?: any, message?: string): Error {
    let displayMessage = message || "值在有效范围之外。";
    if (paramName) {
      displayMessage += "\n" + StringHelper.format("参数名：{0}。", paramName);
    }
    if (typeof actualValue !== "undefined" && actualValue !== null) {
      displayMessage += "\n" + StringHelper.format("实际值是：{0}。", actualValue);
    }
    return ErrorHelper.create("ArgumentOutOfRangeException", displayMessage, "", null, {
      paramName,
      actualValue
    });
  }

  /**
   * 创建一个参数未定义的异常
   * @param paramName 参数名称
   * @param message 错误的消息
   * @returns 返回一个ArgumentUndefinedException异常对象
   */
  static argumentUndefined(paramName: string, message?: string): Error {
    return ErrorHelper._errorArgument("Undefined", paramName, message || "值不能为未定义。");
  }

  /**
   * 创建一个格式错误的异常
   * @param message 错误的消息
   * @returns 返回一个FormatException异常对象
   */
  static format(message?: string): Error {
    return ErrorHelper._error("Format", message || "一个无效的格式。");
  }

  /**
   * 创建无效操作异常
   * @param message 错误的消息
   * @returns 返回一个InvalidOperationException异常对象
   */
  static invalidOperation(message?: string): Error {
    return ErrorHelper._error("InvalidOperation", message || "一个无效的操作。");
  }

  /**
   * 创建一个没有实现的异常
   * @param message 错误的消息
   * @returns 返回一个NotImplementedException异常对象
   */
  static notImplemented(message?: string): Error {
    return ErrorHelper._error("NotImplemented", message || "当前方法或操作没有实现。");
  }

  /**
   * 创建一个没有实现的异常
   * @param message 错误的消息
   * @returns 返回一个NotImplementedException异常对象
   */
  static notSupported(message?: string): Error {
    return ErrorHelper._error("NotSupported", message || "不支持当前操作。");
  }

  /**
   * 创建一个参数个数异常
   * @param message 错误的消息
   * @returns 返回一个ParameterCountException异常对象
   */
  static parameterCount(message?: string): Error {
    return ErrorHelper._error("ParameterCount", message || "参数个数不匹配。");
  }

  /**
   * 创建一个配置异常
   * @param message 错误的消息
   * @returns 返回一个ConfigException异常对象
   */
  static configException(message?: string): Error {
    return ErrorHelper._error("Config", message || "配置异常。");
  }

  /**
   * 创建一个配置异常
   * @returns 返回一个SystemException异常对象
   */
  static systemException(message?: string): Error {
    return ErrorHelper._error("System", message || "操作失败，请联系系统管理员！");
  }

  /**
   * 创建一个用户提示异常
   * @returns 返回一个UserException异常对象
   */
  static userException(message: string): Error {
    return ErrorHelper._error("User", message);
  }

  /**
   * 创建一个忽略后续操作异常
   * @returns 返回一个PassException异常对象
   */
  static passException(): Error {
    return ErrorHelper._error("Pass", "用于终止后面的操作。");
  }

  /**
   * 判断一个异常对象是否为一个pass异常
   * @param ex 需要判断的异常
   */
  static isPassException(ex: Error): boolean {
    return ex && ex.constructor === Error && ex.name === "PassException";
  }

  /**
   * 捕获所有的异常,并抛出pass异常
   * @param ex 需要捕获的异常
   */
  static disposeThrowPass(ex: Error) {
    if (ex.name === "PassException") {
      throw ex;
    }
    ErrorHelper.dispose(ex);
    throw ErrorHelper.passException();
  }

  /**
   * 异常处理.如果是"UserException"异常,则会直接弹出异常信息;否则会写入异常日志,并弹出"操作失败，请关闭重试！"
   * @param ex 异常对象
   */
  static dispose(ex: Error) {
    if (!ex) {
      return;
    }
    switch (ex.name) {
      case "PassException":
        return;

      case "BusinessException":
      case "UserException":
        switch ((ex as any).type) {
          case "ReferencedDataException":
            {
              let datas = (ex as any).referencedDatas;
              if (datas.length > 5) {
                datas[5] = "等";
              }
              ConsoleHelper.error(ex.message + "-被使用的数据：" + datas.join("，"));
            }
            break;
          default:
            // UI.Dialogs.warn(ex.message);
            ConsoleHelper.log(ex.message);
            break;
        }
        break;

      case "ClientDisposeException":
        // UI.Dialogs.warn(ex.message);
        ConsoleHelper.log(ex.message);
        if (ex["logout"]) {
          window.location.href = "index.html";
        }
        break;

      case "SystemException":
      case "AuthorizationException":
      case "OpenDBConnectionException":
        // UI.Dialogs.error(ex.message);
        ConsoleHelper.error(ex.message);
        break;

      case "Exception":
        Environment.__processError(ex);
        break;

      default:
        Environment.writeLog(LoggerLevelEnum.Error, ex);
        Environment.__processError(ex);
        break;
    }
  }
}
