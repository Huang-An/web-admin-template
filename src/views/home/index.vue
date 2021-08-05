<template>
  <com-page-wrapper class="home-wrapper">
    <div class="home-container">
      <div></div>
    </div>
  </com-page-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Home'
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home-wrapper {
  .home-container {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    height: 100%;
    width: 100%;

    img {
      width: 200px;
      margin-bottom: 15px;
    }

    p {
      text-align: center;
      color: $--const-font-color;
    }
  }
}
</style>
