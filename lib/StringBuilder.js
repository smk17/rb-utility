import TypeHelper from "./TypeHelper";
import StringHelper from "./StringHelper";
/**
 * 字符串构建器
 */
export default class StringBuilder {
    constructor() {
        this._parts = [];
    }
    /**
     * 往对象后面追加指定的文本
     * @param 要追加的文本
     * @returns 返回StringBuilder对象
     */
    append(...text) {
        for (let v of text) {
            if (v !== null && v !== undefined) {
                if (!TypeHelper.isString(v)) {
                    v = v.toString();
                }
                this._parts.push(v);
            }
        }
        return this;
    }
    /**
     * 将指定的 String 中的格式项替换为指定的args实例的值的文本等效项，并添加到字符串缓冲对象中
     * @param format 符合格式字符串
     * @param args 要格式化的对象
     * @returns 返回StringBuilder对象
     */
    appendFormat(format, ...args) {
        this._parts.push(StringHelper.format(format, args));
        return this;
    }
    /**
     * 往对象后面追加一行指定的文本，会在最后加一个制表和换行符
     * @param text 要追加的文本，如果没有指定值，则只追加制表和换行符
     * @returns 返回StringBuilder对象
     */
    appendLine(...text) {
        for (let v of text) {
            if (v !== null && v !== undefined) {
                if (!TypeHelper.isString(v)) {
                    v = v.toString();
                }
                this._parts.push(v);
            }
        }
        this._parts.push("\r\n");
        return this;
    }
    /**
     * 清除当前对象中的所有内容
     * @returns 返回StringBuilder对象
     */
    clear() {
        this._parts = [];
        return this;
    }
    /**
     * 判断当前对象是否为空
     * @returns 如果为空则返回true，否则返回false
     */
    isEmpty() {
        if (this._parts.length === 0) {
            return true;
        }
        for (let i = this._parts.length - 1; i >= 0; i--) {
            if (this._parts[i].length > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * 返回当前对象中存储的所有字符串内容
     * @param separator 在每次添加的字符串之间要添加的分隔符
     * @returns 返回的字符串对象
     */
    toString(separator) {
        return this._parts.join(arguments.length > 0 ? separator : "");
    }
}
