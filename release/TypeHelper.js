/**
 * 类型辅助工具
 */
var TypeHelper = /** @class */ (function () {
    function TypeHelper() {
    }
    /**
     * 判断指定的值是否为数值型对象
     * @param obj 进行判断的值对象
     * @returns 如果是数值型，返回true；否则返回false。
     */
    TypeHelper.isNumber = function (obj) {
        return typeof obj === "number";
    };
    /**
     * 判断指定的值是否为数值型对象
     * @param obj 进行判断的值对象
     * @returns 如果是数值型，返回true；否则返回false。
     */
    TypeHelper.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
    /**
     * 判断指定变量是否为整型型
     * @param obj 进行判断的值对象
     * @returns 如果是整数型，返回true；否则返回false。
     */
    TypeHelper.isInteger = function (obj) {
        return typeof obj === "number" && obj % 1 === 0;
    };
    /**
     * 判断指定变量是否为布尔型
     * @param obj 进行判断的变量
     * @returns 如果是布尔型，返回true；否则返回false。
     */
    TypeHelper.isBoolean = function (obj) {
        return typeof obj === "boolean";
    };
    /**
     * 判断指定的值是否为字符串对象
     * @param obj 进行判断的值对象
     * @returns 如果是字符串型，返回true；否则返回false。
     */
    TypeHelper.isString = function (obj) {
        return typeof obj === "string";
    };
    /**
     * 判断指定变量是否为函数或自定义类型
     * @param obj 进行判断的变量
     * @returns 如果是函数，返回true；否则返回false。
     */
    TypeHelper.isFunction = function (obj) {
        return typeof obj === "function";
    };
    /**
     * 判断指定变量是否为日期类型
     * @param obj 进行判断的值对象
     * @returns 如果是日期型，返回true；否则返回false。
     */
    TypeHelper.isDate = function (obj) {
        return obj && obj.constructor === Date;
    };
    /**
     * 判断当前指定变量是否为Error类型
     * @param obj 进行判断的值对象
     * @returns 如果是Error，返回true；否则返回false。
     */
    TypeHelper.isError = function (obj) {
        return obj && obj.constructor === Error;
    };
    /**
     * 判断指定的对象是否由指定的类型构造
     * @param obj
     * @param type
     * @returns 如果是从指定类型构造，返回true；否则返回false。
     */
    TypeHelper.isType = function (obj, type) {
        if (obj === null || obj === undefined) {
            return true;
        }
        switch (typeof obj) {
            case "function":
                return type === Function;
            case "boolean":
                return type === Boolean;
            case "string":
                return type === String;
            case "number":
                return type === Number;
            case "symbol":
                return type === Symbol;
            default:
                return obj instanceof type;
        }
    };
    /**
     * 判断指定的对象是否为文档元素
     * @param obj 进行判断的值对象
     * @returns 如果是Dom对象，返回true；否则返回false。
     */
    TypeHelper.isDomElement = function (obj) {
        if (!obj) {
            return false;
        }
        var val = false;
        if (typeof obj.nodeType !== "number") {
            var doc = obj.ownerDocument || obj.document || obj;
            if (doc !== obj) {
                var w = doc.defaultView || doc.parentWindow;
                val = w !== obj;
            }
            else {
                val = !doc.body || !TypeHelper.isDomElement(doc.body);
            }
        }
        return !val;
    };
    /**
     * 深度克隆
     * @param obj
     */
    TypeHelper.clone = function (obj) {
        if (obj) {
            if (obj.clone) {
                return obj.clone();
            }
            switch (typeof obj) {
                case "number":
                case "string":
                case "boolean":
                case "function":
                case "symbol":
                    return obj;
                default: {
                    var result = {}, na = void 0;
                    for (na in obj) {
                        if (obj.hasOwnProperty(na)) {
                            result[na] = TypeHelper.clone(obj[na]);
                        }
                    }
                    return result;
                }
            }
        }
        return obj;
    };
    return TypeHelper;
}());
export default TypeHelper;
