/** console辅助工具 */
export default class ConsoleHelper {
  static log(data) {
    if (console) {
      console.log(data);
    }
  }

  static logDev(data, position) {
    if (console) {
      console.log(position, data);
      // window.baseConfig.development && console.log(data);
    }
  }
  static alert(data) {
    if (alert) {
      alert(data);
    }
  }

  static debug(data) {
    if (console) {
      console.debug(data);
    }
  }

  static error(...data) {
    if (console) {
      console.error(...data);
    }
  }
}
