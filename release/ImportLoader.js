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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
/**
 * 引入外部js辅助类
 */
var ImportLoader = /** @class */ (function () {
    /**
     * 初始化 ImportLoader
     * @param url 要引入的外部js文件
     * @param id 脚本ID，防止重复加载
     * @param protocol
     */
    function ImportLoader(url, id, protocol) {
        if (id === void 0) { id = ""; }
        this.protocol = "";
        this.url = url;
        this.id = id;
        if (this.url.indexOf("//") === 0) {
            this.protocol = protocol || window.location.protocol;
            if (this.protocol.indexOf(":") === -1) {
                this.protocol += ":";
            }
        }
    }
    ImportLoader.prototype.buildScriptTag = function (src, id) {
        var script = document.createElement("script");
        if (id)
            script.id = id;
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = src;
        return script;
    };
    ImportLoader.prototype.getScriptPromise = function (src, id) {
        var script = this.buildScriptTag(src, id);
        var p = new Promise(function (resolve) {
            script.onload = function () {
                resolve(this);
            };
        });
        document.body.appendChild(script);
        return p;
    };
    ImportLoader.prototype.getMainPromise = function () {
        return this.getScriptPromise("" + this.protocol + this.url, this.id);
    };
    /** 加载外部js文件 */
    ImportLoader.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof window === "undefined") {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, this.getMainPromise()];
            });
        });
    };
    /** 加载外部 AMD 具备默认导出的 js文件 */
    ImportLoader.prototype.loadDefault = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (typeof window === "undefined") {
                    return [2 /*return*/, null];
                }
                if (window["require"]) {
                    return [2 /*return*/, new Promise(function (resolve, rejct) {
                            window["require"](["" + _this.protocol + _this.url], function (result) {
                                if (result) {
                                    resolve(result.default);
                                }
                                else {
                                    resolve(result);
                                }
                            }, function (error) {
                                rejct(error);
                            });
                        })];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    return ImportLoader;
}());
export default ImportLoader;
