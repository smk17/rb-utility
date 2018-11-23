import { IServiceParams, IGetServiceParams, ISaveServiceParams } from "./IServiceTypes";
/** 网络请求服务 */
export default class HttpService {
    /** 获取权限 */
    static getController<T>(host: string, params: IServiceParams): Promise<T>;
    /** 生成一个UUID */
    static GetIds(host: string): Promise<string[]>;
    /** 获取页面数据 */
    static getPageData<T>(host: string, params: IGetServiceParams): Promise<T>;
    /** 保存页面数据 */
    static saveData<T>(host: string, params: ISaveServiceParams): Promise<T>;
    /** 执行控制器 */
    static executeController<T>(host: string, params: ISaveServiceParams): Promise<T>;
}
