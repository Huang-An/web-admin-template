type column<R = any> = {
  [k in keyof R]?: string | columnItem<R>
}

interface columnItem<R = any> {
  /**
   * 列 中文名称 同 el-table label
   */
  label: string
  /**
   * 列 宽度 同 el-table width
   */
  width?: string
  /**
   * 列 最小宽度 同 el-table minWidth
   */
  minWidth?: string
  /**
   * 列 是否超出隐藏，使用省略号
   */
  overflow?: boolean
  /**
   * 列 是否隐藏
   */
  isShow?: boolean
  /**
   * 列 是否为树节点 同 vxe-table 的 tree-node 树表格时 有一列需要传
   */
  treeNode?: boolean
  /**
   * 列 自定义需要渲染成什么
   * 默认情况下 可以不传。此时会拿 key 对应数据 同 el-table props
   * 传时，如果返回值是字符串，就显示字符串
   * 如果是 table cell node， 会渲染成 inside-table 里的 cell 具体看 tableCellNodeInterface
   */
  render?: (row: R) => string | Array<tableCellNodeInterface>
}

interface tableCellNodeInterface {
  /**
   * 需要将 table cell 渲染成什么，可以是组件名称，会通过 is 属性渲染
   */
  tag: string
  /**
   * table cell 文本
   */
  text?: string
  /**
   * 在 table cell 上的监听事件，会通过 v-on 注册
   */
  on?: { [k: string]: Function }
  /**
   * 在 table cell 上的属性，会通过 v-bind 注册
   */
  attrs?: { [k: string]: any }
  /**
   * table cell 子结点 会通过递归组件循环渲染
   */
  children?: Array<tableCellNodeInterface>
}
