import { createGuard } from './guard'
import VueRouter, { RouteConfig } from 'vue-router'

// type
import { VueConstructor } from 'vue/types/umd'

const files = require.context('./modules', false, /\.ts$/)

let ordinaryRoutes: Array<RouteConfig> = []
let errorRoutes: Array<RouteConfig> = []

files.keys().forEach((key: string) => {
  const modules = key.replace(/(\.\/|\.ts)/g, '')
  if (modules === 'error') {
    // error router 单独筛选出来放在最后
    errorRoutes = files(key).default
  } else {
    ordinaryRoutes = ordinaryRoutes.concat(files(key).default)
  }
})

/**
 * 导出 routes 路由配置
 */
export const routes = ordinaryRoutes.concat(errorRoutes)

/**
 * 导出 router 实例对象
 */
export let router: VueRouter

/**
 * 启动注册 vue router
 * @param Vue
 */
export const setupRegisterRouter = (Vue: VueConstructor<Vue>) => {
  Vue.use(VueRouter)

  router = new VueRouter({
    routes,
    scrollBehavior(to, form, savedPosition) {
      if (savedPosition) return savedPosition
      return { x: 0, y: 0 }
    }
  })

  // 创建路由守卫
  createGuard(router)
}
