import "whatwg-fetch";
declare function isFunction(what: any): boolean;
declare function objectMerge(obj1: any, obj2: any): any;
declare const _default: {
    isFunction: typeof isFunction;
    objectMerge: typeof objectMerge;
    handleWindowError: (_window: any, config: any) => void;
    handleRejectPromise: (_window: any, config: any) => void;
    handleConsoleError: (_window: any, config: any) => void;
    handleResourceError: (_window: any, config: any) => void;
    handleAjaxError: (_window: any, config: any) => void;
};
export default _default;
//# sourceMappingURL=utils.d.ts.map