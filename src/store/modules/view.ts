import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { createPromise } from '@const-an/helper-core'
import { router } from '@/router'
import { Route } from 'vue-router'

interface tagsViewInterface {
  tagsViews: Array<Route>
  cacheViews: Array<string>
}

let state: tagsViewInterface = {
  tagsViews: [],
  cacheViews: []
}

let mutations: MutationTree<tagsViewInterface> = {
  // 添加一个 tag view
  ADD_TAGS_VIEW: (state: tagsViewInterface, view: Route) => {
    const tagsViews = state.tagsViews
    for (let i = 0, l = tagsViews.length; i < l; i++) {
      if (tagsViews[i].path === view.path) {
        tagsViews[i] = view
        state.tagsViews = tagsViews
        return
      }
    }
    tagsViews.push(Object.assign({}, view))
    state.tagsViews = tagsViews
  },

  // 添加一个 cache view
  ADD_CACHE_VIEW: (state: tagsViewInterface, view: Route) => {
    if (view.name && !state.cacheViews.includes(view.name)) {
      view.meta.cache && state.cacheViews.push(view.name)
    }
  },

  // 删除一个 tag view
  DEL_TAGS_VIEW: (state: tagsViewInterface, view: Route) => {
    for (const [i, v] of state.tagsViews.entries()) {
      if (v.path === view.path && !view.meta.affix) {
        state.tagsViews.splice(i, 1)
        break
      }
    }
  },

  // 删除一个 cache view
  DEL_CACHE_VIEW: (state: tagsViewInterface, view: Route) => {
    if (view.name) {
      const index: number = state.cacheViews.indexOf(view.name)
      index > -1 && state.cacheViews.splice(index, 1)
    }
  },

  // 删除其他的 tag view
  DEL_OTHERS_TAGS_VIEWS: (state: tagsViewInterface, view: Route) => {
    state.tagsViews = state.tagsViews.filter((v: Route) => v.meta.affix || v.path === view.path)
  },

  // 删除其他的 cache view
  DEL_OTHERS_CACHE_VIEWS: (state: tagsViewInterface, view) => {
    const index: number = state.cacheViews.indexOf(view.name)
    state.cacheViews = index > -1 ? state.cacheViews.slice(index, index + 1) : []
  },

  // 删除全部 tag view
  DEL_ALL_TAGS_VIEWS: (state: tagsViewInterface) => {
    // keep affix tags
    const affixTags: Array<Route> = state.tagsViews.filter((tag) => tag.meta.affix)
    state.tagsViews = affixTags
  },

  // 删除全部 cache view
  DEL_ALL_CACHE_VIEWS: (state) => {
    state.cacheViews = []
  }
}

let actions: ActionTree<tagsViewInterface, tagsViewInterface> = {
  // add tags view aciton and cache view aciton
  addView({ dispatch }, view: Route) {
    dispatch('addTagsView', view)
    dispatch('addCacheView', view)
  },

  // add tags view aciton
  addTagsView({ commit }, view: Route) {
    commit('ADD_TAGS_VIEW', view)
  },

  // add tags cache aciton
  addCacheView({ commit }, view: Route) {
    commit('ADD_CACHE_VIEW', view)
  },

  // delete tags view aciton and cache view aciton
  delView({ dispatch, state }, view: Route) {
    const { promise, resolve } = createPromise()

    dispatch('delTagsView', view)
    dispatch('delCacheView', view)
    resolve({
      tagsViews: [...state.tagsViews],
      cacheViews: [...state.cacheViews]
    })

    return promise
  },

  // delete tags view aciton
  delTagsView({ commit, state }, view: Route) {
    const { promise, resolve } = createPromise()

    commit('DEL_TAGS_VIEW', view)
    resolve([...state.tagsViews])

    return promise
  },

  // delete cache view aciton
  delCacheView({ commit, state }, view: Route) {
    const { promise, resolve } = createPromise()

    commit('DEL_CACHE_VIEW', view)
    resolve([...state.cacheViews])

    return promise
  },

  // delete others tags view aciton and others cache view aciton
  delOthersViews({ dispatch, state }, view: Route) {
    const { promise, resolve } = createPromise()

    dispatch('delOthersTagsViews', view)
    dispatch('delOthersCacheViews', view)
    resolve({
      tagsViews: [...state.tagsViews],
      cacheViews: [...state.cacheViews]
    })

    return promise
  },

  // delete others tags view aciton
  delOthersTagsViews({ commit, state }, view: Route) {
    const { promise, resolve } = createPromise()

    commit('DEL_OTHERS_TAGS_VIEWS', view)
    resolve([...state.tagsViews])

    return promise
  },

  // delete others cache view aciton
  delOthersCacheViews({ commit, state }, view: Route) {
    const { promise, resolve } = createPromise()

    commit('DEL_OTHERS_CACHE_VIEWS', view)
    resolve([...state.cacheViews])

    return promise
  },

  // delete all tags view aciton and all cache view aciton
  delAllViews({ dispatch, state }) {
    const { promise, resolve } = createPromise()

    dispatch('delAllTagsViews')
    dispatch('delAllCacheViews')
    resolve({
      tagsViews: [...state.tagsViews],
      cacheViews: [...state.cacheViews]
    })

    return promise
  },

  // delete all tags view aciton
  delAllTagsViews({ commit, state }) {
    const { promise, resolve } = createPromise()

    commit('DEL_ALL_TAGS_VIEWS')
    resolve([...state.tagsViews])

    return promise
  },

  // delete all cache view aciton
  delAllCacheViews({ commit, state }) {
    const { promise, resolve } = createPromise()

    commit('DEL_ALL_CACHE_VIEWS')
    resolve([...state.cacheViews])

    return promise
  },

  // 返回上一个页面
  routeBack({ dispatch }, view: Route) {
    // 如果是首页不返回
    if (view.meta.home) return
    dispatch('delView', view).then(({ tagsViews }) => {
      const fromPath: string = view.query.fromPath as string
      const latestView: Route = tagsViews.slice(-1)[0]
      if (fromPath) {
        router.push(fromPath)
      } else if (view.meta.back) {
        router.push({ name: view.meta.back })
      } else if (latestView) {
        router.push(latestView.fullPath)
      }
    })
  }
}

let getters: GetterTree<tagsViewInterface, tagsViewInterface> = {
  tagsViews(state: tagsViewInterface) {
    return state.tagsViews
  },

  cacheViews(state: tagsViewInterface) {
    return state.cacheViews
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
