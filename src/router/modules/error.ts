import { RouteConfig } from 'vue-router'

const errorRoutes: Array<RouteConfig> = [
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "error" */ 'views/error/403.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "error" */ 'views/error/404.vue')
  }
]

export default errorRoutes
