<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { RouteRecord } from 'vue-router'

@Component({
  name: 'breadcrumb'
})
export default class breadcrumb extends Vue {
  levelList: Array<RouteRecord> = []

  @Watch('$route')
  routeHandler() {
    this.getBreadcrumb()
  }

  // 获取面包屑导航列表
  getBreadcrumb() {
    let matched: Array<RouteRecord> = this.$route.matched.filter((item) => item.meta && item.meta.title)
    this.levelList = matched.filter((item) => item.meta && item.meta.title)
  }

  created() {
    this.getBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  .el-breadcrumb {
    line-height: unset;
  }
}
</style>
