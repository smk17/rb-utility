import Formula from "../Formula";
const _currencyFormulas = new Formula("(data.currency * data.decimals) / data.decimals", 2);
const _weightFormulas = new Formula("data.weight / data.unit", 2);
/**
 * 数据格式化成金额
 * @param value
 * @param _currency
 * @param decimals
 */
function currency(value, params = {}) {
    let { _currency, decimals, unit } = params;
    value = value || 0;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0))
        return "";
    decimals = decimals != null ? decimals : 2;
    if (decimals < 0)
        return value;
    let _unit = "";
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
    let stringified = Math.abs(value).toFixed(decimals);
    let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    let i = _int.length % 3;
    let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
    let _float = decimals ? stringified.slice(-1 - decimals) : "";
    let sign = value < 0 ? "-" : "";
    let digitsRE = /(\d{3})(?=\d)/g;
    return (sign +
        _currency +
        head +
        _int.slice(i).replace(digitsRE, "$1,") +
        _float +
        _unit);
}
export default currency;
