<template>
    <MPanel>
        <template #header>某某数据占比</template>
        <template #content>
            <div class="box">
                <div class="box-item">
                    <MEcharts class="chart" ref="chartRef" :option="chartOption" />
                </div>
                <div class="box-item box-list">
                    <div class="box-list-item" v-for="(item, index) in seriesData">
                        <div class="box-list-item_name">
                            <div class="dot" :style="{ background: colorPalette[index].outer }"></div>
                            <span>{{ item.label }}</span>
                        </div>
                        <div class="box-list-item_text">
                            <span> {{ item.value }}</span>
                            <span class="unit">万元</span>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </MPanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MPanel from '@/views/dataview/common/MPanel.vue'
import MEcharts from '@/views/dataview/common/MEcharts.vue'
import type { EChartsOption } from 'echarts'

// 类型定义
interface SeriesItem {
    label: string
    value: number
}

// 响应式数据
const seriesData = ref<SeriesItem[]>([
    { label: '店铺A', value: 10 },
    { label: '店铺B', value: 10 },
    { label: '店铺C', value: 30 },
    { label: '店铺D', value: 35 }
])

const colorPalette = [
    { inner: '#3A5A6C', outer: '#69EEFE' },
    { inner: '#6B7B5C', outer: '#F8C927' },
    { inner: '#4D3927', outer: '#FF7F0D' },
    { inner: '#26446C', outer: '#049EFF' }
]

// 计算图表配置
const chartOption = computed<EChartsOption>(() => ({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}万元 ({d}%)'
    },
    series: [
        // 内环
        {
            type: 'pie',
            radius: ['61%', '71%'],
            data: seriesData.value.map((item, i) => ({
                name: item.label,
                value: item.value,
                itemStyle: { color: colorPalette[i].inner }
            })),
            label: { show: false },
            hoverAnimation: false
        },
        // 外环
        {
            type: 'pie',
            radius: ['71%', '85%'],
            data: seriesData.value.map((item, i) => ({
                name: item.label,
                value: item.value,
                itemStyle: { color: colorPalette[i].outer }
            })),
            label: { show: false },
            hoverAnimation: false
        }
    ]
}))
</script>

<style lang="less" scoped>
.box {
    height: 100%;
    display: flex;
    padding-bottom: 24px;

    &-item {
        flex: 1;

        .chart {
            background: url('@/assets/images/dataview/circle.png')no-repeat center center;
            background-size: 208px 208px;
        }
    }

    &-list {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: #989CA3;

        padding-left: 32px;

        &-item {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;

            &_name {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;

                .dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }
            }

            &_text {
                flex: 1;

                span {
                    font-size: 18px;
                    padding-right: 4px;
                    color: #F8C927;
                }

                .unit {
                    color: #989CA3;
                }
            }
        }
    }
}
</style>