<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <com-icon icon="fa fa-font"></com-icon>
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, key) in sizeMap" :disabled="appSize === key" :key="key" :command="key">
        {{ item }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { sizeMap } from 'enums/appEnums'

@Component({
  name: 'SizeSelect'
})
export default class SizeSelect extends Vue {
  @Action('app/setAppSize') actionSetAppSize!: (size: string) => void
  @Action('view/delAllCacheViews') actionDelAllCacheViews!: () => Promise<void>
  @Getter('app/appSize') appSize!: string

  sizeMap = sizeMap

  handleSetSize(size: string) {
    ;(this as any).$ELEMENT.size = size
    this.actionSetAppSize(size)
    this.$notify.success({ title: '成功', message: '切换规格成功' })
    this.refreshView()
  }

  refreshView() {
    this.actionDelAllCacheViews().then(() => {
      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect',
          query: { fullPath }
        })
      })
    })
  }
}
</script>
