<template>
  <div class="inside-table__tool">
    <el-button v-for="(item, index) in toolsBtns" type="primary" :key="index" @click="toolsClick(item.methods)">
      <i
        v-if="buttonMap[item.permission] && buttonMap[item.permission].icon"
        :class="buttonMap[item.permission].icon"
      ></i>

      {{ buttonMap[item.permission] ? buttonMap[item.permission].title || item.title : item.title }}
    </el-button>

    <div class="custom-clear__fix table-tool__base">
      <el-popover
        v-if="isNeedColumnCheckbox"
        title="选择要展示的列"
        placement="bottom"
        trigger="click"
        width="150"
        style="margin-right: 10px"
      >
        <div>
          <el-checkbox v-for="item in column" :key="item.label" v-model="item.isShow">
            {{ item.label }}
          </el-checkbox>
        </div>

        <el-button slot="reference" icon="fa fa-fw fa-th-list" />
      </el-popover>

      <full-screen tag="el-button" class="navbar-tool__item" :callback="beforeFullscreen" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { isEmpty } from '@const-an/helper-core'
import { btnList } from '@/permission'
import { Getter } from 'vuex-class'

import fullScreen from '../inside-full-screen/index.vue'

@Component({
  name: 'insideTableTool',
  components: {
    fullScreen
  }
})
export default class insideTableTool extends Vue {
  @Getter('user/buttonMap') buttonMap!: { [k: string]: button }

  /**
   * 表格 列
   */
  @Prop({ type: Object, default: () => ({}) }) value!: column
  /**
   * 表格工具栏事件
   */
  @Prop({ type: Object, default: () => ({}) }) tools!: { [k: string]: Function }

  /**
   * 表格 列
   */
  column: column = this.value

  /**
   * 是否需要勾选表格可展示列
   */
  get isNeedColumnCheckbox() {
    return !isEmpty(this.column)
  }

  /**
   * 获取工具栏操作按钮
   */
  get toolsBtns() {
    const toolsKeys: Array<string> = Object.keys(this.tools)

    return btnList.filter(
      (item) =>
        item.type === 'table-tool' &&
        item.ascription === this.$route.path &&
        this.sysPermit(item.permission) &&
        item.methods &&
        toolsKeys.includes(item.methods)
    )
  }

  @Watch('column', { deep: true })
  columnHandler() {
    this.$emit('input', this.column)
  }

  // 全屏
  beforeFullscreen(isFullscreen: boolean) {
    const el = document.querySelector('body')
    if (el) {
      isFullscreen ? el.classList.add('table-mail-full') : el.classList.remove('table-mail-full')
    }
  }

  /**
   * 操作栏按钮点击后触发
   */
  toolsClick(methods: string) {
    if (this.tools.hasOwnProperty(methods)) {
      this.tools[methods]()
    } else {
      console.error(`table tools: ${methods} 方法未在 tools 中定义`)
    }
  }
}
</script>

<style lang="scss" scoped>
.inside-table__tool {
  height: 36px;
  .table-tool__base {
    float: right;
  }
}
</style>
