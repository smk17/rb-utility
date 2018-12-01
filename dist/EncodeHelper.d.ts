/**
 * 编码辅助工具
 */
export default class EncodeHelper {
    private static _specialCcharacter;
    private static _regExpSC;
    private static _xmlTextSC;
    private static _xmlAttrSC;
    /**
     * 对字符串进行转义成正则表达式识别的表示型式
     * @param s 要进行转义的字符串
     */
    static encodeRegExpString(s: any): string;
    /**
     * 按XML属性值格式进行编码
     * @param s 要进行编码的字符串
     */
    static encodeXmlAttrValue(s: string): string;
    /**
     * 按XML节点文本格式进行编码
     * @param s 要进行编码的字符串
     */
    static encodeXmlText(s: string): string;
    private static s_xmlAttrReplate;
    private static s_xmlTextReplate;
}
//# sourceMappingURL=EncodeHelper.d.ts.map