/**
 * 延迟执行辅助对象
 */
var DeferredExecution = /** @class */ (function () {
    function DeferredExecution() {
    }
    /**
     * 执行一个延迟执行回调，如果上一次回调还没有执行，则会先取消上次回调
     * @param callback 回调函数，默认为延迟0
     * @param options 延迟选项
     */
    DeferredExecution.prototype.execute = function (callback, options) {
        var _this = this;
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle);
        }
        this._timeoutHandle = setTimeout(function () {
            if (options) {
                if (options.context) {
                    callback.call(options.context, options.data);
                    _this._timeoutHandle = 0;
                    return;
                }
            }
            callback();
        }, options && options.timeout && options.timeout > 0 ? options.timeout : 0);
    };
    DeferredExecution.prototype.cancl = function () {
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle);
        }
    };
    return DeferredExecution;
}());
export default DeferredExecution;
