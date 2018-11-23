import { ICurrencyParams } from "../IUtilityTypes";
/**
 * 数据格式化成金额
 * @param value
 * @param _currency
 * @param decimals
 */
declare function currency(value: any, params?: ICurrencyParams): any;
export default currency;
