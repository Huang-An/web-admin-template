import { isArray, isObject } from '@const-an/helper-core'

// 全局应用名称 避免冲突
const GLOBAL_NAME = process.env.VUE_APP_GLOBAL_NAME

/**
 * 设置单个 localStorage
 */
export const setStorage = (key: string, value: any, type: string = 'local') => {
  const storage = type === 'local' ? window.localStorage : window.sessionStorage

  if (isArray(value) || isObject(value)) {
    storage.setItem(`${GLOBAL_NAME}-${key}`, JSON.stringify(value))
  } else {
    storage.setItem(`${GLOBAL_NAME}-${key}`, value)
  }
}

/**
 * 获取单个 localStorage
 */
export const getStorage = (key: string, type: string = 'local'): any => {
  const storage = type === 'local' ? window.localStorage : window.sessionStorage

  let value: string | null = storage.getItem(`${GLOBAL_NAME}-${key}`)
  let result = null

  if (value) {
    try {
      result = JSON.parse(value)
    } catch (error) {
      result = value
    }
  } else {
    result = value
  }

  return result
}

/**
 * 清除单个 localStorage
 */
export const removeStorage = (key: string, type: string = 'local') => {
  const storage = type === 'local' ? window.localStorage : window.sessionStorage

  storage.removeItem(`${GLOBAL_NAME}-${key}`)
}

/**
 * 设置多个 localStorage
 */
export const setMultiStorage = (map: { [k: string]: any }, type: string = 'local') => {
  Object.keys(map).forEach((key: string) => setStorage(key, map[key]), type)
}

/**
 * 获取多个 localStorage
 */
export const getMultiStorage = (array: Array<string>, type: string = 'local'): { [k: string]: any } => {
  const map: { [k: string]: any } = {}
  array.forEach((key) => (map[key] = getStorage(key, type)))
  return map
}

/**
 * 清除多个 localStorage
 */
export const removeMultiStorage = (array: Array<string>, type: string = 'local') => {
  array.forEach((key: string) => removeStorage(key, type))
}
