<template>
  <div @click="toggleSidebar">
    <com-icon icon="fa fa-outdent" :size="16" :class="sidebarStatus ? 'rotate-180' : ''"></com-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  name: 'ToggleSidebar'
})
export default class ToggleSidebar extends Vue {
  @Getter('app/sidebarStatus') sidebarStatus!: boolean
  @Action('app/toggleSidebar') actionToggleSidebar!: () => void

  // 切换侧边栏
  toggleSidebar() {
    this.actionToggleSidebar()
  }
}
</script>

<style lang="scss" scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
