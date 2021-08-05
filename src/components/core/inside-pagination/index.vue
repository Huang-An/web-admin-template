<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="pageSizes"
    :current-page="currentPageInfo.pageIndex"
    :page-size="currentPageInfo.pageSize"
    :total="currentTotal"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'InsidePagination'
})
export default class InsidePagination extends Vue {
  /**
   * 总条数 同 el-pagination total
   */
  @Prop({ type: Number, default: 0 }) total!: number
  /**
   * 可选页数配置 同 el-pagination pageSizes
   */
  @Prop({ type: Array, default: () => [10, 50, 100] }) pageSizes!: Array<number>
  /**
   * 分页信息
   */
  @Prop({
    type: Object,
    default: () => ({
      pageIndex: 1,
      pageSize: 10
    })
  })
  pageInfo!: pageInfo

  get currentTotal(): number {
    return this.total
  }

  currentPageInfo: pageInfo = this.pageInfo

  @Watch('pageInfo')
  pageInfoHandler() {
    this.currentPageInfo = this.pageInfo
  }

  // 翻页
  handleCurrentChange(value: number) {
    this.currentPageInfo.pageIndex = value
    this.$emit('current-change', this.currentPageInfo)
  }

  // 页数改变时
  handleSizeChange(value: number) {
    this.currentPageInfo.pageSize = value
    this.$emit('size-change', this.currentPageInfo)
  }
}
</script>
