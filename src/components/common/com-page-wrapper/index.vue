<template>
  <el-card shadow="never" class="com-page__wrapper" :body-style="insideBodyStyle">
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'comPageWrapper'
})
export default class comPageWrapper extends Vue {
  /**
   * body style
   */
  @Prop({ type: Object }) bodyStyle!: object

  insideBodyStyle: { [k: string]: string } = {
    ...this.bodyStyle,
    height: '100%',
    'overflow-y': 'scroll'
  }
}
</script>

<style lang="scss" scoped>
.com-page__wrapper {
  height: 100%;
  overflow: hidden;
  border: none;
  border-radius: unset;
}
</style>
