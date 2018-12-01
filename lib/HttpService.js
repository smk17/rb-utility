var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ServiceHelper from "./ServiceHelper";
import { ServiceType } from "./IUtilityTypes";
/** 网络请求服务 */
export default class HttpService {
    /** 获取权限 */
    static getController(host, params) {
        return ServiceHelper.executeService(host, {
            name: "/service/controller/GetController?_ajax=1",
            params
        });
    }
    /** 生成一个UUID */
    static GetIds(host) {
        return ServiceHelper.executeService(host, {
            name: "/service/data/GetIds?_ajax=1",
            params: { count: 1 }
        });
    }
    /** 获取页面数据 */
    static getPageData(host, params) {
        return ServiceHelper.executeService(host, {
            name: "/service/data/getpagedata?_ajax=1",
            params
        });
    }
    /** 保存页面数据 */
    static saveData(host, params) {
        return ServiceHelper.executeService(host, {
            name: "/service/controller/execute?_ajax=1",
            params
        });
    }
    /** 执行控制器 */
    static _executeController(host, params) {
        return ServiceHelper.executeService(host, {
            name: "/service/controller/execute?_ajax=1",
            params
        }, ServiceType.Post);
    }
    static executeController(host, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const get = yield HttpService.getController(host, params);
            if (get) {
                const save = yield HttpService._executeController(host, params);
                return save;
            }
            return;
        });
    }
}
