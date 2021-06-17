import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { getStorage, setStorage } from 'plugin/helper'

interface appStateInterface {
  /**
   * 侧边栏状态
   */
  sidebarStatus: boolean
  /**
   * app 组件大小
   */
  appSize: string
  /**
   * 缩放提示
   */
  zoomTips: boolean
}

let state: appStateInterface = {
  sidebarStatus: getStorage('sidebarStatus'),
  appSize: getStorage('appSize'),
  zoomTips: getStorage('zoomTips')
}

let mutations: MutationTree<appStateInterface> = {
  // 切换侧边栏开关
  TOGGLE_SIDEBAR(state: appStateInterface) {
    state.sidebarStatus = !state.sidebarStatus
    setStorage('sidebarStatus', state.sidebarStatus)
  },

  // 设置大小
  SET_APP_SIZE(state: appStateInterface, appSize: string) {
    state.appSize = appSize
    setStorage('appSize', state.appSize)
  },

  // 设置是否需要缩放提示
  SET_ZOOM_TIPS(state: appStateInterface, zoomTips: boolean) {
    state.zoomTips = zoomTips
    setStorage('zoomTips', state.zoomTips)
  }
}

let actions: ActionTree<appStateInterface, appStateInterface> = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },

  setAppSize({ commit }, appSize: string) {
    commit('SET_APP_SIZE', appSize)
  },

  setZoomTips({ commit }, zoomTips: boolean) {
    commit('SET_ZOOM_TIPS', zoomTips)
  },

  cleanSettings({ commit, dispatch }) {
    dispatch('closeApp')
    commit('SET_APP_SIZE', 'medium')
    commit('SET_ZOOM_TIPS', false)
  },

  closeApp({ commit, dispatch }) {
    commit('user/SET_HAS_QUERY_USER_INFO', false, { root: true })
    dispatch('view/delAllViews', {}, { root: true })
  }
}

let getters: GetterTree<appStateInterface, appStateInterface> = {
  sidebarStatus(state: appStateInterface) {
    return state.sidebarStatus || getStorage('sidebarStatus')
  },

  appSize(state: appStateInterface) {
    return state.appSize || getStorage('appSize')
  },

  zoomTips(state: appStateInterface) {
    return state.zoomTips || getStorage('zoomTips')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
