<template>
  <div v-if="sidebarIsShow">
    <el-submenu v-if="isHasChildren" :index="resolvePath(menu.path)">
      <template slot="title">
        <menu-item :icon="menu.icon" :title="menu.title" />
      </template>

      <sidebar-item
        v-for="child in menu.children"
        :key="child.path"
        :menu="child"
        :base-path="resolvePath(menu.path)"
      />
    </el-submenu>

    <template v-else>
      <app-link :to="resolvePath(menu.path)">
        <el-menu-item :index="resolvePath(menu.path)">
          <menu-item :icon="menu.icon" :title="menu.title" />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { isArray } from '@const-an/helper-core'
import { external } from '@const-an/regexp'

import appLink from './appLink.vue'
import menuItem from './menuItem.vue'

const path = require('path')

@Component({
  name: 'sidebarItem',
  components: {
    appLink,
    menuItem
  }
})
export default class sidebarItem extends Vue {
  /**
   * 菜单数据
   */
  @Prop({ type: Object, required: true }) menu!: menu
  /**
   * 该结点基础路径
   */
  @Prop({ type: String, default: '' }) basePath!: string

  // 是否隐藏
  get sidebarIsShow(): boolean {
    const { type, isShow } = this.menu
    return type === 'sidebar' && isShow
  }

  // 是否拥有子节点
  get isHasChildren(): boolean {
    if (!isArray(this.menu.children) || !this.menu.children!.length) {
      return false
    } else {
      const _children = this.menu.children!.filter((item) => item.type === 'sidebar')
      return !!_children.length
    }
  }

  resolvePath(routePath: string) {
    if (external.test(routePath)) {
      return routePath
    }

    if (external.test(this.basePath)) {
      return this.basePath
    }

    return path.resolve(this.basePath, routePath)
  }
}
</script>
