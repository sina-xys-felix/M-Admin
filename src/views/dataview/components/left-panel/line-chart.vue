<template>
    <MPanel>
        <template #header>销售额趋势</template>
        <template #content>
            <MEcharts :option="option" />
        </template>
    </MPanel>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import MPanel from '@/views/dataview/common/MPanel.vue'
import MEcharts from '@/views/dataview/common/MEcharts.vue'
const option = ref<any>({})
const createEchartLine = () => {
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: '5%',
            right: '2%',
            itemGap: 20,
            itemWidth: 15,
            itemHeight: 1,
            textStyle: {
                color: '#C5D6E6'
            }
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLabel: {
                    textStyle: {
                        color: '#C5D6E6'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(76, 93, 130, 1)'
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '万元',
                nameTextStyle: {
                    color: 'rgba(201, 211, 234, 1)',
                    fontSize: 14,
                    padding: [0, 32, 12, 0]
                },
                splitNumber: 4,
                splitLine: {
                    lineStyle: {
                        color: 'rgba(52, 71, 112, 1)',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#C5D6E6',
                        fontSize: 14
                    }
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '2023年',
                type: 'line',
                data: [55, 73, 86, 89, 81, 64, 45, 28, 20, 23, 36, 55],
                lineStyle: {
                    width: 2,
                    color: '#F0C30F',
                    shadowColor: 'rgba(218, 163, 88, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: 'rgba(218, 163, 88, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(218, 163, 88, 0)'
                            }
                        ],
                        false
                    )
                },
                itemStyle: {
                    color: 'rgba(15, 222, 255, 1)'
                },
                smooth: true,
                symbol: 'none'
            },
            {
                name: '2024年',
                type: 'line',
                data: [89, 84, 69, 50, 32, 21, 21, 32, 50, 69, 84, 89],
                lineStyle: {
                    width: 2,
                    color: '#0FD8F0'
                    // color: 'rgba(144,225,245, 1)'
                    // color: 'rgba(109, 128, 175, 1)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: 'rgba(109, 128, 175, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(109, 128, 175, 0)'
                            }
                        ],
                        false
                    )
                },
                itemStyle: {
                    color: 'rgba(109, 128, 175, 1)'
                },
                smooth: true,
                symbol: 'none'
            }
        ]
    }
}
onMounted(() => {
    option.value = createEchartLine()
})
</script>