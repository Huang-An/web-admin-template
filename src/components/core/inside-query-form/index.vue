<template>
  <div class="inside-query__form">
    <el-form
      id="query-form__content"
      inline
      size="mini"
      label-position="top"
      :model="queryFormData"
      :style="formContainerStyle"
      :class="formContainerClass"
      @keyup.enter.native="onQuery"
    >
      <el-form-item
        v-for="(item, id, index) in isShowInsideQuery"
        :key="id"
        :class="computedOverflowLastClass(index)"
        :label="needLabel ? item.label : undefined"
      >
        <!-- input -->
        <el-input
          v-if="item.type === 'input'"
          v-model.trim="queryFormData[id]"
          :maxlength="item.config ? item.config.maxlength : ''"
          :placeholder="item.config ? item.config.placeholder : `请输入${item.label}`"
          class="query-form__widget"
        />

        <!-- number -->
        <el-input
          v-if="item.type === 'number'"
          v-model.trim.number="queryFormData[id]"
          :maxlength="item.config ? item.config.maxlength : 17"
          :placeholder="item.config ? item.config.placeholder : `请输入${item.label}`"
          class="query-form__widget"
        />

        <!-- select -->
        <el-select
          v-if="item.type === 'select'"
          v-model="queryFormData[id]"
          :placeholder="item.config ? item.config.placeholder : `请选择${item.label}`"
          :multiple="item.config ? item.config.multiple : false"
          :disabled="item.config ? item.config.disabled || false : false"
          clearable
          collapse-tags
          class="query-form__widget"
        >
          <el-option
            v-for="option in item.config.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <!-- date -->
        <el-date-picker
          v-if="item.type === 'datetimerange'"
          v-model="queryFormData[id]"
          :picker-options="item.config ? item.config.pickerOptions || pickerOptions : pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          clearable
          unlink-panels
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始时间"
          range-separator="-"
          end-placeholder="结束时间"
        />
      </el-form-item>

      <el-form-item class="query-form__btn" :label="needLabel ? '操作' : undefined">
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div v-if="overflowConfig.isOverflow" class="query-form__collapse">
      <el-button
        type="text"
        :icon="overflowConfig.isCollapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        @click="overflowConfig.isCollapse = !overflowConfig.isCollapse"
      >
        {{ overflowConfig.isCollapse ? '收起更多查询条件' : ' 展开更多查询条件 ' }}
      </el-button>
    </div>

    <el-popover v-if="needSetting" class="query-form__tools" placement="bottom" trigger="click" width="150">
      <div>
        <el-checkbox
          v-for="(item, key) in querySettingMap"
          :key="key"
          v-model="item.isShow"
          @change="checkboxChange(key, item)"
        >
          {{ item.label }}
        </el-checkbox>
      </div>

      <i slot="reference" class="el-icon-setting"></i>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { isArray, isObject, isNull, isEmpty } from '@const-an/helper-core'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getStorage, setStorage } from 'plugin/helper'
import { Getter } from 'vuex-class'
import { cloneDeep } from 'lodash'

@Component({
  name: 'InsideQueryForm'
})
export default class InsideQueryForm extends Vue {
  @Getter('app/sidebarStatus') sidebarStatus!: boolean

  /**
   * 配置 query，详见 types/components/insideQueryForm 中的 query
   */
  @Prop({ type: Object, default: () => ({}) }) query!: query
  /**
   * 默认查询数据
   */
  @Prop({ type: Object }) defaultQueryData!: any
  /**
   * 是否需要展示label
   */
  @Prop({ type: Boolean, default: true }) needLabel!: boolean
  /**
   * 是否需要设置项按钮
   */
  @Prop({ type: Boolean, default: true }) needSetting!: boolean
  /**
   * 缓存名称 配合 needSetting 使用
   */
  @Prop({ type: String }) cacheName!: string
  /**
   * 是否需要超出显示更多
   */
  @Prop({ type: Boolean, default: false }) overflowShowMore!: boolean
  /**
   * 最大行数 超出隐藏
   */
  @Prop({ type: Number, default: 3 }) maxRow!: number

  componentName: string = 'insideQueryForm'

  insideQuery: query = {}

  queryFormData: { [k: string]: any } = {}

  querySettingMap: { [k: string]: { isShow: boolean } } = {}

  pickerOptions = {
    shortcuts: [
      {
        text: '最近一周',
        onClick(picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick(picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick(picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  }

  overflowConfig = {
    isCollapse: false,
    isOverflow: false,
    rowHeight: 67,
    rowBottom: 18,
    containerClientWidth: 0,
    maxRowLastIndex: 0,
    maxRowClientHeight: 0
  }

  get isShowInsideQuery() {
    const isShowInsideQuery: query = {}

    Object.keys(this.insideQuery).forEach((key) => {
      if (this.querySettingMap[key].isShow) isShowInsideQuery[key] = this.insideQuery[key]
    })

    return isShowInsideQuery
  }

  get formContainerClass() {
    const { isCollapse, isOverflow } = this.overflowConfig
    if (!isCollapse && isOverflow) {
      return 'query-form__overflow'
    }
  }

  get formContainerStyle() {
    const { isCollapse, isOverflow, maxRowClientHeight } = this.overflowConfig
    if (!isCollapse && isOverflow) {
      return {
        height: maxRowClientHeight + 'px'
      }
    }
  }

  @Watch('query', { immediate: true })
  queryHandler() {
    this.insideQuery = cloneDeep(this.query)

    this.formatQuerySettingMap()
  }

  @Watch('defaultQueryData', { immediate: true })
  defaultQueryDataHandler() {
    if (this.defaultQueryData) {
      this.queryFormData = { ...this.queryFormData, ...this.defaultQueryData }
    }
  }

  // 侧边栏改变时 导致窗口高度改变 重新计算 OverflowConfig
  @Watch('sidebarStatus')
  sidebarStatusHandler() {
    setTimeout(() => this.computedOverflowConfig(), 300)
  }

  @Watch('querySettingMap', { immediate: true, deep: true })
  querySettingMapHandler() {
    if (this.cacheName && !isEmpty(this.querySettingMap)) {
      setStorage(this.cacheName, this.querySettingMap)
    }
  }

  // 重置某个字段
  resetField(key: string) {
    if (this.queryFormData.hasOwnProperty(key)) {
      if (isArray(this.queryFormData[key])) {
        this.queryFormData[key] = []
      } else if (isObject(this.queryFormData[key])) {
        this.queryFormData[key] = {}
      } else if (isNull(this.queryFormData[key])) {
        this.queryFormData[key] = null
      } else {
        this.queryFormData[key] = ''
      }
    }
  }

  checkboxChange(key: string, item: query) {
    if (!item.isShow) this.resetField(key)
    if (this.overflowShowMore) this.computedOverflowConfig()
  }

  // 查询
  onQuery() {
    this.$emit('on-query', this.queryFormData)
  }

  // 重置
  onReset() {
    const keys: Array<string> = Object.keys(this.query)
    keys.forEach((key: string) => this.resetField(key))
    this.$emit('on-reset', this.queryFormData)
  }

  // 格式化 querySettingMap
  formatQuerySettingMap() {
    let querySettingMap: { [k: string]: { label: string; isShow: boolean } } = {}

    if (this.cacheName && !isEmpty(getStorage(this.cacheName))) {
      querySettingMap = getStorage(this.cacheName)
    }

    Object.keys(this.query).forEach((key) => {
      const item = this.query[key]

      if (!querySettingMap[key]) {
        querySettingMap[key] = { label: item.label, isShow: typeof item.isShow === 'undefined' ? true : item.isShow }
      }
    })

    this.querySettingMap = querySettingMap
  }

  // 计算 overflowConfig
  computedOverflowConfig() {
    const el = document.getElementById('query-form__content') as HTMLElement
    if (el) {
      // 容器宽度
      this.overflowConfig.containerClientWidth = el.clientWidth

      const { containerClientWidth, rowHeight, rowBottom } = this.overflowConfig

      /** 开始计算 行数、最后一个节点位置 */
      const formItems = el.querySelectorAll('.el-form-item')
      let tempWidth = 0
      let tempRow = 1

      for (let i = 0, l = formItems.length; i < l; i++) {
        const item = formItems[i]
        const width = item.clientWidth + 10
        tempWidth += width

        if (tempWidth > containerClientWidth) {
          tempWidth = width

          if (tempRow === this.maxRow) {
            this.overflowConfig.maxRowLastIndex = i - 1
          }

          tempRow++
        }
      }
      /** 结束计算 */

      // 是否超出隐藏 如果计算出的行数 大于 最大行数 就隐藏
      this.overflowConfig.isOverflow = tempRow > this.maxRow

      this.overflowConfig.maxRowClientHeight = this.maxRow * (rowHeight + rowBottom)
    }
  }

  // 计算 最后一行 最后一个的 class
  computedOverflowLastClass(index: number) {
    const { isCollapse, isOverflow, maxRowLastIndex } = this.overflowConfig
    if (!isCollapse && isOverflow && index === maxRowLastIndex) {
      return 'overflow-item__last'
    }
  }

  // 提供给外部 设置查询条件的值 并触发查询。可通过 dispatch 触发。详细见 mixins/dispatch
  public setQueryFormData(key: string, value: any, isQuery: boolean = true) {
    this.$set(this.queryFormData, key, value)
    isQuery && this.onQuery()
  }

  mounted() {
    if (this.overflowShowMore) {
      this.computedOverflowConfig()

      window.addEventListener('resize', this.computedOverflowConfig, false)
    }

    this.$on('setQueryFormData', this.setQueryFormData)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.computedOverflowConfig, false)

    this.$off('setQueryFormData')
  }
}
</script>

<style lang="scss" scoped>
.inside-query__form {
  position: relative;
  margin-bottom: -12px;

  #query-form__content {
    position: relative;
    overflow: hidden;
    .el-form-item {
      height: 67px;

      .query-form__widget {
        width: 180px;
      }
    }
  }

  .query-form__collapse {
    padding: 10px;
    text-align: center;
  }

  .query-form__tools {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    color: $--const-primary;
  }
}

.query-form__overflow {
  .overflow-item__last {
    margin-right: 140px;
  }

  .query-form__btn {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
