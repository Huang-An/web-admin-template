<template>
  <div>
    <el-dropdown trigger="click">
      <div class="user-avatar__wrapper">
        <el-avatar class="user-avatar__image" :size="28" :src="avatar" />

        <div class="user-avatar__name">{{ userName }}</div>

        <com-icon icon="fa fa-angle-down" :size="14" />
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="refreshCache">刷新缓存</el-dropdown-item>
        <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import avatar from 'assets/images/avatar.jpg'

@Component({
  name: 'userAvatar'
})
export default class userAvatar extends Vue {
  @Getter('user/userName') userName!: string
  @Action('user/loginOut') actionLoginOut!: () => Promise<any>
  @Action('app/cleanSettings') actionCleanSettings!: () => void

  avatar = avatar

  async loginOut() {
    await this.actionLoginOut()
    this.$router.push({ name: 'login' })
  }

  refreshCache() {
    this.actionCleanSettings()
    const { fullPath } = this.$route
    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect',
        query: { fullPath }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.user-avatar__wrapper {
  display: flex;
  align-items: center;
  height: 100%;

  .user-avatar__name {
    margin: 0 5px 0 10px;
    font-size: 16px;
  }
}
</style>
