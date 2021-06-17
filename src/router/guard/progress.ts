import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 创建进度条守卫
 * @param router
 */
export function createProgressGuard(router: VueRouter) {
  // 开启进度条
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })

  // 关闭进度条
  router.afterEach(() => {
    setTimeout(() => NProgress.done(), 100)
  })
}
