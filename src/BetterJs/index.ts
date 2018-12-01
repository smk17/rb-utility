// import "whatwg-fetch";
import utils from "./utils";

export default class BetterJs {
  static init(options) {
    let defaultConfig = {
      jsError: true,
      resourceError: true,
      ajaxError: true,
      consoleError: true,
      scriptError: false, // 跨域js错误，默认不处理，因为没有任何信息
      autoReport: true,
      filters: [], // 过滤器，命中的不上报
      levels: ["info", "warning", "error"],
      category: ["js", "resource", "ajax"]
    };
    let config = utils.objectMerge(defaultConfig, options);

    if (!config.scriptError) {
      config.filters.push(function() {
        return /^Script error\.?$/.test(arguments[0]);
      });
    }

    // 处理过滤器
    let _oldSendError = config.sendError;
    config.sendError = function(title, msg, level, category, tags) {
      try {
        let that = this;
        let isFilter = config.filters.some(function(func) {
          return utils.isFunction(func) && func.apply(that, arguments);
        });
        if (isFilter) {
          return;
        }
        _oldSendError.apply(this, arguments);
        if (config.autoReport) {
          return;
        }
        // TODO ajax上报
      } catch (e) {
        _oldSendError({
          title: "BetterJs",
          msg: e,
          category: "js"
        });
      }
    };

    let _window =
      typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
          ? global
          : typeof self !== "undefined"
            ? self
            : {};
    let addEventListener = _window["addEventListener"] || _window["attachEvent"];
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
  }
}
