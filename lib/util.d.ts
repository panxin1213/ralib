/**
 * 前端存储对象 storage.local storage.session storage.global
 * storage.local.setItem(key, value) storage.local.getItem(key, value)
 * @type {Storage}
 */
export declare const storage: any;
/**
 * localStorage hook封装
 * @param key
 * @param defaultValue
 */
export declare function useLocalStorage(key: string, defaultValue?: any): any[];
/**
 * sessionStorage hook封装
 * @param key
 * @param defaultValue
 */
export declare function useSessionStorage(key: string, defaultValue?: any): any[];
/**
 * 存储token到sessionStorage及loginUser中
 * @param token
 */
export declare function setToken(token: any): void;
/**
 * 获取token
 * token来源: queryString > sessionStorage > loginUser
 */
export declare function getToken(): any;
/**
 * 设置当前用户信息
 * @param loginUser 当前登录用户信息
 */
export declare function setLoginUser(loginUser?: any): void;
/**
 * 获取当前用户信息
 * @returns {any}
 */
export declare function getLoginUser(): any;
/**
 * 判断是否有权限
 * @param code
 */
export declare function hasPermission(code: any): any;
/**
 * 判断用户是否登录 前端简单通过登录用户或token是否存在来判断
 * @returns {boolean}
 */
export declare function isLogin(): boolean;
/**
 * 判断当前页面是否是登录页面
 * @param path
 * @returns {string|*|boolean}
 */
export declare function isLoginPage(path?: string): boolean;
/**
 * 设置乾坤主应用实例
 * @param mainApp
 */
export declare function setMainApp(mainApp: any): void;
/**
 * 获取乾坤主应用实例
 */
export declare function getMainApp(): any;
/**
 * 获取配置
 * @param envConfig
 * @param key
 * @param defaultValue
 * @param parse
 * @returns {string|boolean|*}
 */
export declare function getConfigValue(envConfig: any, key: any, defaultValue: any, parse: any): any;
/**
 * 获取子应用容器id
 * @param name
 * @returns {string}
 */
export declare function getContainerId(name: any): string;
/**
 * 根据name判断，是否是激活子项目
 * @param app
 * @param pathname
 * @returns {*}
 */
export declare function isActiveApp(app: any, pathname?: string): boolean;
/**
 * 获取模块名
 * @param filePath
 */
export declare function getModelName(filePath: any): any;
/**
 * 处理菜单数据
 * @param menus
 * @returns {*}
 */
export declare function formatMenus(menus: any): any;
/**
 * 嵌入iframe情况下，获取父级地址
 */
export declare function getParentOrigin(): string;
