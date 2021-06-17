<template>
  <div class="normal-login__wrapper">
    <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="login">
      <el-form-item prop="userName">
        <el-input v-model.trim="form.userName" placeholder="用户名" autofocus>
          <com-icon slot="prepend" icon="fa fa-user-circle"></com-icon>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model.trim="form.password" placeholder="密码" minlength="6" auto-complete="off">
          <com-icon slot="prepend" icon="fa fa-keyboard-o"></com-icon>
        </el-input>
      </el-form-item>

      <el-form-item prop="captcha">
        <el-input type="text" v-model.trim="form.captcha" size="large" placeholder="- - - - -" maxlength="5">
          <template slot="prepend"> 验证码 </template>

          <template slot="append">
            <img class="normal-login__captcha" :src="form.captchaSrc" alt="验证码" @click="refreshCaptcha" />
          </template>
        </el-input>
      </el-form-item>

      <el-button type="primary" class="normal-login__button" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { getCaptcha, login } from 'api/user/index'
import { enCrypto } from 'plugin/helper'
import { Action } from 'vuex-class'

// type
import { loginResult } from 'api/user/type'
import { ElForm } from 'element-ui/types/form'

@Component({
  name: 'normalLogin'
})
export default class normalLogin extends Vue {
  @Ref('form') formRef!: ElForm

  @Action('user/setAuthToken') setAuthToken!: (data: loginResult) => void

  // 表单
  form = {
    userName: '',
    password: '',
    captcha: '',
    captchaSrc: getCaptcha()
  }

  // 表单规则
  rules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }

  // 刷新验证码
  refreshCaptcha() {
    this.form.captchaSrc = getCaptcha()
  }

  // 登录
  login() {
    this.formRef.validate(async (valid: boolean) => {
      if (valid) {
        const { userName, password, captcha } = this.form

        try {
          const { code, result } = await login({ userName, captcha, password: enCrypto(password) })
          if (code === 200) {
            this.loginSuccess(result)
          } else {
            this.refreshCaptcha()
          }
        } catch (error) {
          this.refreshCaptcha()
        }
      }
    })
  }

  loginSuccess(result: loginResult) {
    this.setAuthToken(result)

    Promise.resolve().then(() => {
      this.$router.push({ path: '/home' })
    })
  }
}
</script>

<style lang="scss" scoped>
.normal-login__wrapper {
  width: 300px;
  margin: 80px auto 0;

  .normal-login__captcha {
    height: 38px;
    display: block;
    margin: 0 -20px;
  }

  .normal-login__button {
    width: 100%;
  }
}
</style>
