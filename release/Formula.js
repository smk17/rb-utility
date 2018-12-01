import NumberHelper from "./NumberHelper";
import ErrorHelper from "./ErrorHelper";
import TypeHelper from "./TypeHelper";
/**
 * 公式所使用的数据管理对象
 */
class DataManager {
    /**
     * 创建 公式所使用的数据管理对象
     * @param data 原始数据对象
     * @param addition 附加数据
     */
    constructor(data, addition) {
        this._data = data;
        if (addition) {
            this._addition = addition;
        }
    }
    /**
     * 获取指定名称对应的值
     * @param {string} name 要获取的值的名称
     * @returns 返回对应的数值型值
     */
    getValue(name) {
        let val = this._data[name];
        if (val === undefined && this._addition) {
            val = this._addition[name];
        }
        return NumberHelper.parse(val);
    }
}
/**
 * 公式对象
 */
export default class Formula {
    /**
     * 公式对象
     * @param formula 字符串形式的公式表达式
     * @param decimal 计算后的保留位
     */
    constructor(formula, decimal = 2) {
        let partake = [];
        if (!TypeHelper.isNumber(decimal)) {
            decimal = 2;
        }
        else if (decimal < 0) {
            decimal = 0;
        }
        this._fn = new Function("data", "NumberHelper", "return NumberHelper.round(" +
            Formula._replaceSymbel(formula).replace(Formula._formulaRegular, (s, v1, v2) => {
                if (partake.indexOf(v2) < 0) {
                    partake.push(v2);
                }
                return v1 ? v1 + 'data.getValue("' + v2 + '")' : 'data.getValue("' + v2 + '")';
            }) +
            "," +
            decimal +
            ")");
        this._partake = partake;
    }
    static _getFormulaValue(formula, start, priority) {
        let c, i, l = formula.length, bracketCount = 0, value = "", bracketStart = -1, valueInfo, quotation;
        for (i = start; i < l; i++) {
            c = formula.charAt(i);
            if (quotation) {
                if (quotation === c) {
                    quotation = null;
                }
                continue;
            }
            switch (c) {
                case "(":
                    bracketCount++;
                    if (bracketCount === 1) {
                        bracketStart = i;
                        value += formula.substring(start, i + 1);
                    }
                    break;
                case ")":
                    bracketCount--;
                    if (bracketCount < 0) {
                        throw ErrorHelper.create("FormulaInvalid", "当前提供的公式字符串无效。");
                    }
                    else if (bracketCount === 0) {
                        value += Formula._replaceSymbel(formula.substring(bracketStart + 1, i)) + ")";
                        start = i + 1;
                    }
                    break;
                case "+":
                case "-":
                    if (bracketCount === 0) {
                        if (start < i) {
                            value += formula.substring(start, i);
                        }
                        return { value: value.trim(), nextIndex: i + 1, symbolValue: c };
                    }
                    break;
                case "*":
                case "/":
                    if (bracketCount === 0) {
                        if (start < i) {
                            value += formula.substring(start, i);
                        }
                        if (priority === 1) {
                            return { value: value.trim(), nextIndex: i + 1, symbolValue: c };
                        }
                        else {
                            valueInfo = Formula._getFormulaValue(formula, i + 1, 1);
                            value =
                                "NumberHelper.calculate(" + value.trim() + "," + valueInfo.value + ",'" + c + "')";
                            return {
                                value: value.trim(),
                                nextIndex: valueInfo.nextIndex,
                                symbolValue: valueInfo.symbol
                            };
                        }
                    }
                    break;
                case ",":
                    if (bracketCount === 0) {
                        if (start < i) {
                            value += formula.substring(start, i);
                        }
                        return { value: value.trim(), nextIndex: i + 1, symbolValue: c };
                    }
                    break;
                case '"':
                case "'":
                    quotation = c;
                    break;
                case " ":
                    if (start === i) {
                        start++;
                    }
                    break;
            }
        }
        if (start < l) {
            value += formula.substr(start);
        }
        return { value: value.trim(), nextIndex: l };
    }
    static _replaceSymbel(formula) {
        formula = formula.trim();
        if (!formula) {
            return "";
        }
        let l = formula.length, valueInfo = Formula._getFormulaValue(formula, 0, 1), symbolValue, newFormula;
        if (valueInfo.nextIndex === l) {
            return valueInfo.value;
        }
        newFormula = valueInfo.value;
        do {
            symbolValue = valueInfo.symbolValue;
            if (symbolValue === ",") {
                return newFormula + "," + Formula._replaceSymbel(formula.substr(valueInfo.nextIndex));
            }
            else {
                valueInfo = Formula._getFormulaValue(formula, valueInfo.nextIndex, symbolValue === "+" || symbolValue === "-" ? 0 : 1);
                newFormula = "NumberHelper.calculate(" + newFormula + ",";
                newFormula += valueInfo.value + ",'" + symbolValue + "')";
            }
        } while (valueInfo.nextIndex < l);
        return newFormula;
    }
    /**
     * 用指定的数据进行公式计算
     * @param data 主要数据
     * @param addition 附加数据。当主要数据中不存在指定的数据时，从附加数据中获取
     * @returns 返回计算结果
     */
    calc(data, addition) {
        return this._fn(new DataManager(data, addition), NumberHelper);
    }
    /**
     * 获取依赖信息
     */
    getPartake() {
        return this._partake;
    }
}
Formula._formulaRegular = new RegExp("([^a-zA-Z0-9]|^)data.([a-zA-Z0-9_]+)", "g");
