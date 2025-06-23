<template>
  <Card :title="$t('dashboard.welcome.technologyStack')">
    <div class="stack">
      <div class="stack-item" v-for="item in technologyStack" :key="item.name">
        <a-avatar shape="circle" :size="48" style="background-color: var(--color-fill-2)">
          <MIconFont :name="`${item.icon}`" :size="30" />
        </a-avatar>
        <div class="list">
          <div class="name">{{ item.name }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import Card from '@/views/dashboard/components/card.vue'
  import MIconFont from '@/components/m-iconfont/index.vue'

  const technologyStack = ref([
    {
      name: 'Vue',
      icon: 'vue',
      description: 'Vue is a progressive framework for building user interfaces.',
    },
    {
      name: 'TypeScript',
      icon: 'ts',
      description: 'typescript is a programming language for the web.',
    },
    {
      name: 'arco-design-vue',
      icon: 'arco',
      description: 'arco-design is a design system for Vue.js.',
    },
    {
      name: 'Axios',
      icon: 'axios',
      description: 'axios is a promise-based HTTP client for the browser and node.js.',
    },
    {
      name: 'Vite',
      icon: 'vite',
      description: 'vite is a build tool for Vue.js.',
    },
    {
      name: 'Echarts',
      icon: 'echarts',
      description: 'Echarts is a charting library for Vue.js.',
    },
  ])
</script>

<style lang="less" scoped>
  @spacing-base: 16px;
  .stack {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: @spacing-base;
    padding: @spacing-base;

    &-item {
      display: flex;
      align-items: center;
      width: calc((100% - 32px) / 3); // 核心修改：固定每行3个
      box-sizing: border-box; // 确保padding/border不破坏布局
      border-radius: 8px;
      box-shadow: 2px 0px 8px var(--color-neutral-3);
      padding: @spacing-base;
      gap: 16px;
      .list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .name {
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-1);
        }
        .description {
          font-size: 14px;
          color: var(--color-text-2);
        }
      }
    }
  }
</style>
