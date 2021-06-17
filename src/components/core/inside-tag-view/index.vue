<template>
  <div id="inside-tag-view" class="inside-tag__wrapper">
    <el-scrollbar :vertical="false">
      <router-link
        tag="span"
        v-for="tag in tagsViews"
        :key="tag.path"
        :class="setTagItemClass(tag)"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.meta ? tag.meta.title || '' : '' }}
        <i class="fa fa-close inside-tag__close" v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)"></i>
      </router-link>
    </el-scrollbar>

    <ul
      v-if="contextmenu.visible"
      :style="{ left: contextmenu.left + 'px', top: contextmenu.top + 'px' }"
      class="inside-tag__contextmenu"
    >
      <li @click="refreshSelectedTag(contextmenu.selectedTag)">刷新</li>
      <li v-if="!isAffix(contextmenu.selectedTag)" @click="closeSelectedTag(contextmenu.selectedTag)">关闭</li>
      <li @click="closeOthersTags(contextmenu.selectedTag)">关闭其他</li>
      <li @click="closeAllTags(contextmenu.selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route, RouteConfig, RawLocation } from 'vue-router'
import { Action, Getter } from 'vuex-class'
import { routes } from '@/router'

const path = require('path')

interface affixTagsInterface {
  fullPath: string
  path: string
  name?: string
  meta: any
}

@Component({
  name: 'insideTagView'
})
export default class insideTagView extends Vue {
  @Action('view/addView') actionAddView!: (data: Route) => Promise<any>
  @Action('view/addTagsView') actionAddTagsView!: (data: affixTagsInterface) => Promise<any>
  @Action('view/delView') actionDelView!: (data: Route) => Promise<{ tagsViews: Array<Route> }>
  @Action('view/delOthersViews') actionDelOthersViews!: (data: Route) => Promise<{ tagsViews: Array<Route> }>
  @Action('view/delAllViews') actionDelAllViews!: () => Promise<{ tagsViews: Array<Route> }>
  @Action('view/delCacheView') actionDelCacheView!: (data: Route) => Promise<{ cacheViews: Array<Route> }>
  @Getter('view/tagsViews') tagsViews!: Array<Route>

  contextmenu: {
    top: number
    left: number
    selectedTag: Route | {}
    visible: boolean
  } = {
    top: 0,
    left: 0,
    selectedTag: {},
    visible: false
  }

  @Watch('$route')
  routeHandler() {
    this.addView()
  }

  @Watch('contextmenu.visible')
  visibleHandler() {
    if (this.contextmenu.visible) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  // 是否激活
  isActive(route: Route): boolean {
    return route.path === this.$route.path
  }

  // 是否是黏贴标签
  isAffix(tag: Route | RouteConfig): boolean {
    return tag.meta && tag.meta.affix
  }

  // 设置 tag item 的class
  setTagItemClass(tag: Route): string {
    if (this.isActive(tag)) {
      return 'inside-tag__item inside-tag__active'
    } else {
      return 'inside-tag__item'
    }
  }

  // 跳转到最新的 tags-views
  toLastView(tagsViews: Array<Route>, view: Route) {
    const latestView: Route = tagsViews.slice(-1)[0]
    if (latestView) {
      this.$router.push(latestView.fullPath)
    }
  }

  // 筛选出始终需要黏贴在 tags-views 上的 tags
  filterAffixTags(routes: Array<RouteConfig>, basePath: string = '/'): Array<affixTagsInterface> {
    let tags: Array<affixTagsInterface> = []
    routes.forEach((route: RouteConfig) => {
      if (this.isAffix(route)) {
        const tagPath: string = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const tempTags = this.filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }

  // 初始化添加需要黏贴在 tags-views 上的 tags
  initAffixTags() {
    const affixTags: Array<affixTagsInterface> = this.filterAffixTags(routes)
    for (const tag of affixTags) {
      if (tag.name) {
        this.actionAddTagsView(tag)
      }
    }
  }

  // 添加 cache-views 和 tags-views
  addView() {
    const { name } = this.$route
    if (name) {
      this.actionAddView(this.$route)
    }
  }

  // 关闭一个 tag
  closeSelectedTag(view: Route) {
    this.actionDelView(view).then(({ tagsViews }) => {
      if (this.isActive(view)) {
        this.toLastView(tagsViews, view)
      }
    })
  }

  // 关闭其他 tag
  closeOthersTags(view: Route) {
    if (!this.isActive(view)) {
      this.$router.push(view as RawLocation)
    }
    this.actionDelOthersViews(view)
  }

  // 关闭所有 tag
  closeAllTags(view: Route) {
    this.actionDelAllViews().then(({ tagsViews }) => {
      this.toLastView(tagsViews, view)
    })
  }

  // 刷新 tag
  refreshSelectedTag(view: Route) {
    this.actionDelCacheView(view).then(() => {
      const { fullPath } = view
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect',
          query: { fullPath }
        })
      })
    })
  }

  // 右键打开菜单
  openMenu(tag: Route, e: MouseEvent) {
    const menuMinWidth: number = 105
    const offsetLeft: number = this.$el.getBoundingClientRect().left
    const offsetWidth: number = (this.$el as HTMLElement).offsetWidth
    const maxLeft: number = offsetWidth - menuMinWidth
    const left: number = e.clientX - offsetLeft + 15

    if (left > maxLeft) {
      this.contextmenu.left = maxLeft
    } else {
      this.contextmenu.left = left
    }

    this.contextmenu.top = e.clientY
    this.contextmenu.visible = true
    this.contextmenu.selectedTag = tag
  }

  // 关闭菜单
  closeMenu() {
    this.contextmenu.visible = false
  }

  created() {
    this.initAffixTags()
    this.addView()
  }
}
</script>

<style lang="scss" scoped>
.inside-tag__wrapper {
  width: 100%;
  padding: 0 10px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: $--const-white;
  .inside-tag__item {
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    height: 25px;
    line-height: 25px;
    padding: 0 12px;
    margin: 7px 2px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid $--const-gray-2;
    background: $--const-white;
    color: $--const-font-color;

    &::before {
      content: '';
      position: relative;
      display: inline-block;
      top: 2px;
      width: 12px;
      height: 12px;
      margin-right: 8px;
      border-radius: 50%;
      background: $--const-white-light;
    }
    .inside-tag__close {
      margin-left: 12px;
    }
  }

  .inside-tag__active {
    &::before {
      background: $--const-primary;
    }
  }

  .inside-tag__contextmenu {
    position: absolute;
    z-index: 3000;
    margin: 0;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    list-style-type: none;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    color: $--const-font-color;
    background: $--const-white;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: $--const-white-light;
      }
    }
  }
}
</style>
