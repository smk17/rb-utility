import Service from "./Service";
import { ServiceType } from "./IServiceTypes";
/** 网络请求服务 */
var HttpService = /** @class */ (function () {
    function HttpService() {
    }
    /** 获取权限 */
    HttpService.getController = function (host, params) {
        return Service.executeService(host, {
            name: "/service/controller/GetController?_ajax=1",
            params: params
        });
    };
    /** 生成一个UUID */
    HttpService.GetIds = function (host) {
        return Service.executeService(host, {
            name: "/service/data/GetIds?_ajax=1",
            params: { count: 1 }
        });
    };
    /** 获取页面数据 */
    HttpService.getPageData = function (host, params) {
        return Service.executeService(host, {
            name: "/service/data/getpagedata?_ajax=1",
            params: params
        });
    };
    /** 保存页面数据 */
    HttpService.saveData = function (host, params) {
        return Service.executeService(host, {
            name: "/service/controller/execute?_ajax=1",
            params: params
        });
    };
    /** 执行控制器 */
    HttpService.executeController = function (host, params) {
        return Service.executeService(host, {
            name: "/service/controller/execute?_ajax=1",
            params: params
        }, ServiceType.Post);
    };
    return HttpService;
}());
export default HttpService;
//# sourceMappingURL=HttpService.js.map