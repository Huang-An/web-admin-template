// 启动引入 xe-utils VXETable需要此库
import 'xe-utils'

import Element from 'element-ui'
import VXETable from 'vxe-table'

import { getStorage } from 'plugin/helper'

// type
import { VueConstructor } from 'vue/types/umd'

const files = require.context('./common', true, /index\.vue$/)

/**
 * 注册 Element
 * @param Vue
 */
export const setupRegisterElement = (Vue: VueConstructor<Vue>) => {
  Vue.use(Element, { size: getStorage('appSize') || 'medium' })
}

/**
 * 注册 VXETable
 * @param Vue
 */
export const setupRegisterVXETable = (Vue: VueConstructor<Vue>) => {
  Vue.use(VXETable)
}

/**
 * 启动注册全局组件
 * @param Vue
 */
export const setupRegisterComponent = (Vue: VueConstructor<Vue>) => {
  files.keys().forEach((key: string) => {
    const component = files(key).default
    if (component.options.name) {
      Vue.component(component.options.name, component)
    }
  })
}
