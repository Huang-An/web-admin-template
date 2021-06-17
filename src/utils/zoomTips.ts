import { MessageBox } from 'element-ui'
import { store } from '@/store'

let isZoomTips = false

const zoomTips = async () => {
  const ratio = /macintosh|mac os x/i.test(navigator.userAgent) ? 2 : 1

  if (window.devicePixelRatio !== ratio && !store.getters['app/zoomTips'] && !isZoomTips) {
    isZoomTips = true
    try {
      await MessageBox.confirm(
        '页面缩放比例不正确，可能会影响某些功能使用，尝试使用快捷键(ctrl+0)将缩放比例调整为100%',
        '提示',
        {
          type: 'warning',
          confirmButtonText: '不再提示'
        }
      )
      isZoomTips = false
      store.dispatch('app/setZoomTips', true)
    } catch (error) {
      isZoomTips = false
    }
  }
}

window.addEventListener('load', zoomTips)

window.addEventListener('resize', zoomTips)
