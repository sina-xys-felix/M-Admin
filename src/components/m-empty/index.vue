<template>
  <div class="m-empty" :style="{ minHeight: minHeight + 'px' }">
    <a-empty>
      <template #image>
        <img src="@/assets/images/empty-2.png" alt="" />
      </template>
      暂无数据
    </a-empty>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MEmpty',
  }
</script>

<script lang="ts" setup>
  interface MEmpty {
    minHeight?: number | string
  }

  withDefaults(defineProps<MEmpty>(), {
    minHeight: 200,
  })
</script>

<style lang="less" scoped>
  .m-empty {
    display: flex;
  }
  :deep(.arco-empty) {
    margin: auto;
  }
</style>
