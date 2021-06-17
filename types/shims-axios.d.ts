import { AxiosRequestConfig, AxiosResponse } from 'axios'

declare global {
  /**
   * 请求结果
   */
  interface result<R = any> {
    /**
     * 请求状态码
     */
    code: number

    /**
     * 请求提示信息
     */
    msg: string

    /**
     * 请求结果
     */
    result: R
  }

  // 扩展 AxiosRequestConfig 接口
  interface requestConfig extends AxiosRequestConfig {
    /**
     * 是否显示loading层
     */
    isLoading?: boolean
    /**
     * loading提示
     */
    loadingTips?: string
    /**
     * 是否需要异常提示
     */
    isErrorTips?: boolean
  }

  // axios 接口返回数据
  interface axiosResponse<R = any, D = result<R>> extends AxiosResponse, result<R> {
    data: D
  }
}
