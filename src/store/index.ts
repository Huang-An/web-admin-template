import Vuex, { Store } from 'vuex'

// type
import { VueConstructor } from 'vue/types/umd'

const files = require.context('./modules', false, /\.ts$/)

const modules: {
  [k: string]: any
} = {}

files.keys().forEach((key: string) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export let store!: Store<unknown>

export const setupRegisterStore = (Vue: VueConstructor<Vue>) => {
  Vue.use(Vuex)

  store = new Vuex.Store({
    modules
  })
}
