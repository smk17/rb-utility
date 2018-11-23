import Formula from "../Formula";
var _currencyFormulas = new Formula("(data.currency * data.decimals) / data.decimals", 2);
var _weightFormulas = new Formula("data.weight / data.unit", 2);
/**
 * 数据格式化成金额
 * @param value
 * @param _currency
 * @param decimals
 */
export function currency(value, params) {
    if (params === void 0) { params = {}; }
    var _currency = params._currency, decimals = params.decimals, unit = params.unit;
    value = value || 0;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0))
        return "";
    decimals = decimals != null ? decimals : 2;
    if (decimals < 0)
        return value;
    var _unit = "";
    value = _currencyFormulas.calc({
        currency: value,
        decimals: 100
    });
    if (!!unit) {
        if (value >= 100000000000) {
            value = _weightFormulas.calc({
                weight: value,
                unit: 10000 * 10000
            });
            decimals = 0;
            _unit = "亿";
        }
        else if (value >= 10000000) {
            value = _weightFormulas.calc({
                weight: value,
                unit: 10000
            });
            decimals = 0;
            _unit = "万";
        }
    }
    _currency = _currency != null || _currency !== undefined ? _currency : "￥";
    // value = (Math.ceil(value * 100)) / 100
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
    var _float = decimals ? stringified.slice(-1 - decimals) : "";
    var sign = value < 0 ? "-" : "";
    var digitsRE = /(\d{3})(?=\d)/g;
    return sign + _currency + head + _int.slice(i).replace(digitsRE, "$1,") + _float + _unit;
}
//# sourceMappingURL=currency.js.map