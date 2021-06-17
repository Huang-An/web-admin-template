import VueRouter, { Location } from 'vue-router'

import { store } from '@/store'

/**
 * 创建权限路由守卫
 * @param router
 */
export function createPermissionGuard(router: VueRouter) {
  // 免登录可访问名单
  const whiteList: Array<string> = ['/login']

  // 免路径校验可访问名单
  const freePathList: Array<string> = ['/home', '/redirect', '/login', '/403', '/404']

  router.beforeEach(async (to, from, next) => {
    // 如果没有 token，跳转到登录页
    if (!store.getters['user/token']) {
      whiteList.includes(to.path) ? next() : next({ name: 'login' })
      return
    }

    // 如果未查询用户信息 查询用户信息
    if (!store.getters['user/hasQueryUserInfo']) {
      try {
        await store.dispatch('user/info')
        next({ ...(to as Location), replace: true })
      } catch (error) {
        await store.dispatch('user/loginOut')
        next({ name: 'login' })
      }
      return
    }

    // 如果不是免路径校验，进行校验
    if (!freePathList.includes(to.path)) {
      const accessPathList: Array<string> = store.getters['user/accessPathList']
      accessPathList.includes(to.path) ? next() : next({ name: '403' })
      return
    }

    // 如果前往登录页，就重定向到首页
    if (to.path === '/login') {
      next({ name: 'home' })
      return
    }

    next()
  })
}
