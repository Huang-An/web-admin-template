import axios from 'axios'
import { fail, loading, clear } from 'plugin/toast'

import {
  handleResponse,
  getHeaders,
  redirectUrl,
  insertErrorTipsWhiteUrl,
  removeErrorTipsWhiteUrl,
  isInErrorTipsWhiteList
} from './helper'

const fetch = axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_AXIOS_URL
})

fetch.interceptors.request.use(
  (config) => {
    config.url = redirectUrl(config.url)
    config.headers = getHeaders(config.url)
    return config
  },
  (error: any): Promise<never> => {
    clear()

    const url = error.config.url.replace(error.config.baseURL, '')

    // 如果不在白名单内 就弹窗提示
    if (!isInErrorTipsWhiteList(url)) {
      fail('网络开了点小差，请稍后重试~')
    }

    removeErrorTipsWhiteUrl(url)

    return Promise.reject(error)
  }
)

fetch.interceptors.response.use(
  async (response) => {
    clear()
    return handleResponse(response)
  },
  (error: any): Promise<never> => {
    clear()

    const url = error.config.url.replace(error.config.baseURL, '')

    // 如果不在白名单内 就弹窗提示
    if (!isInErrorTipsWhiteList(url)) {
      fail('网络开了点小差，请稍后重试~')
    }

    removeErrorTipsWhiteUrl(url)

    return Promise.reject(error)
  }
)

/**
 * post 请求
 * @param url
 * @param data
 * @param config
 */
export const post = <R = any, D = result<R>>(
  url: string,
  data?: any,
  config?: requestConfig
): Promise<axiosResponse<R, D>> => {
  let isErrorTips: boolean = true
  let isLoading: boolean = true
  let loadingTips: string = ''

  if (config && typeof config.isErrorTips === 'boolean') {
    isErrorTips = config.isErrorTips
  }

  if (config && typeof config.isLoading === 'boolean') {
    isLoading = config.isLoading
  }

  if (config && config.loadingTips) {
    loadingTips = config.loadingTips
  }

  loading(isLoading, loadingTips)

  // 如果不需要错误提示 往不需要错误提示的列表里面添加
  if (!isErrorTips) {
    insertErrorTipsWhiteUrl(url)
  }

  return fetch.post(url, data, config)
}

/**
 * get 请求
 * @param url
 * @param config
 */
export const get = <R = any, D = result<R>>(url: string, config?: requestConfig): Promise<axiosResponse<R, D>> => {
  let isErrorTips: boolean = true
  let isLoading: boolean = true
  let loadingTips: string = ''

  if (config && typeof config.isErrorTips === 'boolean') {
    isErrorTips = config.isErrorTips
  }

  if (config && typeof config.isLoading === 'boolean') {
    isLoading = config.isLoading
  }

  if (config && config.loadingTips) {
    loadingTips = config.loadingTips
  }

  loading(isLoading, loadingTips)

  // 如果不需要错误提示 往不需要错误提示的列表里面添加
  if (!isErrorTips) {
    insertErrorTipsWhiteUrl(url)
  }

  return fetch.get(url, config)
}

export default fetch
