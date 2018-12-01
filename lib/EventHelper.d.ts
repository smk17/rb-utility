/**
 * 函数执行装饰器
 */
export default class EventHelper {
    private static _lockCount;
    /**
     * 执行一段普通函数代码
     *
     * 使用：`@EventHelper.exec()`
     */
    static exec(message?: any, errorText?: string): (target: any, name: any, descriptor: any) => any;
    /**
     * 执行一段普通函数代码，并对该函数加锁
     *
     * 使用：`@EventHelper.execLock()`
     * @param errorText 出现错误时得提示信息文本
     */
    static execLock(message?: any, errorText?: string): (target: any, name: string, descriptor: any) => any;
    /**
     * 执行一段需要把数据提交到后端的函数代码，一般应用在点击提交按钮的场景中，例如：保存提货地址
     *
     * 多按钮状态设定, 通过监听 `lockSubmit` 事件，更新对应按钮状态
     * @param successText 请求成功时得提示信息文本,为`null`时不显示提示信息
     * @param errorText 出现错误时得提示信息文本
     * @returns 声明函数需返回`bool类型`，返回`true`为显示提示信息，当`successText`为`null`时即时返回`true`也不会显示提示信息
     */
    static execSubmit(message?: any, successText?: string | null, errorText?: string): (target: any, name: string, descriptor: any) => any;
    /**
     * 增加锁计数
     */
    private static increaseLock;
    /**
     * 减少锁计数
     */
    private static decreaseLock;
    /**
     * 当前缓存是否存在锁对象
     * @returns
     */
    isLock(): boolean;
}
//# sourceMappingURL=EventHelper.d.ts.map