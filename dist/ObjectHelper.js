import TypeHelper from "./TypeHelper";
/** 对象类型辅助工具 */
var ObjectHelper = /** @class */ (function () {
    function ObjectHelper() {
    }
    /** 对象深比较 */
    ObjectHelper.equals = function (x, y) {
        if (x === y)
            return true;
        // if both x and y are null or undefined and exactly the same
        if (!(x instanceof Object) || !(y instanceof Object))
            return false;
        // if they are not strictly equal, they both need to be Objects
        if (x.constructor !== y.constructor)
            return false;
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.
        for (var p in x) {
            if (!x.hasOwnProperty(p))
                continue;
            // other properties were tested using x.constructor === y.constructor
            if (!y.hasOwnProperty(p))
                return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined
            if (x[p] === y[p])
                continue;
            // if they have the same strict value or identity then they are equal
            if (typeof x[p] !== "object")
                return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (!ObjectHelper.equals(x[p], y[p]))
                return false;
            // Objects and Arrays must be tested recursively
        }
        for (var p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    };
    ObjectHelper.map = function (obj, callback) {
        var i, result = [];
        if (obj) {
            if (TypeHelper.isArray(obj)) {
                for (i = 0; i < obj.length; i++) {
                    result.push(callback(obj[i], i));
                }
            }
            else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        result.push(callback(obj[i], i));
                    }
                }
            }
        }
        return result;
    };
    return ObjectHelper;
}());
export default ObjectHelper;
//# sourceMappingURL=ObjectHelper.js.map