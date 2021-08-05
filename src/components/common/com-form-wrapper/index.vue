<template>
  <com-page-wrapper class="com-form__wrapper" :body-style="bodyStyle">
    <div class="com-form__body" :style="contentStyle">
      <slot
        v-loading="loading"
        element-loading-text="正在保存~"
        element-loading-spinner="fa fa-pulse fa-spinner"
        element-loading-custom-class="common-loading"
      />
    </div>

    <div class="com-form__footer" v-if="showFooter">
      <slot name="footer">
        <el-button v-show="showCancelBtn" :loading="loading" :disabled="cancelBtnDisabled" @click="routeBack">
          {{ cancelBtnText }}
        </el-button>

        <el-button v-show="isShowPrevBtn" type="primary" :loading="loading" @click="prev">上一步</el-button>

        <el-button v-show="isShowNextBtn" type="primary" :loading="loading" @click="next">下一步</el-button>

        <el-button
          v-show="isShowDetermineBtn"
          type="primary"
          :loading="loading"
          :disabled="determineBtnDisabled"
          @click="submit"
        >
          {{ determineBtnText }}
        </el-button>
      </slot>
    </div>
  </com-page-wrapper>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'ComFormWrapper'
})
export default class ComFormWrapper extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  // 是否需要底部
  @Prop({ type: Boolean, default: true }) readonly showFooter!: boolean
  // 取消按钮文字
  @Prop({ type: String, default: '取 消' }) readonly cancelBtnText!: string
  // 保存按钮文字
  @Prop({ type: String, default: '保 存' }) readonly determineBtnText!: string
  // 是否显示取消按钮
  @Prop({ type: Boolean, default: true }) readonly showCancelBtn!: boolean
  // 是否显示确认按钮
  @Prop({ type: Boolean, default: true }) readonly showDetermineBtn!: boolean
  // 是否禁用取消按钮
  @Prop({ type: Boolean, default: false }) readonly cancelBtnDisabled!: boolean
  // 是否禁用确认按钮
  @Prop({ type: Boolean, default: false }) readonly determineBtnDisabled!: boolean
  // 是否分页
  @Prop({ type: Boolean, default: false }) readonly multi!: boolean
  // 当前页数 multi 为 true 时必传
  @Prop({ type: Number }) readonly page!: number
  // 最大页数 multi 为 true 时必传
  @Prop({ type: Number }) readonly pages!: number
  @Prop({ type: Object }) readonly bodyStyle!: object
  @Prop({ type: Object }) readonly contentStyle!: object

  // 是否显示 保存按钮
  get isShowDetermineBtn() {
    if (this.multi) {
      return this.showDetermineBtn && this.page === this.pages
    }

    return this.showDetermineBtn
  }

  // 是否显示上一步按钮
  get isShowPrevBtn() {
    return this.multi && this.page > 0
  }

  // 是否显示下一步按钮
  get isShowNextBtn() {
    return this.multi && this.page !== this.pages
  }

  submit() {
    this.$emit('submit')
  }

  prev() {
    this.$emit('prev')
  }

  next() {
    this.$emit('next')
  }
}
</script>

<style lang="scss" scoped>
.com-form__wrapper {
  .com-form__body {
    padding-bottom: 100px;
  }

  .com-form__footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    z-index: 1000;
    box-shadow: 0px -2px 7px 3px rgba(0, 0, 0, 0.1);
    border-top: 1px solid $--const-white-darker;
    background: $--const-white;
  }
}
</style>
