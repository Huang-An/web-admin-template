import { Loading, Notification } from 'element-ui'

let loadingInstance: any = null
let loadingCount: number = 0

export const success = (message: string = '成功') => {
  Notification.success({
    title: '成功',
    message: message
  })
}

export const fail = (message: string = '错误') => {
  Notification.error({
    title: '错误',
    message: message
  })
}

export const loading = (isLoading: boolean, message: string = '') => {
  if (isLoading) {
    loadingInstance = Loading.service({
      lock: true,
      text: message,
      customClass: 'common-loading',
      spinner: 'fa fa-pulse fa-spinner'
    })
  }
  // 记录 调用 loading 次数 避免多次请求时，提前取消loading
  loadingCount++
}

export const clear = () => {
  if (loadingCount > 0) loadingCount--
  if (loadingCount === 0 && loadingInstance) {
    loadingInstance.close()
  }
}
