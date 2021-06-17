/**
 * 尺寸
 */
export enum sizeEnum {
  DEFAULT = 'default',
  MEDIUM = 'medium',
  SMALL = 'small',
  MINI = 'mini'
}

/**
 * 尺寸对应文本
 */
export enum sizeTextEnum {
  DEFAULT = '大号',
  MEDIUM = '默认',
  SMALL = '小号',
  MINI = '迷你'
}

/**
 * 浏览器类型map
 */
const sizeMap = {
  [sizeEnum.DEFAULT]: sizeTextEnum.DEFAULT,
  [sizeEnum.MEDIUM]: sizeTextEnum.MEDIUM,
  [sizeEnum.SMALL]: sizeTextEnum.SMALL,
  [sizeEnum.MINI]: sizeTextEnum.MINI
}

export { sizeMap }
