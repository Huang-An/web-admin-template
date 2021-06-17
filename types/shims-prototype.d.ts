import { AxiosInstance } from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    /**
     *  请求
     */
    $fetch: AxiosInstance

    /**
     *  组件名称
     */
    componentName?: string

    /**
     * 递归查找相应组件
     * @param componentName 需要查找的组件名称
     * @param root  遍历开始节点
     * @param level 遍历层级
     * @param type 查找多个还是查找单个
     */
    findComponentByName(componentName: string, root?: Vue, level?: number, type?: 'single' | 'multiple'): Array<Vue>

    /**
     * 触发某个组件的注册事件
     * @param componentEventPath：路径 如：组件名称/事件
     * @param params: 回调所需参数
     * @param options：优化项
     */
    dispatch(componentEventPath: string, params: Array<any>, options?: dispatchOptions): void

    /**
     * 系统权限
     * @param permission 权限访问路径
     */
    sysPermit(permission: string): boolean

    /**
     * 返回并关闭页面
     */
    routeBack: () => void
  }
}
