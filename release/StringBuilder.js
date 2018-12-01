import TypeHelper from "./TypeHelper";
import StringHelper from "./StringHelper";
/**
 * 字符串构建器
 */
var StringBuilder = /** @class */ (function () {
    function StringBuilder() {
        this._parts = [];
    }
    /**
     * 往对象后面追加指定的文本
     * @param 要追加的文本
     * @returns 返回StringBuilder对象
     */
    StringBuilder.prototype.append = function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        for (var _a = 0, text_1 = text; _a < text_1.length; _a++) {
            var v = text_1[_a];
            if (v !== null && v !== undefined) {
                if (!TypeHelper.isString(v)) {
                    v = v.toString();
                }
                this._parts.push(v);
            }
        }
        return this;
    };
    /**
     * 将指定的 String 中的格式项替换为指定的args实例的值的文本等效项，并添加到字符串缓冲对象中
     * @param format 符合格式字符串
     * @param args 要格式化的对象
     * @returns 返回StringBuilder对象
     */
    StringBuilder.prototype.appendFormat = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._parts.push(StringHelper.format(format, args));
        return this;
    };
    /**
     * 往对象后面追加一行指定的文本，会在最后加一个制表和换行符
     * @param text 要追加的文本，如果没有指定值，则只追加制表和换行符
     * @returns 返回StringBuilder对象
     */
    StringBuilder.prototype.appendLine = function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        for (var _a = 0, text_2 = text; _a < text_2.length; _a++) {
            var v = text_2[_a];
            if (v !== null && v !== undefined) {
                if (!TypeHelper.isString(v)) {
                    v = v.toString();
                }
                this._parts.push(v);
            }
        }
        this._parts.push("\r\n");
        return this;
    };
    /**
     * 清除当前对象中的所有内容
     * @returns 返回StringBuilder对象
     */
    StringBuilder.prototype.clear = function () {
        this._parts = [];
        return this;
    };
    /**
     * 判断当前对象是否为空
     * @returns 如果为空则返回true，否则返回false
     */
    StringBuilder.prototype.isEmpty = function () {
        if (this._parts.length === 0) {
            return true;
        }
        for (var i = this._parts.length - 1; i >= 0; i--) {
            if (this._parts[i].length > 0) {
                return false;
            }
        }
        return true;
    };
    /**
     * 返回当前对象中存储的所有字符串内容
     * @param separator 在每次添加的字符串之间要添加的分隔符
     * @returns 返回的字符串对象
     */
    StringBuilder.prototype.toString = function (separator) {
        return this._parts.join(arguments.length > 0 ? separator : "");
    };
    return StringBuilder;
}());
export default StringBuilder;
