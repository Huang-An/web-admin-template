<template>
  <div class="skeleton-warpper">
    <div class="skeleton-left">
      <div v-for="i in itemList" :key="i" :class="'skeleton-left__' + i"></div>
    </div>

    <div class="skeleton-right">
      <div class="skeleton-right__nav"></div>

      <div class="skeleton-right__tag"></div>

      <div class="skeleton-right__search"></div>

      <div class="skeleton-right__main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skeleton',

  data() {
    return {
      itemList: [1, 2, 2, 2, 1, 2, 1, 2, 2, 1]
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.skeleton-warpper {
  position: relative;
  width: 100%;
  height: 100%;
  .skeleton-left {
    position: fixed;
    width: 210px;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background: #f6f6f6;

    .skeleton-left__1 {
      height: 45px;
      margin: 10px;
      background: #d8e3e8;
    }

    .skeleton-left__2 {
      height: 35px;
      margin: 10px 30px 10px 10px;
      background: #d8e3e8;
    }
  }

  .skeleton-right {
    position: relative;
    height: 100%;
    margin-left: 215px;
    .skeleton-right__nav {
      width: 100%;
      height: 48px;
      background: #f6f6f6;
    }

    .skeleton-right__tag {
      width: 100%;
      height: 50px;
      margin: 5px 0;
      background: #f6f6f6;
    }

    .skeleton-right__search {
      position: relative;
      width: 100%;
      margin-bottom: 5px;
      height: 150px;
      background: #f6f6f6;
    }

    .skeleton-right__main {
      position: relative;
      width: 100%;
      height: calc(100vh - 270px);
      background: #f6f6f6;
    }
  }
}
</style>
