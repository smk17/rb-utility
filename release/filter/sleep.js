/**
 * 对 setTimeout 的封装
 * @param time
 */
export function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
export default sleep;
