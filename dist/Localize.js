import StringHelper from "./StringHelper";
/**
 * 本地化
 */
var Localize = /** @class */ (function () {
    function Localize() {
    }
    /**
     * 将开发语言转换成本地语言
     * @param key 开发语言
     * @param args 替换参数
     * @returns 返回本地化语言
     */
    Localize.platformTo = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length > 0) {
            return StringHelper.format(key, args);
        }
        else {
            return key;
        }
    };
    /**
     * 将开发语言转换成本地语言
     * @param key 开发语言
     * @param args 替换参数
     * @returns 返回本地化语言
     */
    Localize.to = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length > 0) {
            return StringHelper.format(key, args);
        }
        else {
            return key;
        }
    };
    return Localize;
}());
export default Localize;
//# sourceMappingURL=Localize.js.map