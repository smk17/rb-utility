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
    execute(callback: (...args) => void, options?: IDeferredExecutionOption): void;
    cancl(): void;
}
