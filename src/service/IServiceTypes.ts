export interface ILoginResult {
  rights: { [key: string]: string };
  success: boolean;
}

export interface IServiceResult<T> {
  /** 数据 */
  data: T;
  /** 第几页 */
  pageIndex: number;
  /** 总数 */
  totalCount: number;
}

export interface IDataSourceExtraParam {
  /**
   * 字符串值
   * 1. 当以`script:`开头表示该字符串为脚本
   * 2. 当以`page:`开头表示该字符串为获取当前`url`中`search`区域的某一个值
   */
  value: string;
}

export interface IOrderDictionary {
  name: string;
  sortType: number;
}

export interface IServiceParams {
  id: string;
  pageAddress: {
    pageMode: number;
    pageId: string;
    moduleId: string;
    systemId: string;
  };
}

export interface IGetServiceParams extends IServiceParams {
  mode: number;
  attachParams?: object;
}

export interface ISaveServiceParams extends IServiceParams {
  params: object;
}
/**
 * 控制器请求对象
 */
export interface IControllerRequest {
  /**
   * 当前要请求的控制器id
   */
  id;
  /**
   * 调用参数
   */
  params;
}
/**
 * 要执行的服务信息
 */
export interface IServiceInfo {
  /**
   * 服务名称
   */
  name: string;
  /**
   * 服务参数
   */
  params: any;
  /**
   * 是否采用同步执行，默认为false
   */
  isSynch?: boolean;
  /**
   * 是否自己处理，默认为success
   */
  handlingErrorLevel?: boolean | number;
}

export class IDataInfo {
  /**
   * 数据id(1.系统数据源：系统id/数据源id；2.页面数据源：系统id/模块id/页面id/数据源id)
   */
  id;
  pageMode;
  mode;
  orderby;
  pageSize;
  pageIndex;
  params;
}
/** 服务请求类型 */
export enum ServiceType {
  Get = 1,
  Post
}
/**
 * 执行服务错误处理级别枚举
 */
export enum ServiceErrorLevelEnum {
  /**
   * 不处理任何异常
   */
  notHandling = 1,
  /**
   * 只处理所有请求过程中的环境异常
   */
  fail = 2,
  /**
   * 只处理所有后端反馈异常
   */
  error = 3,
  /**
   * 处理各种异常
   */
  allError = 4
}
