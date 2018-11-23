import Formula from "../Formula";
var fontSizeFormula = new Formula("data.fontSize * ( data.width / innerWidth )");
/**
 * 获取字体大小
 *
 * 字体适配不同屏幕
 * @param fontSize 字体大小，该字体大小是以屏幕宽为 375
 * @param benchmarkWidth 屏幕宽基准, 默认为 375
 */
export function getFontSize(fontSize, benchmarkWidth) {
    if (benchmarkWidth === void 0) { benchmarkWidth = 375; }
    return fontSizeFormula.calc({
        fontSize: fontSize,
        width: window.innerWidth,
        benchmarkWidth: benchmarkWidth
    });
}
//# sourceMappingURL=fontSize.js.map