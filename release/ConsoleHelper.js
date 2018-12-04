/** console辅助工具 */
var ConsoleHelper = /** @class */ (function () {
    function ConsoleHelper() {
    }
    ConsoleHelper.log = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (console && ConsoleHelper.development) {
            console.log.apply(console, data);
        }
    };
    ConsoleHelper.alert = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (alert && ConsoleHelper.development) {
            alert.apply(void 0, data);
        }
    };
    ConsoleHelper.debug = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (console && ConsoleHelper.development) {
            console.debug.apply(console, data);
        }
    };
    ConsoleHelper.warn = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (console && ConsoleHelper.development) {
            console.warn.apply(console, data);
        }
    };
    ConsoleHelper.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (console && ConsoleHelper.development) {
            console.error.apply(console, data);
        }
    };
    ConsoleHelper.development = true;
    return ConsoleHelper;
}());
export default ConsoleHelper;
