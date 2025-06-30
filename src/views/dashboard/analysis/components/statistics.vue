<template>
  <div class="statistics">
    <div class="statistics-item" v-for="(item, index) in list" :key="item.title">
      <a-avatar :size="64" style="background-color: var(--color-fill-2)">
        <MIconFont :name="`${item.icon}`" :size="42" />
      </a-avatar>
      <a-statistic :title="$t(`${item.title}`)" :value="item.value" show-group-separator>
        <template #suffix>
          <icon-arrow-rise v-if="index % 2 === 0" style="color: rgb(var(--danger-6))" />
          <icon-arrow-fall v-else style="color: rgb(var(--success-6))" />
        </template>
      </a-statistic>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AnalysisStat',
  }
</script>

<script setup lang="ts">
  import MIconFont from '@/components/m-iconfont/index.vue'

  const list = computed(() => {
    return [
      {
        title: 'dashboard.analysis.statistics.visit',
        value: Math.floor(Math.random()*1000),
        icon: 'visit',
      },
      {
        title: 'dashboard.analysis.statistics.like',
        value: Math.floor(Math.random()*3000),
        icon: 'like',
      },
      {
        title: 'dashboard.analysis.statistics.collect',
        value: Math.floor(Math.random()*1000),
        icon: 'collect',
      },
      {
        title: 'dashboard.analysis.statistics.comment',
        value: Math.floor(Math.random()*2500),
        icon: 'comment',
      },
      {
        title: 'dashboard.analysis.statistics.share',
        value: Math.floor(Math.random()*3500),
        icon: 'share',
      },
      {
        title: 'dashboard.analysis.statistics.add',
        value: Math.floor(Math.random()*800),
        icon: 'add',
      },
    ]
  })
</script>

<style lang="less" scoped>
  .statistics {
    display: flex;
    gap: 16px;
    &-item {
      display: flex;
      align-items: center;
      width: calc((100% - 80px) / 6);
      gap: 16px;
      background: var(--color-bg-2);
      border-radius: 8px;
      box-shadow: 2px 0px 8px var(--color-neutral-3);
      padding: 16px;
    }
  }

  :deep(.arco-statistic) {
    line-height: 1;
  }
</style>
