/**
 * 事件通知
 */
var EventDriver = /** @class */ (function () {
    function EventDriver() {
    }
    /**
     * 注册一个事件
     * @param event 事件名称
     * @param callback 事件触发时的回调函数
     */
    EventDriver.register = function (event, callback) {
        var reciverlist = EventDriver.regtable[event] || [];
        reciverlist.push(callback);
        EventDriver.regtable[event] = reciverlist;
    };
    /**
     * 卸载一个事件
     * @param event 事件名称
     * @param callback 注册事件时传入的回调函数
     */
    EventDriver.unregister = function (event, callback) {
        var reciverlist = EventDriver.regtable[event] || [];
        var mark = -1;
        for (var i = 0; i < reciverlist; i++) {
            if (reciverlist[i] === callback) {
                mark = i;
                break;
            }
        }
        if (mark !== -1) {
            reciverlist.splice(mark, 1);
        }
    };
    /**
     * 给存在的事件发送通知
     * @param event 事件名称
     * @param props 需要传递给事件回调函数的参数
     */
    EventDriver.send = function (event) {
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        var reciverlist = EventDriver.regtable[event];
        if (reciverlist) {
            for (var _a = 0, reciverlist_1 = reciverlist; _a < reciverlist_1.length; _a++) {
                var reciver = reciverlist_1[_a];
                reciver.apply(void 0, props);
            }
        }
    };
    EventDriver.regtable = [];
    return EventDriver;
}());
export default EventDriver;
