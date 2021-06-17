import '@/utils'

import Vue from 'vue'
import App from '@/App.vue'

import { setupApp } from '@/setup'
import { router } from '@/router'
import { store } from '@/store'

setupApp(Vue)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
