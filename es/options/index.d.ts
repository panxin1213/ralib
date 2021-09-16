import { ReactNode } from 'react';
export interface optionsProps {
    getOption: (value: any) => any;
    getTag: (value: any) => any;
    getLabel: (value: any) => any;
    getMeta: (value: any) => any;
    clearCache: (value: any) => any;
}
export interface itemProps {
    value: any;
    label: any;
    meta?: any;
    tag?: ReactNode;
}
export declare function useOptions(...args: any[]): any[];
/**
 * 如果函数有参数，不会被缓存！！
 * ！
 * @param options
 * @param cacheTime
 *      false 不缓存
 *      true 浏览器刷新之后失效
 *      number 缓存number毫秒数，可以有效解决同一页面多次加载问题同时一定程度上避免脏数据
 * @returns {*}
 */
export declare function wrapperOptions(options: any, cacheTime: any): any;
export declare function PromiseChildren(props: any): any;
