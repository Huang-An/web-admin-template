import { Vue, Component } from 'vue-property-decorator'
import { isEqualWith } from 'lodash'

@Component({
  name: 'mixinsDetail'
})
export default class mixinsDetail<Q = { [k: string]: any }> extends Vue {
  /**
   * 判断组件是否已经初始化，不要重复定义
   * 开启了router cache 的页面 第一次进来会依次执行 activated mounted。
   * 为了避免重复执行请求，需要在 activated 时将其设为 true。在 mounted时，延迟执行。判断为 true 就不进行请求数据
   */
  public componentInit = false

  // 获取详情查询条件
  public routeQuery: Q = {} as Q

  // 复制
  public init() {
    const query: Q = this.$route.query as any

    // 开启了 router cache 比对 新旧 router.query 是否有差异。有差异旧更新重新调用 getDetail 方法
    const isEqual = isEqualWith(this.routeQuery, query, (value, other) => {
      // 如果是数字 将转成字符串再进行比对。使得 1 === '1'
      if (typeof value === 'number' || typeof other === 'number') {
        return String(value) === String(other)
      }
    })

    if (!isEqual) {
      this.routeQuery = query
      ;(this as any).getDetail()
    }
  }

  public mounted() {
    this.$nextTick(() => {
      !this.componentInit && this.init()
    })
  }

  public activated() {
    this.componentInit = true
    this.init()
  }
}
