/**
 * 异常错误对象
 */
export default class ErrorHelper {
    /**
     * 打印异常信息
     * @param e 服务端异常对象
     * @param sb
     */
    private static __printExceptionTo(e, sb);
    /**
     * 打印异常信息
     * @param e 服务端异常对象
     */
    static __printException(e: Error): string;
    /**
     * 创建参数异常对象
     * @param kind 参数异常类型
     * @param paramName 参数名称
     * @param message 异常消息
     * @returns 返回Error对象
     */
    private static _errorArgument(kind, paramName, message);
    /**
     * 创建异常对象
     * @param kind 异常类型
     * @param message 异常消息
     * @returns 返回Error对象
     */
    private static _error(kind, message);
    /**
     * 创建一个Error对象
     * @param name 异常名称
     * @param message 错误消息
     * @param stack 堆栈信息
     * @param innerException 内部错误对象
     * @param data 错误的具体信息.默认为null
     * @returns 返回Error对象
     */
    static create(name: string, message: string, stack?: string, innerException?: any, data?: any): Error;
    /**
     * 创建一个参数错误异常
     * @param paramName 参数名称
     * @param message 异常消息
     * @returns 返回一个ArgumentException异常对象
     */
    static argument(paramName: string, message?: string): Error;
    /**
     * 创建一个空值参数异常对象
     * @param paramName 参数名称
     * @param message 异常消息
     * @returns 返回一个ArgumentNullException异常对象
     */
    static argumentNull(paramName: string, message?: string): Error;
    /**
     * 创建一个参数值超出运行范围的异常对象
     * @param paramName 参数名称
     * @param actualValue 该参数的实际值.默认为null
     * @param message 异常具体消息
     * @returns 返回一个ArgumentOutOfRangeException异常对
     */
    static argumentOutOfRange(paramName: string, actualValue?: any, message?: string): Error;
    /**
     * 创建一个参数未定义的异常
     * @param paramName 参数名称
     * @param message 错误的消息
     * @returns 返回一个ArgumentUndefinedException异常对象
     */
    static argumentUndefined(paramName: string, message?: string): Error;
    /**
     * 创建一个格式错误的异常
     * @param message 错误的消息
     * @returns 返回一个FormatException异常对象
     */
    static format(message?: string): Error;
    /**
     * 创建无效操作异常
     * @param message 错误的消息
     * @returns 返回一个InvalidOperationException异常对象
     */
    static invalidOperation(message?: string): Error;
    /**
     * 创建一个没有实现的异常
     * @param message 错误的消息
     * @returns 返回一个NotImplementedException异常对象
     */
    static notImplemented(message?: string): Error;
    /**
     * 创建一个没有实现的异常
     * @param message 错误的消息
     * @returns 返回一个NotImplementedException异常对象
     */
    static notSupported(message?: string): Error;
    /**
     * 创建一个参数个数异常
     * @param message 错误的消息
     * @returns 返回一个ParameterCountException异常对象
     */
    static parameterCount(message?: string): Error;
    /**
     * 创建一个配置异常
     * @param message 错误的消息
     * @returns 返回一个ConfigException异常对象
     */
    static configException(message?: string): Error;
    /**
     * 创建一个配置异常
     * @returns 返回一个SystemException异常对象
     */
    static systemException(message?: string): Error;
    /**
     * 创建一个用户提示异常
     * @returns 返回一个UserException异常对象
     */
    static userException(message: string): Error;
    /**
     * 创建一个忽略后续操作异常
     * @returns 返回一个PassException异常对象
     */
    static passException(): Error;
    /**
     * 判断一个异常对象是否为一个pass异常
     * @param ex 需要判断的异常
     */
    static isPassException(ex: Error): boolean;
    /**
     * 捕获所有的异常,并抛出pass异常
     * @param ex 需要捕获的异常
     */
    static disposeThrowPass(ex: Error): void;
    /**
     * 异常处理.如果是"UserException"异常,则会直接弹出异常信息;否则会写入异常日志,并弹出"操作失败，请关闭重试！"
     * @param ex 异常对象
     */
    static dispose(ex: Error): void;
}
