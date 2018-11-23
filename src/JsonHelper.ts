/**
 * Json辅助工具
 * @returns
 */
export default class JsonHelper {
  /**
   * 将对象序列化成json字符串
   * @param {any} data 需要进行序列化的对象
   * @returns 返回序列化后的json字符串
   */
  static toJson(data: any): string {
    if (data === null || data === undefined) {
      return "null";
    }

    if (data.toJSON) {
      return data.toJSON();
    }
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  /**
   * 将json字符串反序列化成对象
   * @param {string} json json字符串
   * @returns 返回对应的对象
   */
  static parseJson(json: string): any {
    if (json && json !== "null" && json !== "undefined") {
      try {
        return JSON.parse(json);
      } catch (error) {
        console.error(error, json);
        return {};
      }
    }
    return null;
  }

  /**
   * 将参数值转换到字符串形式
   * @param value 参数的原始值
   */
  static paramValueToString(value: any): string {
    if (typeof value === "string") {
      return value;
    }
    return JsonHelper.toJson(value);
  }

  /**
   * 将参数值转换到字符串形式
   * @param value 参数的原始值
   */
  static paramsValueConvertToString(paramValues: IDictionary): void {
    if (!paramValues) {
      return;
    }
    let value;
    for (const key in paramValues) {
      if (paramValues.hasOwnProperty(key)) {
        value = paramValues[key];
        if (value === null || value === undefined) {
          delete paramValues[key];
        } else if (typeof value !== "string") {
          paramValues[key] = JsonHelper.toJson(value);
        }
      }
    }
  }
}
