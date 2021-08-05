import { Vue, Component } from 'vue-property-decorator'

export default function createMixinsTable<S = any>() {
  @Component({
    name: 'MixinsTable'
  })
  class MixinsTable extends Vue {
    /**
     * 判断是否被 router cache
     */
    public isKeepAliveCache = false

    // 查询条件
    public searchMap: baseListParams<S> = {
      pageIndex: 1,
      pageSize: 10,
      search: {} as S
    }

    public get pageInfo(): pageInfo {
      return {
        pageIndex: this.searchMap.pageIndex,
        pageSize: this.searchMap.pageSize
      }
    }

    public total: number = 0

    public getList() {}

    // 查询
    public onQuery(queryMap: S) {
      this.searchMap.pageIndex = 1
      this.searchMap.search = queryMap
      this.getList()
    }

    // 重置
    public onReset(resetMap: S) {
      this.searchMap.pageIndex = 1
      this.searchMap.search = resetMap
    }

    // 页数改变
    public currentChange(page: pageInfo) {
      this.searchMap.pageIndex = page.pageIndex
      this.getList()
    }

    // 行数改变
    public sizeChange(page: pageInfo) {
      this.searchMap.pageSize = page.pageSize
      this.getList()
    }

    public mounted() {
      this.$nextTick(() => {
        if (this.isKeepAliveCache) return

        this.getList()
      })
    }

    public activated() {
      // 如果进入了该钩子，标记是被 keep-alive 缓存的组件
      this.isKeepAliveCache = true

      this.getList()
    }
  }

  return MixinsTable
}
