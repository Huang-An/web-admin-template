<template>
  <el-table
    border
    ref="table"
    :data="data"
    :lazy="lazy"
    :load="load"
    :row-key="rowKey"
    :empty-text="emptyText"
    v-on="$listeners"
  >
    <slot></slot>

    <el-table-column
      v-for="(item, key) in needShowColumn"
      :key="key"
      :prop="key"
      :label="item.label"
      :width="item.width"
      :show-overflow-tooltip="item.overflow"
    >
      <template #default="{ row, $index }">
        <table-cell :render-config="renderCell(item, key, row, $index)" />
      </template>
    </el-table-column>

    <el-table-column v-if="insideActionBtns.length !== 0" :width="actionCellWidth" fixed="right" label="操作">
      <template #default="{ row, $index }">
        <div class="table-column__btn">
          <el-button
            v-for="(item, index) in computedActionBtns(row)"
            type="text"
            :key="index"
            :class="item.style ? `column-btn__${item.style}` : ''"
            @click="acionClick(row, $index, item.methods)"
          >
            {{ buttonMap[item.permission] ? buttonMap[item.permission].title || item.title : item.title }}
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { isEmpty } from '@const-an/helper-core'
import { btnList } from '@/permission'
import { Getter } from 'vuex-class'

import tableCell from './cell.vue'

// type
import { ElTable } from 'element-ui/types/table'

@Component({
  name: 'insideTable',
  components: {
    tableCell
  }
})
export default class insideTable extends Vue {
  @Ref('table') tableRef!: ElTable

  @Getter('user/buttonMap') buttonMap!: { [k: string]: button }

  /**
   * 表格数据，同 el-table data
   */
  @Prop({ type: Array, default: () => [] }) data!: []
  /**
   * 表格参数，详见 types/components/insideTable 中的 column
   */
  @Prop({ type: Object, default: () => ({}) }) column!: column
  /**
   * 需要显示的字段
   */
  @Prop({ type: Array, default: () => [] }) showColumn!: Array<string>
  /**
   * row-key 同 el-table row-key
   */
  @Prop({ type: String }) rowKey!: string
  /**
   * 操作栏事件 actions
   */
  @Prop({ type: Object, default: () => ({}) }) actions!: { [k: string]: Function }
  /**
   * 操作栏宽度 同 el-table width
   */
  @Prop({ type: [String, Number], default: 250 }) actionCellWidth!: string | number
  /**
   * 操作按钮集合 详见 types/shims-app 中的 button
   */
  @Prop({ type: Array, default: () => [] }) actionBtn!: Array<button>
  /**
   * 无数据时提示 同 el-table emptyText
   */
  @Prop({ type: String, default: '查无数据' }) emptyText!: string
  /**
   * 是否懒加载 同 el-table lazy
   */
  @Prop({ type: Boolean, default: false }) lazy!: boolean
  /**
   * 懒加载加载方法 同 el-table load
   */
  @Prop({ type: Function }) load!: Function

  /**
   * 过滤需要显示的列
   */
  get needShowColumn(): column {
    const needShowColumn: column = {}

    let defaultVNode = []

    if (this.$slots.default) {
      defaultVNode = this.$slots.default.filter((item) => {
        return (
          item.componentOptions && item.componentOptions.propsData && !(item.componentOptions.propsData as any).type
        )
      })
    }

    if (defaultVNode.length > 0) {
      return {}
    } else {
      Object.keys(this.column).forEach((key) => {
        if (this.showColumn.includes(key)) {
          needShowColumn[key] = this.column[key]
        }
      })
    }

    return needShowColumn
  }

  /**
   * 操作栏按钮
   */
  get insideActionBtns(): Array<button> {
    if (!isEmpty(this.actionBtn)) {
      return this.actionBtn.filter((item) => this.sysPermit(item.permission))
    }

    const actionsKeys: Array<string> = Object.keys(this.actions)

    return btnList.filter(
      (item) =>
        item.type === 'table-action' &&
        item.ascription === this.$route.path &&
        this.sysPermit(item.permission) &&
        item.methods &&
        actionsKeys.includes(item.methods)
    )
  }

  /**
   * 过滤满足条件的操作栏按钮
   */
  computedActionBtns(row: any): Array<button> {
    const computedActionBtns = this.insideActionBtns.filter((item) => {
      if (item.condition && typeof item.condition === 'function') {
        return item.condition(row)
      }

      return true
    })

    return computedActionBtns
  }

  /**
   * 操作栏按钮点击触发
   */
  acionClick(row: any, $index: number, methods: string) {
    if (this.actions.hasOwnProperty(methods)) {
      this.actions[methods](row, $index)
    } else {
      console.error(`table actions: ${methods} 方法未在 actions 中定义`)
    }
  }

  /**
   * 根据配置中的 render 生成 tableCellNodeInterface
   */
  renderCell(column: columnItem, key: string, row: any, $index: number): Array<tableCellNodeInterface> {
    if (column.render && typeof column.render === 'function') {
      const node = column.render(row)

      if (!node || typeof node === 'string') {
        return [{ tag: 'span', text: node }]
      }

      // 处理事件
      node.forEach((item) => {
        const originalOn = item.on || {}
        const targetOn: { [k: string]: Function } = {}
        Object.keys(originalOn).forEach((key) => {
          targetOn[key] = () => {
            originalOn[key](row, $index)
          }
        })
        item.on = targetOn
      })

      return node
    }

    return [{ tag: 'span', text: row[key] }]
  }
}
</script>

<style lang="scss" scoped>
.table-column__btn {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;

  .column-btn__info {
    color: $--const-gray-1;
  }
}
</style>
