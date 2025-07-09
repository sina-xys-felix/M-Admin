<template>
  <div class="container">
    <div class="box">
      <div class="header"> 自定义节流指令，连续点击按钮，1s后执行。 </div>
      <div class="body">
        <a-button type="primary" v-debounce="onClick">防抖(1s)</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Message } from '@arco-design/web-vue'
  const onClick = () => {
    Message.success('1s后执行')
  }
</script>

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
