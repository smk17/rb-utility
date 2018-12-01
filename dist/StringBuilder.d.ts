/**
 * 字符串构建器
 */
export default class StringBuilder {
    private _parts;
    /**
     * 往对象后面追加指定的文本
     * @param 要追加的文本
     * @returns 返回StringBuilder对象
     */
    append(...text: any[]): StringBuilder;
    /**
     * 将指定的 String 中的格式项替换为指定的args实例的值的文本等效项，并添加到字符串缓冲对象中
     * @param format 符合格式字符串
     * @param args 要格式化的对象
     * @returns 返回StringBuilder对象
     */
    appendFormat(format: string, ...args: any[]): StringBuilder;
    /**
     * 往对象后面追加一行指定的文本，会在最后加一个制表和换行符
     * @param text 要追加的文本，如果没有指定值，则只追加制表和换行符
     * @returns 返回StringBuilder对象
     */
    appendLine(...text: string[]): StringBuilder;
    /**
     * 清除当前对象中的所有内容
     * @returns 返回StringBuilder对象
     */
    clear(): StringBuilder;
    /**
     * 判断当前对象是否为空
     * @returns 如果为空则返回true，否则返回false
     */
    isEmpty(): boolean;
    /**
     * 返回当前对象中存储的所有字符串内容
     * @param separator 在每次添加的字符串之间要添加的分隔符
     * @returns 返回的字符串对象
     */
    toString(separator?: string): string;
}
//# sourceMappingURL=StringBuilder.d.ts.map