/**
 * 编码辅助工具
 */
export default class EncodeHelper {
    /**
     * 对字符串进行转义成正则表达式识别的表示型式
     * @param s 要进行转义的字符串
     */
    static encodeRegExpString(s) {
        if (!s) {
            return "";
        }
        if (!EncodeHelper._regExpSC) {
            EncodeHelper._regExpSC = new RegExp("([\\" + EncodeHelper._specialCcharacter.regexp.join("\\") + "])", "g");
        }
        return s.replace(EncodeHelper._regExpSC, "\\$1");
    }
    /**
     * 按XML属性值格式进行编码
     * @param s 要进行编码的字符串
     */
    static encodeXmlAttrValue(s) {
        if (!s) {
            return "";
        }
        if (!EncodeHelper._xmlAttrSC) {
            EncodeHelper._xmlAttrSC = new RegExp(EncodeHelper.encodeRegExpString(EncodeHelper._specialCcharacter.xmlValue.join("")), "g");
        }
        return s.replace(EncodeHelper._xmlAttrSC, EncodeHelper.s_xmlAttrReplate);
    }
    /**
     * 按XML节点文本格式进行编码
     * @param s 要进行编码的字符串
     */
    static encodeXmlText(s) {
        if (!s) {
            return s;
        }
        if (!EncodeHelper._xmlTextSC) {
            EncodeHelper._xmlTextSC = new RegExp(EncodeHelper.encodeRegExpString(EncodeHelper._specialCcharacter.xmlText.join("")), "g");
        }
        return s.replace(EncodeHelper._xmlTextSC, EncodeHelper.s_xmlTextReplate);
    }
    static s_xmlAttrReplate(r) {
        return EncodeHelper._specialCcharacter.xmlValueTran[EncodeHelper._specialCcharacter.xmlValue.indexOf(r)];
    }
    static s_xmlTextReplate(r) {
        return EncodeHelper._specialCcharacter.xmlTextTran[EncodeHelper._specialCcharacter.xmlText.indexOf(r)];
    }
}
EncodeHelper._specialCcharacter = {
    regexp: ["$", "(", ")", "*", "+", ".", "[", "]", "?", "\\", "/", "^", "{", "}"],
    xmlValue: ["&", "<", ">", "'", '"', "\r", "\n"],
    xmlValueTran: ["&amp;", "&lt;", "&gt;", "&apos;", "&quot;", "", ""],
    xmlText: ["&", "<", ">"],
    xmlTextTran: ["&amp;", "&lt;", "&gt;"],
    js: ['"', "'", "/", "\\", "\b", "\f", "\n", "\r", "\t"]
};
