import moment from 'moment'

class InPrototype {
  constructor() {
    this.init()
  }

  private init() {
    this.strToDate()
    this.numberToDate()
    this.dateObjToDate()
  }

  /**
   * 字符串转换时间格式
   * 2019-09-09.format(fmt)
   */
  private strToDate() {
    String.prototype.format = function (fmt: string = 'YYYY-MM-DD HH:mm:ss'): string {
      return moment(new Date(this as string)).format(fmt)
    }
  }

  /**
   * 数字转换时间格式
   * 12313131323231.format(fmt)
   */
  private numberToDate() {
    Number.prototype.format = function (fmt: string = 'YYYY-MM-DD HH:mm:ss'): string {
      return moment(new Date(this as number)).format(fmt)
    }
  }

  /**
   * 日期对象转换时间格式
   * new Date().format(fmt)
   */
  private dateObjToDate() {
    Date.prototype.format = function (fmt: string = 'YYYY-MM-DD HH:mm:ss'): string {
      return moment(new Date(this as Date)).format(fmt)
    }
  }
}

new InPrototype()
