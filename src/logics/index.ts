import { dateFormat } from 'plugin/helper'
import { frontLogUpdate } from 'api/monitor'

// type
import { VueConstructor } from 'vue/types/umd'
import { frontLogUpdateParams } from 'api/monitor/type'

/**
 * 生成错误日志
 * @param info
 * @returns
 */
const generalErrorInfo = (info: Partial<frontLogUpdateParams>): frontLogUpdateParams => {
  const errorInfo = {
    errorUrl: window.location.href,
    equipment: window.navigator.userAgent,
    errorDate: dateFormat(new Date()),
    ...info
  }

  return errorInfo as frontLogUpdateParams
}

/**
 * 提交错误日志
 * @param info
 * @returns
 */
const commitErrorInfo = async (errorInfo: frontLogUpdateParams) => {
  try {
    await frontLogUpdate(errorInfo, { isLoading: false })
  } catch (error) {
    console.error(error)
  }
}

/**
 * 格式化组件名称
 * @param vm
 * @returns
 */
const formatComponentName = function (vm: Vue): {
  name: string
  path: string
} {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root'
    }
  }

  const options = vm.$options as any
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous'
    }
  }

  const name = options.name || options._componentTag
  return {
    name: name,
    path: options.__file
  }
}

/**
 * 处理错误堆栈信息
 * @param error
 */
const processStackMsg = function (error: Error): string {
  if (!error.stack) {
    return ''
  }

  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, '') // Remove redundant parameters of js file links (?x=1 and the like)

  const msg = error.toString()

  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack
  }

  return stack
}

/**
 * vue 错误处理
 * @param error
 * @param vm
 * @param info
 */
const vueErrorHandler = function (error: Error, vm: Vue, info: string) {
  const { name, path } = formatComponentName(vm)

  const errorInfo = generalErrorInfo({
    errorInfo: error.message,
    errorStack: processStackMsg(error),
    errorTag: `vue@path:${path}, name:${name}`,
    remark: info
  })

  commitErrorInfo(errorInfo)
}

/**
 * 脚本错误处理
 * @param event
 * @param source
 * @param lineno
 * @param colno
 * @param error
 * @returns
 */
const scriptErrorHandler = function (
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) {
  if (event === 'Script error.' && !source) {
    return false
  }

  const errorInfo = generalErrorInfo({
    errorInfo: event as string,
    errorTag: source as string,
    errorStack: error ? error.stack || '' : '',
    remark: `lineno: ${lineno}`
  })

  commitErrorInfo(errorInfo)

  return true
}

/**
 * Promise error handling
 */
const registerPromiseErrorHandler = function () {
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const errorInfo = generalErrorInfo({
        errorInfo: 'promise error',
        errorTag: 'promise',
        errorStack: event.reason,
        remark: 'promise error!'
      })

      commitErrorInfo(errorInfo)
    },
    true
  )
}

/**
 * 监视资源加载错误（img、脚本、css和jsonp）
 */
const registerResourceErrorHandler = function () {
  window.addEventListener(
    'error',
    function (e: Event) {
      const target = e.target ? e.target : ({} as any)

      const errorInfo = generalErrorInfo({
        errorInfo: target.localName + ' is load error',
        errorTag: target.currentSrc,
        errorStack: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type
        }),
        remark: 'resouce is not found'
      })
    },
    true
  )
}

/**
 * 启动错误监控
 * @param Vue
 */
export function setupErrorHandle(Vue: VueConstructor) {
  // 需要开启错误日志上传的环境
  const env = ['production']

  // 不开启 直接返回
  if (!env.includes(process.env.NODE_ENV)) {
    return false
  }

  console.log('--------------开启前端错误日志监控-----------------')

  Vue.config.errorHandler = vueErrorHandler

  window.onerror = scriptErrorHandler

  registerPromiseErrorHandler()

  registerResourceErrorHandler()
}
