<template>
    <MPanel>
        <template #header>城市销售TOP5</template>
        <template #content>
            <MEcharts ref="chartRef" :option="option" @onload="startHighlightLoop" />
        </template>
    </MPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import MPanel from '@/views/dataview/common/MPanel.vue'
import MEcharts from '@/views/dataview/common/MEcharts.vue'

const option = ref<any>({})
const chartRef = ref()
let highlightTimer: any = null
let currentIndex = 0
const seriesData = [80, 100, 125, 100, 88]

const createEchartBar = () => {
    return {
        /**区域位置*/
        grid: {
            left: '2%',
            right: '2%',
            top: '5%',
            bottom: '10%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['店铺A', '店铺B', '店铺C', '店铺D', '店铺E'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#C5D6E6',
                fontSize: 12
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(52, 71, 112, 1)',
                    type: 'dashed'
                }
            },
            axisLabel: {
                show: false,
                color: '#C5D6E6',
                fontSize: 14
            },
            axisTick: {
                show: false
            },
        },
        series: [
            {
                name: '数(人次)',
                type: 'pictorialBar',
                barWidth: '150%',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 14,
                    color: 'rgba(201, 211, 234, 1)',
                    offset: [0, -10]
                },
                itemStyle: {
                    normal: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(
                            0,
                            1,
                            0,
                            0,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(153,232,247, .7)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.6,
                                    color: 'rgba(153,232,247, 0.9)' // 60% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(153,230,245, 1)' // 100% 处的颜色
                                }
                            ],
                            false
                        ),
                        borderColor: 'rgba(109, 128, 175, 1)', // 边框颜色
                        borderWidth: 4, // 边框宽度
                        borderRadius: [100, 100]
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            1,
                            0,
                            0,
                            [
                                {
                                    offset: 0, // rgba(240, 195, 15, 1)
                                    color: 'rgba(240, 195, 15, 0.3)' // 0% 处的颜色
                                    // color: 'rgba(218, 163, 88, 0.3)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.6,
                                    color: 'rgba(240, 195, 15, 0.8)' // 60% 处的颜色
                                    // color: 'rgba(218, 163, 88, 0.8)' // 60% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(240, 195, 15, 0)' // 100% 处的颜色
                                    // color: 'rgba(218, 163, 88, 0)' // 100% 处的颜色
                                }
                            ],
                            false
                        ),
                        borderColor: 'rgba(240, 195, 15, 1)' // 边框颜色
                    }
                },
                data: [80, 100, 125, 100, 88],
                z: 10
            }
        ]
    }
}

// 高亮循环方法
const startHighlightLoop = (chart: any) => {
    if (!chart) return

    // 如果已经存在定时器，先清除
    if (highlightTimer) {
        clearInterval(highlightTimer)
        highlightTimer = null
    }

    highlightTimer = setInterval(() => {
        // 取消之前的高亮
        chart.dispatchAction({
            type: 'downplay'
        })
        // 高亮当前柱子
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        })
        // 更新索引，循环
        currentIndex = (currentIndex + 1) % seriesData.length
    }, 1500)
}

onMounted(() => {
    option.value = createEchartBar()
})
onUnmounted(() => {
    if (highlightTimer) {
        clearInterval(highlightTimer)
    }
})
</script>