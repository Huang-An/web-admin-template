interface String {
  format: (fmt?: string) => string
}

interface Number {
  format: (fmt?: string) => string
}

interface Date {
  format: (fmt?: string) => string
}

type dispatchOptions = {
  /**
   * dispatch 方法优化项 指定从那个节点开始遍历 默认从 vue this.$root 根节点开始
   */
  root?: Vue
  /**
   * dispatch 方法优化项 指定遍历多少次结束 默认遍历完整棵树
   */
  level?: number
}

type menu = {
  /**
   * id
   */
  id: string | number
  /**
   * 路径
   */
  path: string
  /**
   * title
   */
  title: string
  /**
   * 类型
   * sidebar: 侧边栏
   * button：按钮
   */
  type: 'sidebar' | 'button'
  /**
   * 是否显示
   */
  isShow: boolean
  /**
   * 图标
   */
  icon?: string
  /**
   * children
   */
  children?: Array<menu>
}

type button = {
  /**
   * 按钮所属的页面路径
   */
  ascription: string
  /**
   * 按钮权限路径 ascription + path
   */
  permission: string
  /**
   * 按钮名称
   */
  title: string
  /**
   * 类型
   * table-tool：表格工具栏按钮
   * table-action：表格侧边栏按钮
   */
  type: 'unknow' | 'table-tool' | 'table-action'
  /**
   * 按钮图标
   */
  icon?: string
  /**
   * 按钮对应方法名
   * 通过 com-table action/tools 查询 对应键找到
   * 找不到就不显示（可以用来做特殊的自定判断按钮是否显示）
   */
  methods?: string
  /**
   * 显示条件
   * 接收 表格 行 row 参数
   * 如果有特殊的自定义判断 可以通过控制 各自的 action/tools 来决定是否显示
   */
  condition?: (row: any) => boolean
}

/**
 * 通用 列表接口所需要的参数
 */
interface baseListParams<s = any> {
  /**
   * 页数
   */
  pageIndex: number
  /**
   * 行数
   */
  pageSize: number
  /**
   * 查询条件
   */
  search: s
}

/**
 * 通用 列表项
 */
interface baseListItem {
  id: string
  /**
   * 创建时间
   */
  createDate: number
  /**
   * 更新时间
   */
  updateDate: number
  /**
   * 创建人
   */
  createUser: string
  /**
   * 更新人
   */
  updateUser: string
}

/**
 * 通用 列表接口返回值
 */
interface baseListResult<i = baseListItem> {
  /**
   * 页数
   */
  pageIndex: number
  /**
   * 总条数
   */
  totalCount: number
  /**
   * 列表数据
   */
  items: Array<i>
}
