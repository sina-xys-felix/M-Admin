<!-- 表头-->
<template>
  <a-row class="m-table-header" :style="{ paddingTop: isGap ? '16px' : '0' }">
    <a-col :flex="1">
      <slot name="input-area" />
    </a-col>
    <a-divider :style="{ height: 0, opacity: 0 }" direction="vertical" />
    <a-col :flex="'86px'" class="m-table-header-right">
      <a-space :direction="'horizontal'" :size="20">
        <slot name="out-area"></slot>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  export default {
    name: 'MTableHeader',
  }
</script>

<script lang="ts" setup>
defineProps({
  isGap: Boolean,
});
</script>

<style lang="less" scoped>
.m-table-header {
  padding: 16px 0;
  &-right {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
:deep(.arco-divider-vertical) {
  margin: 0 11px 0 12px;
}
</style>
