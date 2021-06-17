import { RouteConfig } from 'vue-router'

import layout from 'layout/index.vue'

const rootRoutes: Array<RouteConfig> = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页', affix: true, home: true },
        component: () => import(/* webpackChunkName: "home" */ 'views/home/index.vue')
      },
      {
        path: 'redirect',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ 'views/login/index.vue')
  }
]

export default rootRoutes
