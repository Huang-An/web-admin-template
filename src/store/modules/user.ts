import { getStorage, setMultiStorage, removeMultiStorage } from 'plugin/helper'
import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { isArray, createPromise } from '@const-an/helper-core'
import { info } from 'api/user'

import { loginResult, infoResult } from 'api/user/type'

const path = require('path')

interface userStateInterface extends loginResult, infoResult {
  hasQueryUserInfo: boolean
  buttonMap: { [k: string]: button }
  accessPathList: Array<string>
}

const filterMenuList = (menuList: Array<menu>) => {
  const accessPathList: Array<string> = []
  const buttonMap: { [k: string]: button } = {}

  const recursion = (
    menuList: Array<menu>,
    accessPathList: Array<string>,
    buttonMap: { [k: string]: button },
    ascription: string = '/'
  ) => {
    for (let i = 0; i < menuList.length; i++) {
      const item = menuList[i]

      if (item.path) {
        const accessPath: string = path.resolve(ascription, item.path)

        // 可访问路径名单收集
        accessPathList.push(accessPath)

        if (item.type === 'button' && item.isShow) {
          buttonMap[accessPath] = {
            ascription: ascription,
            permission: accessPath,
            ...item,
            type: 'unknow'
          }
        }

        if (item.children && isArray(item.children) && item.children.length) {
          recursion(item.children, accessPathList, buttonMap, accessPath)
        }
      }
    }
  }

  recursion(menuList, accessPathList, buttonMap)

  return { accessPathList, buttonMap }
}

let state: userStateInterface = {
  hasQueryUserInfo: false,
  id: getStorage('id') || '',
  userName: getStorage('userName') || '',
  token: getStorage('token') || '',
  mobile: getStorage('mobile') || '',
  menuList: getStorage('menuList') || [],
  buttonMap: getStorage('buttonMap') || {},
  accessPathList: getStorage('accessPathList') || {}
}

let mutations: MutationTree<userStateInterface> = {
  /**
   * 设置是否查询过用户信息
   */
  SET_HAS_QUERY_USER_INFO(state: userStateInterface, hasQueryUserInfo: boolean) {
    state.hasQueryUserInfo = hasQueryUserInfo
  },

  /**
   * 设置 TOKEN
   */
  SET_AUTH_TOKEN(state: userStateInterface, userInfo: userStateInterface) {
    state.token = userInfo.token
    setMultiStorage(state)
  },

  /**
   * 设置用户信息
   */
  SET_USER_INFO(state: userStateInterface, userInfo: infoResult) {
    state.id = userInfo.id
    state.userName = userInfo.userName
    state.mobile = userInfo.mobile
    state.menuList = userInfo.menuList

    const { accessPathList, buttonMap } = filterMenuList(state.menuList)
    state.accessPathList = accessPathList
    state.buttonMap = buttonMap

    setMultiStorage(state)
  },

  /**
   * 清除用户信息
   */
  REMOVE_USER_INFO(state: userStateInterface) {
    state.hasQueryUserInfo = false
    state.id = ''
    state.userName = ''
    state.token = ''
    state.mobile = ''
    state.menuList = []
    state.accessPathList = []

    removeMultiStorage(Object.keys(state))
  }
}

let actions: ActionTree<userStateInterface, userStateInterface> = {
  // 登录成功 设置 token
  setAuthToken({ commit }, data) {
    commit('SET_AUTH_TOKEN', data)
  },

  // 查询用户信息
  async info({ commit }): Promise<infoResult> {
    try {
      const { result, code } = await info()
      if (code === 200) {
        commit('SET_USER_INFO', result)
        commit('SET_HAS_QUERY_USER_INFO', true)
        return result
      } else {
        throw result
      }
    } catch (error) {
      throw error
    }
  },

  // 退出登录
  loginOut({ commit, dispatch }) {
    const { promise, resolve } = createPromise()

    commit('REMOVE_USER_INFO')
    dispatch('app/closeApp', {}, { root: true })

    resolve(true)

    return promise
  }
}

let getters: GetterTree<userStateInterface, userStateInterface> = {
  hasQueryUserInfo(state: userStateInterface) {
    return state.hasQueryUserInfo
  },

  id(state: userStateInterface) {
    return state.id || getStorage('id')
  },

  userName(state: userStateInterface) {
    return state.userName || getStorage('userName')
  },

  token(state: userStateInterface) {
    return state.token || getStorage('token')
  },

  mobile(state: userStateInterface) {
    return state.mobile || getStorage('mobile')
  },

  menuList(state: userStateInterface) {
    return state.menuList || getStorage('menuList')
  },

  accessPathList(state: userStateInterface) {
    return state.accessPathList || getStorage('accessPathList')
  },

  buttonMap(state: userStateInterface) {
    return state.buttonMap || getStorage('buttonMap')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
