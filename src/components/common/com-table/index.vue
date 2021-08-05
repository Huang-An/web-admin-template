<template>
  <div class="table-wrapper">
    <el-card shadow="never" class="query-form__wrapper">
      <inside-query-form
        ref="queryForm"
        :query="query"
        :default-query-data="defaultQueryData"
        :overflow-show-more="queryOverflowShowMore"
        :cache-name="queryCacheName"
        v-on="queryFromEventMap"
      />
      <slot name="query" />
    </el-card>

    <el-card shadow="never" class="inside-table__wrapper">
      <inside-table-tool slot="header" v-model="insideColumn" :tools="tools" />

      <slot name="tabs" />

      <inside-table
        :data="data"
        :column="insideColumn"
        :show-column="showColumn"
        :actions="actions"
        :row-key="rowKey"
        :action-cell-width="actionCellWidth"
        :action-btn="actionBtn"
        :empty-text="emptyText"
        :lazy="lazy"
        :load="load"
        v-on="tableEventMap"
      >
        <slot v-bind:showColumn="showColumn" />
      </inside-table>

      <inside-pagination class="pagination-wrapper" :page-info="pageInfo" :total="total" v-on="paginationEventMap" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { insideQueryForm, insideTableTool, insideTable, insidePagination } from 'components/core'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

const defaultColumnOptions = {
  isShow: true
}

@Component({
  name: 'ComTable',
  components: {
    insideQueryForm,
    insideTableTool,
    insideTable,
    insidePagination
  }
})
export default class ComTable extends Vue {
  /**
   * 表格数据，同 el-table data
   */
  @Prop({ type: Array, default: () => [] }) data!: []
  /**
   * 表格 row-key 同 el-table row-key
   */
  @Prop({ type: String }) rowKey!: string
  /**
   * 表格参数，详见 types/components/insideTable 中的 column
   */
  @Prop({ type: Object, default: () => ({}) }) column!: column
  /**
   * 表格 操作栏事件 actions
   */
  @Prop({ type: Object, default: () => ({}) }) actions!: {}
  /**
   * 表格 操作栏宽度 同 el-table width
   */
  @Prop({ type: [String, Number] }) actionCellWidth!: string | number
  /**
   * 表格 操作按钮集合 详见 types/shims-app 中的 button
   */
  @Prop({ type: Array, default: () => [] }) actionBtn!: Array<button>
  /**
   * 表格 无数据时提示 同 el-table emptyText
   */
  @Prop({ type: String, default: '查无数据' }) emptyText!: string
  /**
   * 表格 是否懒加载 同 el-table lazy
   */
  @Prop({ type: Boolean, default: false }) lazy!: boolean
  /**
   * 表格 懒加载加载方法 同 el-table load
   */
  @Prop({ type: Function }) load!: Function

  /**
   * 表单 配置 query，详见 types/components/insideQueryForm 中的 query
   */
  @Prop({ type: Object, default: () => ({}) }) query!: query
  /**
   * 表单 默认查询数据
   */
  @Prop({ type: Object }) defaultQueryData!: any
  /**
   * 表单 是否需要超出显示更多
   */
  @Prop({ type: Boolean, default: false }) queryOverflowShowMore!: boolean
  /**
   * 表单 缓存 localStorage name 有值才缓存
   */
  @Prop({ type: String }) queryCacheName!: string

  /**
   * 表格工具栏事件
   */
  @Prop({ type: Object, default: () => ({}) }) tools!: {}

  /**
   * 分页 分页信息
   */
  @Prop({ type: Object }) pageInfo!: object
  /**
   * 分页 总条数 同 el-pagination total
   */
  @Prop({ type: Number, default: 0 }) total: number = 0

  insideColumn: { [k: string]: columnItem } = {}

  @Watch('column', { immediate: true })
  columnHandler() {
    const insideColumn: { [k: string]: columnItem } = {}
    Object.keys(this.column).forEach((key) => {
      const item = this.column[key] as string | columnItem
      if (typeof item === 'string') {
        insideColumn[key] = {
          label: item,
          ...defaultColumnOptions
        }
      } else {
        insideColumn[key] = {
          ...defaultColumnOptions,
          ...item
        }
      }
    })
    this.insideColumn = insideColumn
  }

  // 筛选出显示的表格列
  get showColumn() {
    const showColumn = Object.keys(this.insideColumn).map((key) => {
      if (this.insideColumn[key].isShow) {
        return key
      }
    })
    return showColumn
  }

  get queryFromEventMap() {
    const eventType = ['on-query', 'on-reset']
    const eventMap: Record<string, Function | Function[]> = {}
    eventType.forEach((type) => {
      if (this.$listeners[type]) {
        eventMap[type] = this.$listeners[type]
      }
    })
    return eventMap
  }

  get tableEventMap() {
    const eventType = ['selection-change']
    const eventMap: Record<string, Function | Function[]> = {}
    eventType.forEach((type) => {
      if (this.$listeners[type]) {
        eventMap[type] = this.$listeners[type]
      }
    })
    return eventMap
  }

  get paginationEventMap() {
    const eventType = ['size-change', 'current-change']
    const eventMap: Record<string, Function | Function[]> = {}
    eventType.forEach((type) => {
      if (this.$listeners[type]) {
        eventMap[type] = this.$listeners[type]
      }
    })
    return eventMap
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  .query-form__wrapper {
    margin-bottom: 15px;
    border: none;
    border-radius: unset;
  }

  .inside-table__wrapper {
    border: none;
    border-radius: unset;
  }

  .pagination-wrapper {
    margin: 15px -10px 0 0;
    text-align: right;
  }
}
</style>
