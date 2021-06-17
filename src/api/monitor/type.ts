/**
 * 查询列表条件
 */
export type frontLogListSearch = {
  createUser?: string
}

/**
 * 列表项
 */
export interface frontLogListItems extends baseListItem {
  errorUrl: string
  equipment: string
  errorInfo: string
  errorStack: string
  errorTag: string
  errorDate: number
  remark: string
}

/**
 * 错误日志上报 所需参数
 */
export type frontLogUpdateParams = {
  errorUrl: string
  equipment: string
  errorInfo: string
  errorStack: string
  errorTag: string
  remark: string
  errorDate: string
}
