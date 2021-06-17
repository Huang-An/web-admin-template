import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'mixinsTable'
})
export default class mixinsTable<S = any> extends Vue {
  /**
   * 判断组件是否已经初始化，不要重复定义
   * 开启了router cache 的页面 第一次进来会执行 activated mounted。
   * 为了避免重复执行请求，需要在 activated 时将其设为 true。在 mounted时，延迟执行。判断为 true 就不进行请求数据
   */
  public componentInit = false
  /**
   * 是否初始化就请求列表
   */
  public isInitGetList: boolean = true

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
      if (this.isInitGetList && !this.componentInit) {
        this.getList()
      }
    })
  }

  public activated() {
    // 如果已经初始化了就直接查询
    if (this.componentInit === true) {
      this.getList()
      return
    }

    // 如果还没有初始化 就判断 是否需要初始化就请求列表
    if (this.isInitGetList) {
      this.getList()
    }

    // 设置为 已经初始化
    this.componentInit = true
  }
}
