/**
 * 登录所需参数
 */
export type loginParams = {
  userName: string
  password: string
  captcha: string
}

/**
 * 登录结果
 */
export type loginResult = {
  token: string
}

/**
 * 查询用户信息结果
 */
export type infoResult = {
  id: string
  userName: string
  mobile: string
  menuList: Array<menu>
}

/**
 * 查询用户列表条件
 */
export type listSearch = {
  id?: string
  userName?: string
  mobile?: string
}

/**
 * 用户列表项
 */
export interface listItems extends baseListItem {
  userName: string
  mobile: string
}

/**
 * 用户详情所需参数
 */
export type detailParams = {
  id: string
}

/**
 * 用户详情结果
 */
export interface detailResult extends baseListItem {
  userName: string
  mobile: string
}

/**
 * 用户新增/编辑所需参数
 */
export type updateParams = {
  id?: string
  userName: string
  mobile: string
}
