/** 对象类型辅助工具 */
export default class ObjectHelper {
    /** 对象深比较 */
    static equals(x: any, y: any): boolean;
    static map(obj: any, callback: (obj: any, key?: number | string) => string): string[];
}
