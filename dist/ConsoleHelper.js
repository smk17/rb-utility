/** console辅助工具 */
var ConsoleHelper = /** @class */ (function () {
    function ConsoleHelper() {
    }
    ConsoleHelper.log = function (data) {
        if (console) {
            console.log(data);
        }
    };
    ConsoleHelper.logDev = function (data, position) {
        if (console) {
            console.log(position, data);
            // window.baseConfig.development && console.log(data);
        }
    };
    ConsoleHelper.alert = function (data) {
        if (alert) {
            alert(data);
        }
    };
    ConsoleHelper.debug = function (data) {
        if (console) {
            console.debug(data);
        }
    };
    ConsoleHelper.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (console) {
            console.error.apply(console, data);
        }
    };
    return ConsoleHelper;
}());
export default ConsoleHelper;
//# sourceMappingURL=ConsoleHelper.js.map