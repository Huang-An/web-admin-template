<template>
  <div class="app-wrapper" :class="layoutClass">
    <div class="app-wrapper__left">
      <inside-sidebar />
    </div>

    <div class="app-wrapper__right">
      <inside-navbar />
      <inside-tag-view />
      <inside-main />
    </div>
  </div>
</template>

<script lang="ts">
import { insideSidebar, insideNavbar, insideTagView, insideMain } from 'components/core'
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  name: 'layout',
  components: {
    insideSidebar,
    insideNavbar,
    insideMain,
    insideTagView
  }
})
export default class layout extends Vue {
  @Getter('app/sidebarStatus') sidebarStatus!: boolean

  get layoutClass() {
    return {
      'app-sidebar__hide': this.sidebarStatus
    }
  }
}
</script>
