import Service from "./Service";
import {
  IServiceParams,
  IGetServiceParams,
  ISaveServiceParams,
  ServiceType
} from "./IServiceTypes";

/** 网络请求服务 */
export default class HttpService {

  /** 获取权限 */
  static getController<T>(host: string, params: IServiceParams) {
    return Service.executeService<T>(host, {
      name: "/service/controller/GetController?_ajax=1",
      params
    });
  }

  static GetIds(host: string) {
    return Service.executeService<string[]>(host, {
      name: "/service/data/GetIds?_ajax=1",
      params: { count: 1 }
    });
  }

  /** 获取页面数据 */
  static getPageData<T>(host: string, params: IGetServiceParams) {
    return Service.executeService<T>(host, {
      name: "/service/data/getpagedata?_ajax=1",
      params
    });
  }

  /** 保存页面数据 */
  static saveData<T>(host: string, params: ISaveServiceParams) {
    return Service.executeService<T>(host, {
      name: "/service/controller/execute?_ajax=1",
      params
    });
  }

  /** 执行控制器 */
  static executeController<T>(host: string, params: ISaveServiceParams) {
    return Service.executeService<T>(
      host,
      {
        name: "/service/controller/execute?_ajax=1",
        params
      },
      ServiceType.Post
    );
  }

}
