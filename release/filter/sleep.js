/**
 * 对 setTimeout 的封装
 * @param time
 */
export function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
export default sleep;
