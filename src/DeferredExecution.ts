import { IDeferredExecutionOption } from "./IUtilityTypes";
/**
 * 延迟执行辅助对象
 */
export default class DeferredExecution {
  private _timeoutHandle;

  /**
   * 执行一个延迟执行回调，如果上一次回调还没有执行，则会先取消上次回调
   * @param callback 回调函数，默认为延迟0
   * @param options 延迟选项
   */
  execute(callback: (...args) => void, options?: IDeferredExecutionOption) {
    if (this._timeoutHandle) {
      clearTimeout(this._timeoutHandle);
    }

    this._timeoutHandle = setTimeout(() => {
      if (options) {
        if (options.context) {
          callback.call(options.context, options.data);
          this._timeoutHandle = 0;
          return;
        }
      }
      callback();
    }, options && options.timeout && options.timeout > 0 ? options.timeout : 0);
  }
  cancl() {
    if (this._timeoutHandle) {
      clearTimeout(this._timeoutHandle);
    }
  }
}
