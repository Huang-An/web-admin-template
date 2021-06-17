<template>
  <div class="inside-sidebar__wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :background-color="sidebarBackgroundColor"
        :text-color="sidebarTextColor"
        :active-text-color="sidebarActiveTextColor"
        :collapse-transition="false"
        :default-active="activeMenu"
        :collapse="isCollapse"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.path" :menu="menu" :base-path="menu.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import styles from 'assets/styles/var.scss'
import sidebarItem from './sidebarItem.vue'

@Component({
  name: 'insideSidebar',
  components: {
    sidebarItem
  }
})
export default class insideSidebar extends Vue {
  @Getter('app/sidebarStatus') sidebarStatus!: boolean
  @Getter('user/menuList') menuList!: Array<menu>

  sidebarBackgroundColor = styles.sidebarBackgroundColor
  sidebarTextColor = styles.sidebarTextColor
  sidebarActiveTextColor = styles.sidebarActiveTextColor

  get isCollapse() {
    return this.sidebarStatus
  }

  get activeMenu(): string {
    const route = this.$route
    const { path } = route
    return path
  }
}
</script>
