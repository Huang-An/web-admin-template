import { RouteConfig } from 'vue-router'

import layout from 'layout/index.vue'

const rootRoutes: Array<RouteConfig> = [
  {
    path: '/system',
    component: layout,
    children: [
      /**
       * 用户管理
       */
      {
        path: 'user-manage',
        name: 'userManage',
        meta: { title: '用户管理', cache: true },
        component: () => import(/* webpackChunkName: "user-manage" */ 'views/system/user-manage/index.vue')
      },
      {
        path: 'user-manage/add',
        name: 'userManageAdd',
        meta: { title: '添加用户', cache: true },
        component: () => import(/* webpackChunkName: "user-manage" */ 'views/system/user-manage/add.vue')
      },
      {
        path: 'user-manage/edit',
        name: 'userManageEdit',
        meta: { title: '编辑用户', cache: true },
        component: () => import(/* webpackChunkName: "user-manage" */ 'views/system/user-manage/edit.vue')
      }
    ]
  }
]

export default rootRoutes
