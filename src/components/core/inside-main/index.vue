<template>
  <div class="inside-main__wrapper">
    <div class="inside-main__body">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cacheViews" :max="20">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>

    <el-backtop target=".inside-main__body" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  name: 'insideMain'
})
export default class insideMain extends Vue {
  @Getter('view/cacheViews') cacheViews!: Array<string>

  get key() {
    if (!this.$route.meta.cache) {
      const name = this.$route.name || ''
      return name + new Date().getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
.inside-main__wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;

  .inside-main__body {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 12px 0 12px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
