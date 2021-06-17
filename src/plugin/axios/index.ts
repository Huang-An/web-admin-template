import fetch from './fetch'

// type
import { VueConstructor } from 'vue/types/umd'

export const setupRegisterAxios = (Vue: VueConstructor<Vue>) => {
  Vue.prototype.$fetch = fetch
}
