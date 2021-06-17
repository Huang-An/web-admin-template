import { post } from 'plugin/axios/fetch'

// type
import {
  loginParams,
  loginResult,
  infoResult,
  listSearch,
  listItems,
  detailParams,
  detailResult,
  updateParams
} from './type'

/**
 * 获取验证码
 */
export const getCaptcha = () => 'https://dummyimage.com/150x50/DCDFE6/909399&text=1231'

/**
 * 用户登录
 */
export const login = (data: loginParams, config?: requestConfig) => post<loginResult>('/mock/user/login', data, config)

/**
 * 获取用户信息
 */
export const info = (config?: requestConfig) => post<infoResult>('/mock/user/info', {}, config)

/**
 * 查询用户列表
 */
export const list = (data: baseListParams<listSearch>, config?: requestConfig) =>
  post<baseListResult<listItems>>('/mock/user/list', data, config)

/**
 * 查询用户详情
 */
export const detail = (data: detailParams, config?: requestConfig) =>
  post<detailResult>('/mock/user/detail', data, config)

/**
 * 用户 新增/修改
 */
export const update = (data: updateParams, config?: requestConfig) => post<boolean>('/mock/user/update', data, config)
