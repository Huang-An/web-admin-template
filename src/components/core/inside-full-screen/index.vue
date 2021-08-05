<template>
  <div :is="tag" @click="fullScreen">
    <com-icon :icon="!isFullscreen ? 'fa fa-expand' : 'fa fa-compress'" :size="14" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import screenfull, { Screenfull } from 'screenfull'

@Component({
  name: 'InsideFullScreen'
})
export default class InsideFullScreen extends Vue {
  /**
   * 组件渲染标签
   */
  @Prop({ type: String, default: 'div' }) tag!: string
  /**
   * 全屏 / 非全屏事件结束后的回调
   */
  @Prop({ type: Function }) callback!: Function

  isFullscreen: boolean = false

  fullScreen() {
    if (screenfull.isEnabled) {
      ;(screenfull as Screenfull).toggle()
    }
  }

  change() {
    this.isFullscreen = (screenfull as Screenfull).isFullscreen
    if (this.callback) this.callback(this.isFullscreen)
  }

  init() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.change)
    }
  }

  mounted() {
    this.init()
  }

  destroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.change)
    }
  }
}
</script>
