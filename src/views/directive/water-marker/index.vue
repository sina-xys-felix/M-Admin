<template>
  <div class="container">
    <div class="box" v-waterMarker="{ text: '版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }"> </div>
  </div>
</template>

<style lang="less" scoped>
  .box {
    width: 100%;
    height: 100%;
    background: var(--color-bg-2);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
</style>
