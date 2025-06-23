<template>
  <div class="card">
    <div class="card-title">
      <span>{{ title }}</span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Card',
  }
</script>

<script setup lang="ts">
  interface ICardProps {
    title: string
  }

  withDefaults(defineProps<ICardProps>(), {
    title: '',
  })
</script>

<style lang="less" scoped>
  .card {
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    box-shadow: 2px 2px 4px var(--color-neutral-3);
    display: flex;
    flex-direction: column;
    &-title {
      height: 32px;
      padding-left: 24px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-neutral-3);
      position: relative;
      span {
        font-size: 16px;
        font-weight: 500;
        color: var(--color-text-1);
      }
      &::after {
        content: '';
        position: absolute;
        top: 20%;
        left: 8px;
        width: 4px;
        height: 60%;
        border-radius: 2px;
        background-color: rgb(var(--primary-6));
      }
    }
    &-content {
      flex: 1;
    }
  }
</style>
