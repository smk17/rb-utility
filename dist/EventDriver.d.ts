/**
 * 事件通知
 */
export default class EventDriver {
    static regtable: any;
    /**
     * 注册一个事件
     * @param event 事件名称
     * @param callback 事件触发时的回调函数
     */
    static register(event: string, callback: (...args) => any): void;
    /**
     * 卸载一个事件
     * @param event 事件名称
     * @param callback 注册事件时传入的回调函数
     */
    static unregister(event: string, callback: (...args) => any): void;
    /**
     * 给存在的事件发送通知
     * @param event 事件名称
     * @param props 需要传递给事件回调函数的参数
     */
    static send(event: string, ...props: any[]): void;
}
