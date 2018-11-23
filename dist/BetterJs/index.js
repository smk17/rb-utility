import "whatwg-fetch";
import utils from "./utils";
var BetterJs = /** @class */ (function () {
    function BetterJs() {
    }
    BetterJs.init = function (options) {
        var defaultConfig = {
            jsError: true,
            resourceError: true,
            ajaxError: true,
            consoleError: true,
            scriptError: false,
            autoReport: true,
            filters: [],
            levels: ["info", "warning", "error"],
            category: ["js", "resource", "ajax"]
        };
        var config = utils.objectMerge(defaultConfig, options);
        if (!config.scriptError) {
            config.filters.push(function () {
                return /^Script error\.?$/.test(arguments[0]);
            });
        }
        // 处理过滤器
        var _oldSendError = config.sendError;
        config.sendError = function (title, msg, level, category, tags) {
            try {
                var that_1 = this;
                var isFilter = config.filters.some(function (func) {
                    return utils.isFunction(func) && func.apply(that_1, arguments);
                });
                if (isFilter) {
                    return;
                }
                _oldSendError.apply(this, arguments);
                if (config.autoReport) {
                    return;
                }
                // TODO ajax上报
            }
            catch (e) {
                _oldSendError({
                    title: "BetterJs",
                    msg: e,
                    category: "js"
                });
            }
        };
        var _window = typeof window !== "undefined"
            ? window
            : typeof global !== "undefined"
                ? global
                : typeof self !== "undefined"
                    ? self
                    : {};
        var addEventListener = _window["addEventListener"] || _window["attachEvent"];
        if (config.jsError) {
            utils.handleWindowError(_window, config);
        }
        if (config.jsError) {
            // https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection
            utils.handleRejectPromise(_window, config);
        }
        if (config.resourceError && addEventListener) {
            utils.handleResourceError(_window, config);
        }
        if (config.ajaxError) {
            utils.handleAjaxError(_window, config);
        }
        if (config.consoleError) {
            utils.handleConsoleError(_window, config);
        }
    };
    return BetterJs;
}());
export default BetterJs;
//# sourceMappingURL=index.js.map