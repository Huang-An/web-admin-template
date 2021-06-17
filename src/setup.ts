import { setupRegisterElement, setupRegisterVXETable, setupRegisterComponent } from '@/components'
import { setupRegisterDirective } from '@/directives'
import { setupRegisterFilter } from '@/filters'
import { setupRegisterGlobMixin } from '@/mixins'
import { setupRegisterAxios } from 'plugin/axios'
import { setupRegisterRouter } from '@/router'
import { setupRegisterStore } from '@/store'
import { setupErrorHandle } from '@/logics'

// type
import { VueConstructor } from 'vue/types/umd'

/**
 * 设置 vue 配置
 * @param Vue
 */
const setVueConfig = (Vue: VueConstructor) => {
  Vue.config.productionTip = false
}

/**
 * 启动 APP 全局注册
 * @param Vue
 */
export const setupApp = (Vue: VueConstructor) => {
  setVueConfig(Vue)
  setupRegisterRouter(Vue)
  setupRegisterStore(Vue)
  setupRegisterGlobMixin(Vue)
  setupRegisterElement(Vue)
  setupRegisterVXETable(Vue)
  setupRegisterDirective(Vue)
  setupRegisterFilter(Vue)
  setupRegisterAxios(Vue)
  setupRegisterComponent(Vue)
  setupErrorHandle(Vue)
}
