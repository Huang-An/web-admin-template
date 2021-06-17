/**
 * 日期格式化
 * @param value
 * @param format
 * @returns
 */
export const dateFormat = (value: string | number | Date, format?: string) => {
  if (value && value.format) {
    return value.format(format)
  }

  return ''
}

/**
 * 将来源对象的值 赋值到目标对象
 * @param target
 * @param source
 */
export const withObject = <T = any>(target: T, source: T) => {
  if (source) {
    Object.keys(target).forEach((key) => {
      const sourceValue: any = source[key as keyof T] || ''

      target[key as keyof T] = sourceValue
    })
  }
}
