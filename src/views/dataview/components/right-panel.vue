<!-- 右侧数据面板 -->
<template>
    <div class="right-panel">
        <BarChart />
        <Top5Tourists />
        <RankList />
    </div>
</template>

<script setup lang="ts">
import BarChart from './right-panel/bar-chart.vue';
import Top5Tourists from './right-panel/top5-tourists.vue';
import RankList from './right-panel/ranking.vue';
</script>

<style lang="less" scoped>
.right-panel {
    position: absolute;
    width: 560px;
    height: 100%;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding: 78px 0 8px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: rgba(6, 31, 64, .15);
}

.panel {
    right: -560px;
    animation: entranceAnimation ease-in-out 0.75s forwards;
}

@keyframes entranceAnimation {
    0% {
        right: -560px;
    }

    100% {
        right: 0;
    }
}
</style>