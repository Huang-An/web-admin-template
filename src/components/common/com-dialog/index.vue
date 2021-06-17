<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" v-bind="$attrs" v-on="$listeners">
    <div class="com-dialog__body">
      <slot :visible="visible"></slot>
    </div>

    <div slot="footer" v-if="showFooter" class="com-dialog__footer">
      <el-button v-if="showCancelBtn" :disabled="cancelBtnDisabled" :loading="loading" size="mini" @click="cancel">
        {{ cancelBtnText }}
      </el-button>

      <el-button
        v-if="showDetermineBtn"
        :disabled="determineBtnDisabled"
        :loading="loading"
        size="mini"
        type="primary"
        @click="determine"
      >
        {{ determineBtnText }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'comDialog'
})
export default class comDialog extends Vue {
  // 取消按钮文字
  @Prop({ type: String, default: '取 消' }) readonly cancelBtnText!: string
  // 确认按钮文字
  @Prop({ type: String, default: '确 定' }) readonly determineBtnText!: string
  // 是否显示取消按钮
  @Prop({ type: Boolean, default: true }) readonly showCancelBtn!: boolean
  // 是否显示确认按钮
  @Prop({ type: Boolean, default: true }) readonly showDetermineBtn!: boolean
  // 是否禁用取消按钮
  @Prop({ type: Boolean, default: false }) readonly cancelBtnDisabled!: boolean
  // 是否禁用确认按钮
  @Prop({ type: Boolean, default: false }) readonly determineBtnDisabled!: boolean
  // 取消前
  @Prop({ type: Function }) readonly beforeCancel!: Function
  // 确认前
  @Prop({ type: Function }) readonly beforeDetermine!: Function
  // 是否显示底部
  @Prop({ type: Boolean, default: true }) readonly showFooter!: string

  visible: boolean = false
  loading: boolean = false

  cancelLoading() {
    this.loading = false
  }

  open() {
    this.visible = true
    this.cancelLoading()
  }

  close() {
    this.visible = false
    this.cancelLoading()
  }

  cancel() {
    this.loading = true

    this.beforeCancel ? this.beforeCancel(this.close, this.cancelLoading) : this.close()
  }

  determine() {
    this.loading = true

    this.beforeDetermine ? this.beforeDetermine(this.close, this.cancelLoading) : this.close()
  }
}
</script>

<style lang="scss" scoped>
.com-dialog__body {
  margin: -30px 0 -15px 0;
}

.com-dialog__footer {
  text-align: right;
}
</style>
