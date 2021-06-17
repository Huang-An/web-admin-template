<template>
  <div class="login-wrapper">
    <el-card class="login-form__container" :body-style="{ padding: '0 20px 20px' }">
      <el-tabs v-model="loginType">
        <el-tab-pane label="账号登录" name="normalLogin">
          <normal-login />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import normalLogin from './normal/index.vue'

@Component({
  name: 'login',
  components: {
    normalLogin
  }
})
export default class login extends Vue {
  loginType: string = 'normalLogin'
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/bg.svg') no-repeat;
  background-size: 100%;

  .login-bg__container {
    width: 100%;
    height: 100%;
    background: $--const-white;
  }

  .login-form__container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 500px;
    transform: translate(-50%, -50%);

    /deep/ .el-tabs__item {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }

    .login-agreement__tips {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      margin-top: 50px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
