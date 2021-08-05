import { Vue, Component } from 'vue-property-decorator'
import { isEqualWith } from 'lodash'

@Component({
  name: 'MixinsDetail'
})
export default class MixinsDetail<Q = { [k: string]: any }> extends Vue {
  /**
   * 判断是否被 router cache
   */
  public isKeepAliveCache = false

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
      if (this.isKeepAliveCache) return

      this.init()
    })
  }

  public activated() {
    // 如果进入了该钩子，标记是被 keep-alive 缓存的组件
    this.isKeepAliveCache = true

    this.init()
  }
}
