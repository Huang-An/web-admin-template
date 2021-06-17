import { store } from '@/store'
import { router } from '@/router'
import { fail } from 'plugin/toast'
import { getStorage } from 'plugin/helper'
import { external } from '@const-an/regexp'

import { AxiosResponse } from 'axios'

// 不需要错误提示的状态码
const unErrorCode: Array<string | number> = [200, 401, 403]

// 头部需要的字段
// 可能有些接口不需要某些字段，通过test方法返回 trun 或 false 来判断是否需要这个字段
// test 接受一个参数为接口路径
const headersOption: {
  [k: string]: {
    val: (path?: string) => {}
    test: (path?: string) => boolean
  }
} = {
  'X-Auth-Token': {
    val: () => (store ? store.getters['user/token'] : getStorage('token')),
    test: (path?: string): boolean => {
      // 接口白名单
      const whiteList: Array<string> = ['/user/login']
      return !whiteList.includes(path || '')
    }
  }
}

// 错误提示的白名单列表
const errorTipsWhiteList: Array<string> = []

// 处理回调
export const handleResponse = (response: AxiosResponse): Promise<axiosResponse | AxiosResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (response.headers['content-type'].indexOf('application/json') !== -1) {
        let url = ''

        if (response.config.url && response.config.baseURL) {
          url = response.config.url.replace(response.config.baseURL, '')
        }

        const { code, msg, data } = response.data

        if (!isInErrorTipsWhiteList(url) && code && !unErrorCode.includes(code)) {
          fail(msg || '网络开了点小差，请稍后重试~')
        }

        removeErrorTipsWhiteUrl(url)

        if (code === 401) {
          fail(msg || '用户信息过期，请重新登录~')
          await store.dispatch('user/loginOut')
          router.replace({ name: 'login' })
        }

        resolve({
          ...response,
          result: data,
          code: code,
          msg: msg
        })
      } else {
        resolve(response)
      }
    } catch (error) {
      reject(error)
    }
  })
}

// 返回请求头
export const getHeaders = (path: string | undefined): any => {
  const header: any = {}
  Object.keys(headersOption).forEach((key: string) => {
    if (headersOption[key].test(path)) {
      header[key] = headersOption[key].val(path)
    }
  })
  return header
}

// 重定向请求地址
// 如果需要请求mock接口，在请求路径前面加上 "/mock/", 重定向到mock服务器
export const redirectUrl = (path: string | undefined): string | undefined => {
  if (path && external.test(path)) {
    return path
  } else {
    const _path: string = path || ''
    const redirectUrl: string = _path.replace(/\/mock\//, '/')
    // 需要mock
    if (/^\/mock\/(.*)$/.test(_path) && process.env.VUE_APP_MOCK_URL) {
      return `${process.env.VUE_APP_MOCK_URL}${redirectUrl}`
    }
    return redirectUrl
  }
}

// 添加错误提示白名单列表
export const insertErrorTipsWhiteUrl = (url: string) => {
  if (errorTipsWhiteList.indexOf(url) === -1) {
    errorTipsWhiteList.push(url)
  }
}

// 从错误提示白名单列表中删除
export const removeErrorTipsWhiteUrl = (url: string) => {
  const index: number = errorTipsWhiteList.indexOf(url || '')
  errorTipsWhiteList.splice(index, 1)
}

// 判断是否在白名单中
export const isInErrorTipsWhiteList = (url: string) => errorTipsWhiteList.includes(url)
