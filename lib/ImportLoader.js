var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 引入外部js辅助类
 */
export default class ImportLoader {
    /**
     * 初始化 ImportLoader
     * @param url 要引入的外部js文件
     * @param id 脚本ID，防止重复加载
     * @param protocol
     */
    constructor(url, id = "", protocol) {
        this.protocol = "";
        this.url = url;
        this.id = id;
        if (this.url.indexOf("//") === 0) {
            this.protocol = protocol || window.location.protocol;
            if (this.protocol.indexOf(":") === -1) {
                this.protocol += ":";
            }
        }
    }
    buildScriptTag(src, id) {
        const script = document.createElement("script");
        if (id)
            script.id = id;
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = src;
        return script;
    }
    getScriptPromise(src, id) {
        const script = this.buildScriptTag(src, id);
        const p = new Promise(resolve => {
            script.onload = function () {
                resolve(this);
            };
        });
        document.body.appendChild(script);
        return p;
    }
    getMainPromise() {
        return this.getScriptPromise(`${this.protocol}${this.url}`, this.id);
    }
    /** 加载外部js文件 */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window === "undefined") {
                return null;
            }
            return this.getMainPromise();
        });
    }
    /** 加载外部 AMD 具备默认导出的 js文件 */
    loadDefault() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window === "undefined") {
                return null;
            }
            if (window["require"]) {
                return new Promise((resolve, rejct) => {
                    window["require"]([`${this.protocol}${this.url}`], result => {
                        if (result) {
                            resolve(result.default);
                        }
                        else {
                            resolve(result);
                        }
                    }, error => {
                        rejct(error);
                    });
                });
            }
            else {
                return null;
            }
            // return this.getMainPromise()
        });
    }
}
