import VueRouter from 'vue-router'

import { createProgressGuard } from './progress'
import { createPermissionGuard } from './permission'

/**
 * 创建路由守卫
 * @param router
 */
export function createGuard(router: VueRouter) {
  createPermissionGuard(router)

  createProgressGuard(router)
}
