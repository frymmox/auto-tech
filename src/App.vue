<template>
  <div id="app">
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
  @import 'assets/styles.less';

  .page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>
