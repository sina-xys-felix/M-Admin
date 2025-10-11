<!-- 左侧数据面板 -->
<template>
    <div class="left-panel">
        <!-- 某某数据占比 -->
        <PieChart />
        <BarChart />
        <LineChart />
    </div>
</template>

<script setup lang="ts">
import PieChart from './left-panel/pie-chart.vue'
import BarChart from './left-panel/bar-chart.vue'
import LineChart from './left-panel/line-chart.vue'
</script>

<style lang="less" scoped>
.left-panel {
    position: absolute;
    width: 560px;
    height: 100%;
    left: 0;
    top: 0;
    padding: 78px 0 8px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: rgba(6, 31, 64, .15);
}

.panel {
    left: -560px;
    animation: entranceAnimation ease-in-out 0.75s forwards;
}

@keyframes entranceAnimation {
    0% {
        left: -560px;
    }

    100% {
        left: 0;
    }
}
</style>