import { DatePartEnum } from "./IUtilityTypes";
import NumberHelper from "./NumberHelper";
import ErrorHelper from "./ErrorHelper";

/**
 * 日期帮助类
 */
export default class DateHelper {
  private static _dateFormatExp = /^([0-9]{4})([0-9]{2})([0-9]{2})$/;
  private static _dateFormatExp2 = /^([0-9]{4}).([0-9]*)$/;
  private static _dateFormatExp3 = /^\d+(\.\d+)?$/;
  private static _isoDateFormatExp = /^([0-9]{4})([-\/]([0-9]{1,2})([-\/]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/;
  private static _isoDateFormatExp2 = /^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})[T ]([0-9]{1,2})/;
  private static _isoDateFormatExp3 = /^([0-9]{4}).([0-9]*)/;
  private static _isoDateFormatExp4 = /^([0-9]{4}).([0-9]*).([0-9]*)/;
  private static _isoDateFormatExp5 = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;

  static _fixDate(d: Date, check: Date) {
    if (+d) {
      while (d.getDate() !== check.getDate()) {
        d.setTime(+d + (d < check ? 1 : -1) * 3600000);
      }
    }
  }

  static parseISO8601(value: string): Date | null {
    let m = value.match(DateHelper._isoDateFormatExp);
    if (!m) {
      m = value.match(DateHelper._isoDateFormatExp2);
      if (m) {
        return new Date(
          parseInt(m[1], 10),
          parseInt(m[2], 10) - 1,
          parseInt(m[3], 10),
          parseInt(m[4], 10)
        );
      }

      m = value.match(DateHelper._isoDateFormatExp3);
      if (m) {
        return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1);
      }

      m = value.match(DateHelper._isoDateFormatExp4);
      if (m) {
        return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
      }

      m = value.match(DateHelper._isoDateFormatExp5);
      if (!m) return null;
      else {
        return new Date(parseInt(m[3], 10), parseInt(m[1], 10) - 1, parseInt(m[2], 10));
      }
    }
    let num = parseInt(m[1], 10);
    let date = new Date(num, 0, 1);
    if (!m[14]) {
      let check = new Date(num, 0, 1, 9, 0);
      if (m[3]) {
        num = parseInt(m[3], 10);
        date.setMonth(num - 1);
        check.setMonth(num - 1);
      }
      if (m[5]) {
        num = parseInt(m[5], 10);
        date.setDate(num);
        check.setDate(num);
      }
      DateHelper._fixDate(date, check);
      if (m[7]) {
        date.setHours(parseInt(m[7], 10));
      }
      if (m[8]) {
        date.setMinutes(parseInt(m[8], 10));
      }
      if (m[10]) {
        date.setSeconds(parseInt(m[10], 10));
      }
      if (m[12]) {
        date.setMilliseconds(Number("0." + m[12]) * 1000);
      }
      DateHelper._fixDate(date, check);
    } else {
      num = parseInt(m[3], 10);
      date.setUTCFullYear(parseInt(m[1], 10), num ? num - 1 : 0, parseInt(m[5], 10) || 1);
      date.setUTCHours(
        parseInt(m[7], 10) || 0,
        parseInt(m[8], 10) || 0,
        parseInt(m[10], 10) || 0,
        parseInt(m[12], 10) ? Number("0." + m[12]) * 1000 : 0
      );
      num = parseInt(m[18], 10);
      let offset = parseInt(m[16], 10) * 60 + (num ? num : 0);
      offset *= m[15] === "-" ? 1 : -1;
      date = new Date(+date + offset * 60 * 1000);
    }
    return date;
  }

  /**
   * 将一个日期字符串转换成一个日期对象
   * @param value 受支持的日期字符串，格式为：yyyy-MM-dd HH:mm:ss
   * @returns 一个日期对象
   */
  static parse(value: Date | number | string): Date | null {
    if (!value) {
      return null;
    }
    let d: Date;
    switch (typeof value) {
      case "number":
        d = new Date(Number(value) * 1000);
        if (d.getTime() !== value) {
          return null;
        }
        return d;
      case "string":
        let m = (value as string).match(DateHelper._dateFormatExp);
        if (m) {
          let date = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 0));
          return date;
        }

        m = (value as string).match(DateHelper._dateFormatExp2);
        if (m) {
          let date = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1);
          return date;
        }

        if ((value as string).match(DateHelper._dateFormatExp3)) {
          let num = parseInt(value as string, 10);
          d = new Date(num * 1000);
          if (d.getTime() !== num) {
            return null;
          }
          return d;
        }
        return (
          DateHelper.parseISO8601(value as string) || (value ? new Date(value as string) : null)
        );
      default:
        if ((value as Date).getFullYear) {
          return value as Date;
        }
        return null;
    }
  }

  /**
   * 格式化日期对象
   * @param date 日期对象
   * @param format 格式
   * @returns 返回格式化后的字符串
   */
  static format(date: Date | number | string | null, format: string = "yyyy-MM-dd"): string {
    if (!date) {
      return "";
    }
    switch (typeof date) {
      case "string":
        date = DateHelper.parse(date);
        break;
      case "number":
        let newDate = new Date(Number(date) * 1000);
        if (newDate.getTime() !== Number(date)) {
          return "";
        }
        break;
      case "object":
        if (!(date as Date).getFullYear) {
          return date.toString();
        }
        break;
      default:
        return date as string;
    }

    let year = (date as Date).getFullYear();
    let month = (date as Date).getMonth();
    let day = (date as Date).getDate();
    let strMonth: string,
      strDay: string,
      strHours: string,
      strMinutes: string,
      strMilliseconds: string;

    switch (format) {
      case "yyyy-MM-dd":
      case "yyyy-mm-dd":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        return year + "-" + strMonth + "-" + strDay;

      case "MM-dd":
      case "mm-dd":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        return strMonth + "-" + strDay;

      case "yyyy-MM-dd HH:mm":
      case "yyyy-mm-dd hh:ii":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        strHours = (date as Date).getHours().toString();
        if (strHours.length === 1) {
          strHours = "0" + strHours;
        }
        strMinutes = (date as Date).getMinutes().toString();
        if (strMinutes.length === 1) {
          strMinutes = "0" + strMinutes;
        }
        return year + "-" + strMonth + "-" + strDay + " " + strHours + ":" + strMinutes;

      case "yyyy-MM":
      case "yyyy-mm":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        return year + "-" + strMonth;

      case "yyyy":
        return year.toString();

      case "HH:mm:ss":
      case "hh:ii:ss":
        strHours = (date as Date).getHours().toString();
        if (strHours.length === 1) {
          strHours = "0" + strHours;
        }
        strMinutes = (date as Date).getMinutes().toString();
        if (strMinutes.length === 1) {
          strMinutes = "0" + strMinutes;
        }
        strMilliseconds = (date as Date).getSeconds().toString();
        if (strMilliseconds.length === 1) {
          strMilliseconds = "0" + strMilliseconds;
        }
        return strHours + ":" + strMinutes + ":" + strMilliseconds;

      case "MM-dd HH:mm:ss":
      case "mm-dd hh:ii:ss":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        strHours = (date as Date).getHours().toString();
        if (strHours.length === 1) {
          strHours = "0" + strHours;
        }
        strMinutes = (date as Date).getMinutes().toString();
        if (strMinutes.length === 1) {
          strMinutes = "0" + strMinutes;
        }
        strMilliseconds = (date as Date).getSeconds().toString();
        if (strMilliseconds.length === 1) {
          strMilliseconds = "0" + strMilliseconds;
        }
        return strMonth + "-" + strDay + " " + strHours + ":" + strMinutes + ":" + strMilliseconds;

      case "yyyy-MM-dd HH:mm:ss":
      case "yyyy-mm-dd hh:ii:ss":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        strHours = (date as Date).getHours().toString();
        if (strHours.length === 1) {
          strHours = "0" + strHours;
        }
        strMinutes = (date as Date).getMinutes().toString();
        if (strMinutes.length === 1) {
          strMinutes = "0" + strMinutes;
        }
        strMilliseconds = (date as Date).getSeconds().toString();
        if (strMilliseconds.length === 1) {
          strMilliseconds = "0" + strMilliseconds;
        }
        return (
          year +
          "-" +
          strMonth +
          "-" +
          strDay +
          " " +
          strHours +
          ":" +
          strMinutes +
          ":" +
          strMilliseconds
        );

      case "yyyy/MM/dd HH:mm:ss":
      case "yyyy/mm/dd hh:ii:ss":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        strHours = (date as Date).getHours().toString();
        if (strHours.length === 1) {
          strHours = "0" + strHours;
        }
        strMinutes = (date as Date).getMinutes().toString();
        if (strMinutes.length === 1) {
          strMinutes = "0" + strMinutes;
        }
        strMilliseconds = (date as Date).getSeconds().toString();
        if (strMilliseconds.length === 1) {
          strMilliseconds = "0" + strMilliseconds;
        }
        return (
          year +
          "/" +
          strMonth +
          "/" +
          strDay +
          " " +
          strHours +
          ":" +
          strMinutes +
          ":" +
          strMilliseconds
        );

      case "MM/dd HH:mm":
      case "mm/dd hh:ii":
        strMonth = (month + 1).toString();
        if (strMonth.length === 1) {
          strMonth = "0" + strMonth;
        }
        strDay = day.toString();
        if (strDay.length === 1) {
          strDay = "0" + strDay;
        }
        strHours = (date as Date).getHours().toString();
        if (strHours.length === 1) {
          strHours = "0" + strHours;
        }
        strMinutes = (date as Date).getMinutes().toString();
        if (strMinutes.length === 1) {
          strMinutes = "0" + strMinutes;
        }
        strMilliseconds = (date as Date).getSeconds().toString();
        if (strMilliseconds.length === 1) {
          strMilliseconds = "0" + strMilliseconds;
        }
        return strMonth + "/" + strDay + " " + strHours + ":" + strMinutes;
    }
    return "";
  }

  /**
   * 格式化日期对象，判断是否是今年，返回对应字符串
   */
  static formatDate(value: Date | number | string) {
    if (!value) return value;
    value = value.toString();
    value = value.replace(/-/g, "/");
    const now = new Date();
    let time = new Date(value);
    let timeStr = DateHelper.format(time, "MM-dd");
    if (time.getFullYear() !== now.getFullYear()) {
      timeStr = DateHelper.format(time, "yyyy-MM-dd");
    }
    return timeStr;
  }

  static formatDateTime(value: Date | number | string) {
    if (!value) return value;
    value = value.toString();
    value = value.replace(/-/g, "/");
    const now = new Date();
    let time = new Date(value);
    const gap = Number(now) - Number(time);
    let timeStr = "刚刚";
    if (gap < 60 * 1000) {
      timeStr = "刚刚";
    } else if (60 * 1000 <= gap && gap < 60 * 60 * 1000) {
      timeStr = Math.ceil(gap / (60 * 1000)) + "分钟前";
    } else if (60 * 60 * 1000 <= gap && gap < 24 * 60 * 60 * 1000) {
      timeStr = Math.ceil(gap / (60 * 60 * 1000)) + "小时前";
    } else if (time.getFullYear() < now.getFullYear()) {
      timeStr = DateHelper.format(time, "yyyy-MM-dd HH:mm:ss");
    } else if (time.getDate() === now.getDate() && time.getMonth() === now.getMonth()) {
      timeStr = DateHelper.format(time, "HH:mm:ss");
    } else {
      timeStr = DateHelper.format(time, "MM-dd HH:mm:ss");
    }
    return timeStr;
  }

  /**
   * 计算两个日期之间的间隔
   * @param left 左值
   * @param right 右值
   * @param datepart 计算类型
   * @returns 返回间隔数
   */
  static diff(
    left: Date | string | number,
    right: Date | string | number,
    datepart: DatePartEnum
  ): number {
    let leftDate = DateHelper.parse(left),
      rightDate = DateHelper.parse(right);
    if (!leftDate) {
      throw ErrorHelper.argumentNull(
        "left",
        "参数值必须是一个日期对象或者是一个可以转换成日期对象的数值或字符串。"
      );
    }
    if (!rightDate) {
      throw ErrorHelper.argumentNull(
        "right",
        "参数值必须是一个日期对象或者是一个可以转换成日期对象的数值或字符串。"
      );
    }

    switch (datepart) {
      case DatePartEnum.year:
        return rightDate.getFullYear() - leftDate.getFullYear();
      case DatePartEnum.month:
        return (
          (rightDate.getFullYear() - leftDate.getFullYear()) * 12 +
          rightDate.getMonth() -
          leftDate.getMonth()
        );
      default: {
        let interval = (rightDate.getTime() - leftDate.getTime()) / 1000; // 相差秒
        switch (datepart) {
          case DatePartEnum.week:
            interval = interval / 60 / 60 / 24 / 7;
            break;
          case DatePartEnum.day:
            interval = interval / 60 / 60 / 24;
            break;
          case DatePartEnum.hour:
            interval = interval / 60 / 60;
            break;
          case DatePartEnum.minute:
            interval = interval / 60;
            break;
        }
        return NumberHelper.unround(interval);
      }
    }
  }

  /**
   * 在日期中添加或减去指定的时间间隔
   * @param date 要进行处理的日期对象或可以转换成日期的字符串
   * @param datepart 计算类型
   * @param interval 间隔
   * @returns 返回日期对象
   */
  static add(value: Date | string | number, datepart: DatePartEnum, interval: number) {
    let date = DateHelper.parse(value);
    if (!date) {
      throw ErrorHelper.argumentNull(
        "left",
        "参数值必须是一个日期对象或者是一个可以转换成日期对象的数值或字符串。"
      );
    }

    switch (datepart) {
      case DatePartEnum.year:
        return new Date(
          date.getFullYear() + interval,
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        );
      case DatePartEnum.month:
        return new Date(
          date.getFullYear(),
          date.getMonth() + interval,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        );
      case DatePartEnum.day:
        return new Date(date.getTime() + 86400000 * interval);
      case DatePartEnum.week:
        return new Date(date.getTime() + 604800000 * interval);
      case DatePartEnum.hour:
        return new Date(date.getTime() + 3600000 * interval);
      case DatePartEnum.minute:
        return new Date(date.getTime() + 60000 * interval);
      case DatePartEnum.second:
        return new Date(date.getTime() + 1000 * interval);
    }
    return null;
  }
}
