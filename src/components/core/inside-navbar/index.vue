<template>
  <div class="inside-navbar__wrapper">
    <div class="inside-navbar__left">
      <toggle-sidebar id="toogle-sidebar" class="navbar-tool__item" />

      <reply id="reply" class="navbar-tool__item" />

      <breadcrumb id="breadcrumb" class="navbar-tool__item" />
    </div>

    <div class="inside-navbar__right">
      <full-screen id="full-screen" class="navbar-tool__item" />

      <size-select class="navbar-tool__item" />

      <user-avatar class="navbar-tool__item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import fullScreen from '../inside-full-screen/index.vue'
import toggleSidebar from './toggleSidebar.vue'
import breadcrumb from './breadcrumb.vue'
import sizeSelect from './sizeSelect.vue'
import userAvatar from './userAvatar.vue'
import reply from './reply.vue'

@Component({
  name: 'InsideNavbar',
  components: {
    toggleSidebar,
    breadcrumb,
    fullScreen,
    sizeSelect,
    userAvatar,
    reply
  }
})
export default class InsideNavbar extends Vue {}
</script>

<style lang="scss" scoped>
.inside-navbar__wrapper {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid $--const-gray-2;
  background: $--const-white;

  .navbar-tool__item {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    color: $--const-font-color;
    &:hover {
      background: rgba(31, 182, 206, 0.1);
    }
  }

  .inside-navbar__left {
    float: left;
  }

  .inside-navbar__right {
    float: right;
  }
}
</style>
