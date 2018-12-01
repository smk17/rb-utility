// import "whatwg-fetch";
import JsonHelper from "../JsonHelper";
let _oldWindowError = null;
let windowError = null;
function isFunction(what) {
    return typeof what === "function";
}
function isUndefined(what) {
    return what === void 0;
}
function hasKey(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
function each(obj, callback) {
    let i, j;
    if (isUndefined(obj.length)) {
        for (i in obj) {
            if (hasKey(obj, i)) {
                callback.call(null, i, obj[i]);
            }
        }
    }
    else {
        j = obj.length;
        if (j) {
            for (i = 0; i < j; i++) {
                callback.call(null, i, obj[i]);
            }
        }
    }
}
function objectMerge(obj1, obj2) {
    if (!obj2) {
        return obj1;
    }
    each(obj2, function (key, value) {
        obj1[key] = value;
    });
    return obj1;
}
let handleWindowError = function (_window, config) {
    _oldWindowError = _window.onerror;
    _window.onerror = function (msg, url, line, col, error) {
        if (error && error.stack) {
            config.sendError({
                title: msg,
                msg: error.stack,
                category: "js",
                level: "error"
            });
        }
        else if (typeof msg === "string") {
            config.sendError({
                title: msg,
                msg: JsonHelper.toJson({
                    resourceUrl: url,
                    rowNum: line,
                    colNum: col
                }),
                category: "js",
                level: "error"
            });
        }
        if (_oldWindowError && isFunction(_oldWindowError)) {
            if (windowError)
                windowError.apply(window, arguments);
        }
    };
};
let handleRejectPromise = function (_window, config) {
    _window.addEventListener("unhandledrejection", function (event) {
        if (event) {
            let reason = event.reason;
            config.sendError({
                title: "unhandledrejection",
                msg: reason,
                category: "js",
                level: "error"
            });
        }
    }, true);
};
let handleResourceError = function (_window, config) {
    _window.addEventListener("error", function (event) {
        if (event) {
            let target = event.target || event.srcElement;
            let isElementTarget = target instanceof HTMLScriptElement ||
                target instanceof HTMLLinkElement ||
                target instanceof HTMLImageElement;
            if (!isElementTarget)
                return; // js error不再处理
            let url = target.src || target.href;
            config.sendError({
                title: target.nodeName,
                msg: url,
                category: "resource",
                level: "error"
            });
        }
    }, true);
};
let _handleFetchError = function (_window, config) {
    if (!_window.fetch)
        return;
    let _oldFetch = _window.fetch;
    _window.fetch = function () {
        return _oldFetch
            .apply(this, arguments)
            .then(function (res) {
            if (!res.ok) {
                // True if status is HTTP 2xx
                config.sendError({
                    title: arguments[0],
                    msg: JsonHelper.toJson(res),
                    category: "ajax",
                    level: "error"
                });
            }
            return res;
        })
            .catch(function (error) {
            config.sendError({
                title: arguments[0],
                msg: JsonHelper.toJson({
                    message: error.message,
                    stack: error.stack
                }),
                category: "ajax",
                level: "error"
            });
            throw error;
        });
    };
};
let handleAjaxError = function (_window, config) {
    let protocol = _window.location.protocol;
    if (protocol === "file:")
        return;
    // 处理fetch
    _handleFetchError(_window, config);
    // 处理XMLHttpRequest
    if (!_window.XMLHttpRequest) {
        return;
    }
    let xmlhttp = _window.XMLHttpRequest;
    let _oldSend = xmlhttp.prototype.send;
    let _handleEvent = function (event) {
        if (event && event.currentTarget && event.currentTarget.status !== 200) {
            config.sendError({
                title: event.target.responseURL,
                msg: JsonHelper.toJson({
                    response: event.target.response,
                    responseURL: event.target.responseURL,
                    status: event.target.status,
                    statusText: event.target.statusText
                }),
                category: "ajax",
                level: "error"
            });
        }
    };
    xmlhttp.prototype.send = function () {
        if (this["addEventListener"]) {
            this["addEventListener"]("error", _handleEvent);
            this["addEventListener"]("load", _handleEvent);
            this["addEventListener"]("abort", _handleEvent);
        }
        else {
            let _oldStateChange = this["onreadystatechange"];
            this["onreadystatechange"] = function (event) {
                if (this.readyState === 4) {
                    _handleEvent(event);
                }
                if (_oldStateChange)
                    _oldStateChange.apply(this, arguments);
            };
        }
        return _oldSend.apply(this, arguments);
    };
};
let handleConsoleError = function (_window, config) {
    if (!_window.console || !_window.console.error)
        return;
    let _oldConsoleError = _window.console.error;
    _window.console.error = function () {
        config.sendError({
            title: "consoleError",
            msg: JsonHelper.toJson(arguments),
            category: "js",
            level: "error"
        });
        if (_oldConsoleError)
            _oldConsoleError.apply(_window, arguments);
    };
};
export default {
    isFunction,
    objectMerge,
    handleWindowError,
    handleRejectPromise,
    handleConsoleError,
    handleResourceError,
    handleAjaxError
};
