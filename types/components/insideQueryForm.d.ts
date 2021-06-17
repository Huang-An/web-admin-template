type query<R = any> = {
  /**
   * key 字段名
   */
  [k in keyof R]: {
    /**
     * label
     */
    label: string
    /**
     * 类型 如：input|select|number 等
     */
    type: string
    /**
     * 是否显示
     */
    isShow?: boolean
    /**
     * 各个 type 的配置项，具体每个type不通，配置不通，可在 inside-query-form 中酌情增删
     */
    config?: any
  }
}
