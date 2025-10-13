<template>
  <div class="container">
    <div class="content">
      <a-result class="result" status="500" subtitle="对抱歉，服务器出了点问题～" />
      <a-button key="back" type="primary"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: '500',
  }
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
    height: 100%;
    :deep(.content) {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      background-color: var(--color-bg-1);
      border-radius: 4px;
    }
  }
</style>
