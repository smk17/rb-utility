/** console辅助工具 */
export default class ConsoleHelper {
    static log(data: any): void;
    static logDev(data: any, position: any): void;
    static alert(data: any): void;
    static debug(data: any): void;
    static error(...data: any[]): void;
}
