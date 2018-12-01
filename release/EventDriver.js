/**
 * 事件通知
 */
export default class EventDriver {
    /**
     * 注册一个事件
     * @param event 事件名称
     * @param callback 事件触发时的回调函数
     */
    static register(event, callback) {
        const reciverlist = EventDriver.regtable[event] || [];
        reciverlist.push(callback);
        EventDriver.regtable[event] = reciverlist;
    }
    /**
     * 卸载一个事件
     * @param event 事件名称
     * @param callback 注册事件时传入的回调函数
     */
    static unregister(event, callback) {
        const reciverlist = EventDriver.regtable[event] || [];
        let mark = -1;
        for (let i = 0; i < reciverlist; i++) {
            if (reciverlist[i] === callback) {
                mark = i;
                break;
            }
        }
        if (mark !== -1) {
            reciverlist.splice(mark, 1);
        }
    }
    /**
     * 给存在的事件发送通知
     * @param event 事件名称
     * @param props 需要传递给事件回调函数的参数
     */
    static send(event, ...props) {
        const reciverlist = EventDriver.regtable[event];
        if (reciverlist) {
            for (const reciver of reciverlist) {
                reciver(...props);
            }
        }
    }
}
EventDriver.regtable = [];
