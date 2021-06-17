<template>
  <div class="error-403__wrapper">
    <el-button icon="el-icon-arrow-left" type="primary" @click="backHome">返回首页</el-button>

    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo">禁止访问~</h1>

        <h2>你似乎没有权限访问该页面。</h2>

        <h4>如有疑问, 请您联系管理员。</h4>
      </el-col>

      <el-col :span="12">
        <img src="@/assets/images/403.gif" width="313" height="428" alt="" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'error403'
})
export default class error403 extends Vue {
  backHome() {
    this.$router.push({ path: '/home' })
  }
}
</script>

<style lang="scss" scoped>
.error-403__wrapper {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: $--const-font-color;
  }
}
</style>
