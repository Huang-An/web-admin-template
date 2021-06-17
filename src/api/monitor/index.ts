import { post } from 'plugin/axios/fetch'

import { frontLogListSearch, frontLogListItems, frontLogUpdateParams } from './type'

/**
 * 前端错误日志列表
 */
export const frontLogList = (data?: baseListParams<frontLogListSearch>, config?: requestConfig) =>
  post<baseListResult<frontLogListItems>>('/mock/monitor/frontLog/list', data, config)

// 前端错误日志上报
export const frontLogUpdate = (data: frontLogUpdateParams, config?: requestConfig) =>
  post<boolean>('/mock/monitor/frontLog/update', data, config)
