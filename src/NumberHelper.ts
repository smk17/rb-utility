import ErrorHelper from "./ErrorHelper";
import TypeHelper from "./TypeHelper";

/**
 * 数值帮助类
 */
export default class NumberHelper {
  /**
   * 将可以表示为数值的字符串转变成数值对象
   * @param value 字符串型数值变量
   */
  static parse(value: number | string): number {
    if (!value) {
      return 0;
    }
    switch (typeof value) {
      case "number":
        return Number(value);
      case "string":
        value = (value as string).replace(/,/g, "");
        if ((value as string).indexOf(".") >= 0) {
          return parseFloat(value);
        } else {
          return parseInt(value, 10);
        }
      default:
        throw ErrorHelper.argument("value", "值必须是字符串或者数值。");
    }
  }

  private static _eRegExp = /^(e)(\d*)$/i;
  private static _clearRegExp = /[^0#]/g;
  private static _zeroRegex = /(,)|([0|.]*$)/g;

  private static _isNumberFormat(format) {
    return format.indexOf("0") !== -1 || format.indexOf("#") !== -1;
  }

  private static _getNumberFormat(format) {
    if (!format) return null;
    let begin = format.indexOf("0");
    let begin2 = format.indexOf("#");
    if (begin === -1 || (begin2 !== -1 && begin2 < begin)) begin = begin2;
    if (begin < 0) {
      return null;
    }

    let end = format.lastIndexOf("0");
    let end2 = format.lastIndexOf("#");
    if (end === -1 || (end2 !== -1 && end2 > end)) end = end2;

    let digits = format.lastIndexOf(".");
    digits > 0 ? (digits = end === end2 ? 6 : end - digits) : (digits = 0);

    return { begin, end, digits, format: format.substring(begin, end + 1) };
  }

  private static _pad(value: string, digits: number, end?: boolean) {
    let n = digits - value.length;
    if (n > 0) {
      let zeros = "";
      while (n) {
        n -= 1;
        zeros += "0";
      }
      return end ? value + zeros : zeros + value;
    }

    return value;
  }

  private static _doFormatNumber(value, format) {
    value = Math.abs(value);

    let isGroup = format.indexOf(",") !== -1,
      formats = format.split("."),
      format0 = (formats[0] || "").replace(NumberHelper._clearRegExp, ""),
      format1 = (formats[1] || "").replace(NumberHelper._clearRegExp, ""),
      result = "";

    let index = format0.indexOf("0");
    format0 = index === -1 ? "0" : format0.substr(index) || "0";

    let decimals = format1.length;
    let decimalPlaces = format1.substr(0, format1.lastIndexOf("0") + 1).length;
    value = NumberHelper.round(value, decimals);
    let values = String(value).split("."),
      value0 = values[0],
      value1 = values[1] || "";
    if (value0) {
      value0 = NumberHelper._pad(value0, format0.length);

      if (isGroup) {
        for (let i = 0; i < Math.floor((value0.length - (1 + i)) / 3); i++) {
          value0 =
            value0.substring(0, value0.length - (4 * i + 3)) +
            "," +
            value0.substring(value0.length - (4 * i + 3));
        }
      }
      result += value0;
    }

    if (decimals > 0) {
      result += ".";
      result += NumberHelper._pad(value1.substr(0, decimals), decimalPlaces, true);
    }

    return result;
  }

  /**
   * 对指定的数值型四舍五入到指定的精度范围内
   * @param value 要进行精度处理的数值
   * @param decimal 要保留的精度值(小数位).默认为0
   * @returns 返回处理后的值
   */
  static round(value: number, decimal: number = 0): number {
    if (isNaN(value)) {
      return 0;
    }
    if (!TypeHelper.isNumber(decimal)) {
      decimal = 0;
    } else if (decimal < 0) {
      decimal = 0;
    }
    let negative;
    if (value < 0) {
      negative = true;
      value = 0 - value;
    }
    if (decimal === 0) {
      value = Math.round(value);
    } else {
      let rate = Math.pow(10, decimal);
      value *= rate;
      value = Math.round(value);
      value /= rate;
    }
    return negative ? 0 - value : value;
  }

  /**
   * 对指定的数值型保留到指定的精度范围内，且不进行四舍五入
   * @param value 要进行精度处理的数值
   * @param decimal 要保留的精度值(小数位).默认为0
   * @returns 返回处理后的值
   */
  static unround(value: number, decimal: number = 0): number {
    let index;
    if (isNaN(value)) {
      return 0;
    }
    decimal = decimal || 0;
    if (value === 0) {
      return 0;
    } else {
      let sVal = value.toString();
      index = sVal.indexOf(".");
      if (decimal + index < sVal.length) {
        return value;
      } else {
        return parseFloat(sVal.substr(0, index + decimal));
      }
    }
  }

  /**
   * 对指定的2个数进行指定的算术运算
   * @param left 左操作数
   * @param right 右操作数
   * @param op 运算类型。可以是('+','-','*','/')其中的一个
   * @param decimal 要保留的小数位。可以是0－6范围内的整型，含0和6。默认为6
   * @returns 返回计算后的值
   */
  static calculate(
    left: number | string,
    right: number | string,
    op: string,
    decimal: number = 2
  ): number {
    if (!decimal && decimal !== 0) {
      decimal = 6;
    }
    if (left) {
      "number" === typeof left
        ? (left = left.toString())
        : (left = left.replace(NumberHelper._zeroRegex, ""));
    } else {
      left = 0;
    }
    if (right) {
      "number" === typeof right
        ? (right = right.toString())
        : (right = right.replace(NumberHelper._zeroRegex, ""));
    } else {
      right = 0;
    }
    if (!left || !right) {
      switch (op) {
        case "+":
          return NumberHelper.parse(left || right);
        case "-":
          return left ? NumberHelper.parse(left) : 0 - NumberHelper.parse(right);
        default:
          return 0;
      }
    }

    let index = (left as string).indexOf("."),
      leftDec,
      rightDec,
      zoom,
      value;
    if (index > 0) {
      leftDec = (left as string).length - index - 1;
      left = (left as string).replace(".", "");
    } else {
      leftDec = 0;
    }
    index = (right as string).indexOf(".");
    if (index > 0) {
      rightDec = (right as string).length - index - 1;
      right = (right as string).replace(".", "");
    } else {
      rightDec = 0;
    }

    left = parseInt(left as string, 10);
    right = parseInt(right as string, 10);
    if (op === "+" || op === "-") {
      // 放大到相同倍数
      zoom = leftDec - rightDec;
      if (zoom < 0) {
        left *= Math.pow(10, 0 - zoom);
        zoom = rightDec;
      } else if (zoom > 0) {
        right *= Math.pow(10, zoom);
        zoom = leftDec;
      } else {
        zoom = leftDec;
      }
      op === "+" ? (value = left + right) : (value = left - right);
      if (zoom > decimal) {
        value = Math.round(value / Math.pow(10, zoom - decimal));
      } else {
        decimal = zoom;
      }
    } else {
      // 将各自放到到整数
      if (op === "*") {
        zoom = leftDec + rightDec;
        value = left * right;
        value = Math.round(value / Math.pow(10, zoom - decimal));
      } else {
        if (leftDec > rightDec + decimal) {
          value = Math.round(left / right / Math.pow(10, leftDec - rightDec - decimal));
        } else if (leftDec < rightDec + decimal) {
          value = Math.round((left * Math.pow(10, rightDec + decimal - leftDec)) / right);
        } else {
          value = Math.round(left / right);
        }
      }
    }

    return decimal === 0 ? value : value / Math.pow(10, decimal);
  }

  /**
   * 格式化数值对象到指定的格式
   * @param value 一个数值对象或者可以转换成数值对象的字符串
   * @param format 格式信息('#'表示可选占位符;'0'表示固定占位符;'.'表示小数点,只能出现一次;','表示千分号,且只能出现一次;其它符号只能出现在2端,如:￥#,##0.00%).特别说明虽然最后加了'%',但是不会对数值进行*100处理
   * @returns 返回格式化后的字符串形式
   */
  static format(value: number | string, format: string): string {
    if (TypeHelper.isNumber(value) === false) {
      if (!value) {
        return "";
      }
      if (!format) {
        return String(value);
      }
      value = NumberHelper.parse(value);
    }
    if (!format) {
      return value.toString();
    }

    let formats = format.split(";"),
      isNegative = value < 0;
    format = formats[0];
    if (isNegative && formats.length >= 2) format = formats[1];
    if (value === 0 && formats.length >= 3) format = formats[2];

    let isPercent = format.indexOf("%") !== -1,
      isFormat = NumberHelper._isNumberFormat(format);
    value = isPercent ? Number(value) * 100 : Number(value);

    let ms = NumberHelper._eRegExp.exec(format);
    if (ms) {
      let decimals = parseInt(ms[2], 10);
      return isNaN(decimals) ? value.toExponential() : value.toExponential(decimals);
    }

    if (!isFormat) return format;

    let result = "",
      nf = NumberHelper._getNumberFormat(format);
    if (nf !== null) {
      result = NumberHelper._doFormatNumber(value, nf.format);
      if (isNegative) {
        result = "-" + result;
      }
      result = format.substr(0, nf.begin) + result + format.substr(nf.end + 1);
    } else {
      result = format;
    }

    return result;
  }
}
