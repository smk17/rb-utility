/**
 * 引入外部js辅助类
 */
export default class ImportLoader {
  private id: string;
  private url: string;
  private protocol: string = "";

  /**
   * 初始化 ImportLoader
   * @param url 要引入的外部js文件
   * @param id 脚本ID，防止重复加载
   * @param protocol
   */
  constructor(url: string, id: string = "", protocol?: string) {
    this.url = url;
    this.id = id;
    if (this.url.indexOf("//") === 0) {
      this.protocol = protocol || window.location.protocol;
      if (this.protocol.indexOf(":") === -1) {
        this.protocol += ":";
      }
    }
  }

  private buildScriptTag(src: string, id?: string) {
    const script = document.createElement("script");
    if (id) script.id = id;
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = src;
    return script;
  }

  private getScriptPromise(src: string, id?: string) {
    const script = this.buildScriptTag(src, id);
    const p = new Promise<any>(resolve => {
      script.onload = function() {
        resolve(this);
      };
    });
    document.body.appendChild(script);
    return p;
  }

  private getMainPromise() {
    return this.getScriptPromise(`${this.protocol}${this.url}`, this.id);
  }

  /** 加载外部js文件 */
  async load() {
    if (typeof window === "undefined") {
      return null;
    }
    return this.getMainPromise();
  }

  /** 加载外部 AMD 具备默认导出的 js文件 */
  async loadDefault<T = any>() {
    if (typeof window === "undefined") {
      return null;
    }
    if (window["require"]) {
      return new Promise<T>((resolve, rejct) => {
        window["require"](
          [`${this.protocol}${this.url}`],
          result => {
            if (result) {
              resolve(result.default);
            } else {
              resolve(result);
            }
          },
          error => {
            rejct(error);
          }
        );
      });
    } else {
      return null;
    }
    // return this.getMainPromise()
  }
}
