/**
 * 引入外部js辅助类
 */
export default class ImportLoader {
    private id;
    private url;
    private protocol;
    /**
     * 初始化 ImportLoader
     * @param url 要引入的外部js文件
     * @param id 脚本ID，防止重复加载
     * @param protocol
     */
    constructor(url: string, id?: string, protocol?: string);
    private buildScriptTag;
    private getScriptPromise;
    private getMainPromise;
    /** 加载外部js文件 */
    load(): Promise<any>;
    /** 加载外部 AMD 具备默认导出的 js文件 */
    loadDefault<T = any>(): Promise<T | null>;
}
//# sourceMappingURL=ImportLoader.d.ts.map