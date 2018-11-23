import ErrorHelper from "./ErrorHelper";
/**
 * 字符串帮助对象
 */
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.__format = function (format, args) {
        var i = 0, result = "", l = format.length, open, close, argNumber, arg;
        if (arguments.length === 1) {
            return format;
        }
        while (i < l) {
            open = format.indexOf("{", i);
            close = format.indexOf("}", i);
            if (open < 0) {
                if (close < 0) {
                    result += format.slice(i);
                    break;
                }
                if (format.charAt(close + 1) !== "}") {
                    throw ErrorHelper.argument("format", "字符串格式存在孤立的'{'或'}'符号。");
                }
                result += format.substring(i, close + 1);
                i = close + 2;
                continue;
            }
            if (format.charAt(open + 1) === "{") {
                result += format.substring(i, open + 1);
                i = open + 2;
                continue;
            }
            if (close < 0) {
                throw ErrorHelper.argument("format", "字符串格式存在孤立的'{'或'}'符号。");
            }
            if (open > close) {
                if (format.charAt(close + 1) !== "}") {
                    throw ErrorHelper.argument("format", "字符串格式存在孤立的'{'或'}'符号。");
                }
                result += format.substring(i, close + 1);
                i = close + 2;
                continue;
            }
            if (open + 1 === close) {
                throw ErrorHelper.argument("format", "字符串格式存在孤立的'{'或'}'符号。");
            }
            argNumber = parseInt(format.substring(open + 1, close), 10);
            if (isNaN(argNumber)) {
                throw ErrorHelper.argument("format", "字符串格式'{'与'}'之间包含的字符不是数字。");
            }
            if (open > i) {
                result += format.substring(i, open);
            }
            arg = args[argNumber];
            if (arg !== undefined && arg !== null) {
                result += arg.toString();
            }
            i = close + 1;
        }
        return result;
    };
    /**
     * 将指定的 String 中的格式项替换为指定的args实例的值的文本等效项
     * @param format 符合格式字符串
     * @param args 要替换的参数值
     * @returns format 的一个副本，其中的第一个格式项已替换为 args 的 String 等效项
     */
    StringHelper.format = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return StringHelper.__format(format, args);
    };
    return StringHelper;
}());
export default StringHelper;
//# sourceMappingURL=StringHelper.js.map