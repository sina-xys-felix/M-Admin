<template>
  <a-layout-footer class="footer" :style="{ justifyContent: align }">
    <span>Copyright © 2019-2024 xxxx 有限公司·版权所有 </span>
    <a href="https://beian.miit.gov.cn/" target="_blank">xx号</a>
  </a-layout-footer>
</template>

<script lang="ts">
  export default {
    name: 'MFooter',
  }
</script>

<script lang="ts" setup>
  import { AlignProps } from '@/common/types'

  withDefaults(defineProps<{ align?: AlignProps }>(), {
    align: 'center',
  })
</script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    height: 40px;
    color: var(--color-text-2);
    padding: 0 16px;

    span {
      margin-right: 8px;
    }

    a {
      text-decoration: none; /* 去除下划线 */
      color: inherit; /* 继承父元素的颜色 */
      cursor: pointer; /* 修改鼠标指针样式 */
    }
  }
</style>
