// type
import { DirectiveOptions, DirectiveFunction, VueConstructor } from 'vue/types/umd'

interface directiveInterface {
  [k: string]: DirectiveOptions | DirectiveFunction | undefined
}

/**
 * 全局指令定义在这里
 */
const directives: directiveInterface = {}

/**
 * 启动注册全局指令
 * @param Vue
 */
export const setupRegisterDirective = (Vue: VueConstructor<Vue>) => {
  Object.keys(directives).forEach((key: string) => {
    Vue.directive(key, directives[key])
  })
}
