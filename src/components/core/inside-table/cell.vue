<template>
  <component
    v-if="isSingle"
    :is="renderConfigBySingle.tag"
    v-bind="renderConfigBySingle.attrs || {}"
    v-on="renderConfigBySingle.on || {}"
  >
    <table-cell v-if="renderConfigBySingle.children" :render-config="renderConfigBySingle.children" />

    {{ renderConfigBySingle.text }}
  </component>

  <div v-else class="render-cell__wrapper">
    <component
      v-for="(item, index) in renderConfig"
      :key="index"
      :is="item.tag"
      v-bind="item.attrs || {}"
      v-on="item.on || {}"
    >
      <table-cell v-if="item.children" :render-config="item.children" />

      {{ item.text }}
    </component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'tableCell'
})
export default class tableCell extends Vue {
  /**
   * 渲染 table cell 的配置
   */
  @Prop({ type: [Array], required: true }) renderConfig!: Array<tableCellNodeInterface>

  // 是否只是渲染根节点
  get isSingle() {
    return this.renderConfig.length === 1
  }

  // 获取根节点
  get renderConfigBySingle() {
    return this.renderConfig[0]
  }
}
</script>

<style lang="scss" scoped>
.render-cell__wrapper {
  display: inline-block;
  width: 100%;
}
</style>
