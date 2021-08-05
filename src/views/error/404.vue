<template>
  <div class="error-404__wrapper">
    <el-button icon="el-icon-arrow-left" type="primary" @click="backHome">返回首页</el-button>

    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo">访问无效~</h1>

        <h2>您似乎在访问一个无效资源。</h2>
        <h4>该页面可能已经丢失，请检查你访问的路径。</h4>
        <h4>如有疑问, 请联系管理员。</h4>
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
  name: 'Error404'
})
export default class Error404 extends Vue {
  backHome(): void {
    this.$router.push({ path: '/home' })
  }
}
</script>

<style lang="scss" scoped>
.error-404__wrapper {
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
