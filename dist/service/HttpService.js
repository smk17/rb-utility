var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    HttpService._executeController = function (host, params) {
        return Service.executeService(host, {
            name: "/service/controller/execute?_ajax=1",
            params: params
        }, ServiceType.Post);
    };
    HttpService.executeController = function (host, params) {
        return __awaiter(this, void 0, void 0, function () {
            var get, save, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpService.getController(host, params)];
                    case 1:
                        get = _a.sent();
                        if (!get) return [3 /*break*/, 3];
                        return [4 /*yield*/, HttpService.executeController(host, params)];
                    case 2:
                        save = _a.sent();
                        return [2 /*return*/, save];
                    case 3:
                        error = new Error("你当前没有执行权限");
                        error.name = "NoPermissionException";
                        error["success"] = false;
                        throw error;
                }
            });
        });
    };
    return HttpService;
}());
export default HttpService;
//# sourceMappingURL=HttpService.js.map