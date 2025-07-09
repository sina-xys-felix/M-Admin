<template>
  <div class="analysis">
    <AnalysisStat class="block" style="height: 96px" />
    <div class="panel">
      <div class="panel-item left-side">
        <DataContent />
      </div>
      <div class="panel-item right-side">
        <CategoryStatistics />
      </div>
    </div>
    <div class="panel mt16">
      <div class="panel-item left-side">
        <ContentReleaseData />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AnalysisStat from './components/statistics.vue'
  import DataContent from './components/data-content.vue'
  import CategoryStatistics from './components/category-statistics.vue'
  import ContentReleaseData from './components/content-release-data.vue'
</script>

<style lang="less" scoped>
  .analysis {
    height: 100%;
    overflow: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    .block {
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .panel {
      width: 100%;
      // height: 328px;
      display: flex;
      gap: 16px;
      flex: 1;
      &-item {
        background: var(--color-bg-2);
        border-radius: 8px;
        display: flex;
      }
      .left-side {
        flex: 5;
        // width: calc(((100% - 8px) / 6) * 4);
      }
      .right-side {
        flex:2
        // width: calc(((100% - 8px) / 6) * 2);
      }
    }
  }
</style>
