/**
 * 对 setTimeout 的封装
 * @param time
 */
export function sleep(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
export default sleep;
