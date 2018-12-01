import "whatwg-fetch";
import { IServiceInfo, ServiceType } from "./IUtilityTypes";
export default class ServiceHelper {
    /** 数据请求失败时重新请求的次数 */
    static RELOADCOUNT: number;
    /** 数据超时时间 */
    static TIMEOUT: number;
    private static _toParamString;
    /**
     * 异常处理.如果是 `UserException` 异常,则会直接弹出异常信息;否则会写入异常日志,并弹出 `操作失败，请关闭重试！`
     * @param ex 异常对象
     */
    private static _dispose;
    /**
     * 执行指定的服务
     * @param service 要执行的服务
     */
    /**
     * 执行指定的服务
     * @param service 要执行的服务
     */
    private static _executeService;
    /**
     * 写日志
     * 把日志数据上传到服务器
     * @param data 日志数据
     */
    static writeLog(data: any): Promise<void>;
    /**
     * 执行指定的服务
     * @param service 要执行的服务
     * @param type 服务的类型
     */
    static executeService<T>(host: string, service: IServiceInfo, type?: ServiceType): Promise<T>;
}
//# sourceMappingURL=ServiceHelper.d.ts.map