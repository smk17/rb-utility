/** console辅助工具 */
export default class ConsoleHelper {
  public static development = true;
  static log(...data) {
    if (console && ConsoleHelper.development) {
      console.log(...data);
    }
  }

  static alert(...data) {
    if (alert && ConsoleHelper.development) {
      alert(...data);
    }
  }

  static debug(...data) {
    if (console && ConsoleHelper.development) {
      console.debug(...data);
    }
  }

  static warn(...data) {
    if (console && ConsoleHelper.development) {
      console.warn(...data);
    }
  }

  static error(...data) {
    if (console && ConsoleHelper.development) {
      console.error(...data);
    }
  }
}
