/**
 * 字符串帮助对象
 */
export default class StringHelper {
    static __format(format: string, args: any[]): string;
    /**
     * 将指定的 String 中的格式项替换为指定的args实例的值的文本等效项
     * @param format 符合格式字符串
     * @param args 要替换的参数值
     * @returns format 的一个副本，其中的第一个格式项已替换为 args 的 String 等效项
     */
    static format(format: string, ...args: any[]): string;
}
