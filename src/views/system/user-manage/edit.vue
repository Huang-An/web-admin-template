<template>
  <com-form-wrapper :loading="loading" @submit="startSubmit">
    <el-form
      class="user-form__wrapper"
      :model="form"
      :rules="rules"
      ref="form"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="登录账号" prop="userName">
        <el-input
          v-model="form.userName"
          show-word-limit
          maxlength="10"
          placeholder="账户由中文、字母或数字组成的字符 2-10个字"
        />
      </el-form-item>

      <el-form-item label="用户姓名" prop="mobile">
        <el-input v-model="form.mobile" show-word-limit maxlength="11" placeholder="请输入登录手机号码" />
      </el-form-item>
    </el-form>
  </com-form-wrapper>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from 'vue-property-decorator'
import { withObject } from 'plugin/helper'
import { detail, update } from 'api/user'

import mixinForm from 'mixins/form'
import mixinDetail from 'mixins/detail'

// type
import { updateParams } from 'api/user/type'
import { ElForm } from 'element-ui/types/form'

type routeQuery = { id: string }

@Component({
  name: 'UserManageEdit'
})
export default class UserManageEdit extends Mixins<mixinForm, mixinDetail<routeQuery>>(mixinForm, mixinDetail) {
  @Ref('form') formRef!: ElForm

  form: updateParams = {
    id: undefined,
    userName: '',
    mobile: ''
  }

  rules = {
    userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
    mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
  }

  // 获取详情
  async getDetail() {
    const { id } = this.routeQuery

    if (id) {
      const { code, result } = await detail({ id: id })

      if (code === 200 && result) {
        withObject(this.form, result)
      }
    }
  }

  // 提交表单
  async submit() {
    try {
      const valid = await this.formRef.validate()

      if (!valid) throw valid

      const { code } = await update(this.form, { isLoading: false })

      return code
    } catch (error) {
      throw error
    }
  }
}
</script>

<style lang="scss" scoped>
.user-form__wrapper {
  width: 600px;
}
</style>
