import Formula from "../Formula";
const fontSizeFormula = new Formula("data.fontSize * ( data.width / innerWidth )");
/**
 * 获取字体大小
 *
 * 字体适配不同屏幕
 * @param fontSize 字体大小，该字体大小是以屏幕宽为 375
 * @param benchmarkWidth 屏幕宽基准, 默认为 375
 */
function getFontSize(fontSize, benchmarkWidth = 375) {
    return fontSizeFormula.calc({
        fontSize,
        width: window.innerWidth,
        benchmarkWidth
    });
}
export default getFontSize;
