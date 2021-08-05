<template>
  <i :class="this.icon" :style="iconStyle"></i>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'ComIcon'
})
export default class ComIcon extends Vue {
  /**
   * 图标名称 详细见 fontawesome
   */
  @Prop({ type: String, default: '' }) icon!: string
  /**
   * 图标大小
   */
  @Prop({ type: Number }) size!: number
  /**
   * 图标颜色
   */
  @Prop({ type: String, default: '' }) color!: string

  get iconStyle(): { [k: string]: string } {
    const iconStyle: { [k: string]: string } = {}
    if (this.size) {
      iconStyle.fontSize = this.size + 'px'
    }
    if (this.color) {
      iconStyle.color = this.color
    }
    return iconStyle
  }
}
</script>
