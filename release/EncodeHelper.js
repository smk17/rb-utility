/**
 * 编码辅助工具
 */
var EncodeHelper = /** @class */ (function () {
    function EncodeHelper() {
    }
    /**
     * 对字符串进行转义成正则表达式识别的表示型式
     * @param s 要进行转义的字符串
     */
    EncodeHelper.encodeRegExpString = function (s) {
        if (!s) {
            return "";
        }
        if (!EncodeHelper._regExpSC) {
            EncodeHelper._regExpSC = new RegExp("([\\" + EncodeHelper._specialCcharacter.regexp.join("\\") + "])", "g");
        }
        return s.replace(EncodeHelper._regExpSC, "\\$1");
    };
    /**
     * 按XML属性值格式进行编码
     * @param s 要进行编码的字符串
     */
    EncodeHelper.encodeXmlAttrValue = function (s) {
        if (!s) {
            return "";
        }
        if (!EncodeHelper._xmlAttrSC) {
            EncodeHelper._xmlAttrSC = new RegExp(EncodeHelper.encodeRegExpString(EncodeHelper._specialCcharacter.xmlValue.join("")), "g");
        }
        return s.replace(EncodeHelper._xmlAttrSC, EncodeHelper.s_xmlAttrReplate);
    };
    /**
     * 按XML节点文本格式进行编码
     * @param s 要进行编码的字符串
     */
    EncodeHelper.encodeXmlText = function (s) {
        if (!s) {
            return s;
        }
        if (!EncodeHelper._xmlTextSC) {
            EncodeHelper._xmlTextSC = new RegExp(EncodeHelper.encodeRegExpString(EncodeHelper._specialCcharacter.xmlText.join("")), "g");
        }
        return s.replace(EncodeHelper._xmlTextSC, EncodeHelper.s_xmlTextReplate);
    };
    EncodeHelper.s_xmlAttrReplate = function (r) {
        return EncodeHelper._specialCcharacter.xmlValueTran[EncodeHelper._specialCcharacter.xmlValue.indexOf(r)];
    };
    EncodeHelper.s_xmlTextReplate = function (r) {
        return EncodeHelper._specialCcharacter.xmlTextTran[EncodeHelper._specialCcharacter.xmlText.indexOf(r)];
    };
    EncodeHelper._specialCcharacter = {
        regexp: ["$", "(", ")", "*", "+", ".", "[", "]", "?", "\\", "/", "^", "{", "}"],
        xmlValue: ["&", "<", ">", "'", '"', "\r", "\n"],
        xmlValueTran: ["&amp;", "&lt;", "&gt;", "&apos;", "&quot;", "", ""],
        xmlText: ["&", "<", ">"],
        xmlTextTran: ["&amp;", "&lt;", "&gt;"],
        js: ['"', "'", "/", "\\", "\b", "\f", "\n", "\r", "\t"]
    };
    return EncodeHelper;
}());
export default EncodeHelper;
