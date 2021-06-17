import { dateFormat } from 'plugin/helper'

// type
import { VueConstructor } from 'vue/types/umd'

/**
 * 全局 filter 定义在这里
 */
const filters: { [k: string]: Function } = {
  /**
   * 日期格式
   */
  format: (val: string | number | Date, fmt?: string): string => {
    return dateFormat(val, fmt)
  }
}

/**
 * 启动注册全局过滤器
 * @param Vue
 */
export const setupRegisterFilter = (Vue: VueConstructor<Vue>) => {
  Object.keys(filters).forEach((key: string) => {
    Vue.filter(key, filters[key])
  })
}
