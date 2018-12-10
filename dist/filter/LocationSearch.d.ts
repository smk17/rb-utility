import { IDictionary } from "../IUtilityTypes";
declare type Location = {
    search?: string;
    query?: IDictionary<string>;
} & IDictionary;
/** 获取 location.search 的参数并格式化成 object */
declare class LocationSearch {
    static location?: Location;
    /**
     * 获取 location.search 的参数并格式化成 object
     * @param location Location 对象包含有关当前 URL 的信息。默认是`window.location`,可传递其他路由器自带的`location`替代，例如`react-router`
     */
    static get(location?: Location): IDictionary<string>;
}
export default LocationSearch;
//# sourceMappingURL=LocationSearch.d.ts.map