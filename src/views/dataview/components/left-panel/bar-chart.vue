<template>
    <MPanel class="age-distribution">
        <template #header>GMV对比</template>
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
import type { EChartsOption, TooltipComponentOption, CustomSeriesOption, BarSeriesOption } from 'echarts'

const option = ref<EChartsOption>({})
const chartRef = ref()
let highlightTimer: any = null
let currentIndex = 0
const values: number[] = [120, 150, 200, 160, 115]
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
        currentIndex = (currentIndex + 1) % values.length
    }, 1500)
}

const createEchartBar = (): EChartsOption => {
    const offsetX = 10
    const offsetY = 5
    // 创建左侧面
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx: any, shape: any) {
            const xAxisPoint = shape.xAxisPoint
            const c0 = [shape.x, shape.y]
            const c1 = [shape.x - offsetX, shape.y - offsetY]
            const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1]]
            const c3 = [xAxisPoint[0], xAxisPoint[1]]
            ctx.moveTo(c0[0], c0[1])
            ctx.lineTo(c1[0], c1[1])
            ctx.lineTo(c2[0], c2[1])
            ctx.lineTo(c3[0], c3[1])
            ctx.closePath()
        }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx: any, shape: any) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x, shape.y]
            const c2 = [xAxisPoint[0], xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1]]
            const c4 = [shape.x + offsetX, shape.y - offsetY]
            ctx.moveTo(c1[0], c1[1])
            ctx.lineTo(c2[0], c2[1])
            ctx.lineTo(c3[0], c3[1])
            ctx.lineTo(c4[0], c4[1])
            ctx.closePath()
        }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx: any, shape: any) {
            const c1 = [shape.x, shape.y]
            const c2 = [shape.x + offsetX, shape.y - offsetY] //右点
            const c3 = [shape.x, shape.y - offsetX]
            const c4 = [shape.x - offsetX, shape.y - offsetY]
            ctx.moveTo(c1[0], c1[1])
            ctx.lineTo(c2[0], c2[1])
            ctx.lineTo(c3[0], c3[1])
            ctx.lineTo(c4[0], c4[1])
            ctx.closePath()
        }
    })
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params: any) {
                const item = params[1]
                return item.name + ' : ' + item.value
            }
        } as TooltipComponentOption,
        grid: {
            left: '0%',
            right: '0%',
            top: '20%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['店铺A', '店铺B', '店铺C', '店铺D', '店铺E'],
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: 'rgba(76, 93, 130, 1)'
                }
            },

            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 12,
                color: 'rgba(201, 211, 234, 1)'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            name: '万元',
            nameTextStyle: {
                color: 'rgba(201, 211, 234, 1)',
                fontSize: 14,
                padding: [0, 32, 12, 0]
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(49, 58, 86, 1)'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 14,
                color: 'rgba(201, 211, 234, 1)'
            }
        },
        series: [
            {
                type: 'custom',
                renderItem: (_params: any, api: any) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                        type: 'group',
                        children: [
                            {
                                type: 'CubeLeft',
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(153,232,247, 1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(115,181,248, 1)'
                                        }
                                    ])
                                },
                                // hover样式
                                emphasis: {
                                    style: {
                                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(240, 195, 15, 1)'
                                                // color: 'rgba(230, 165, 75, 1)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(240, 195, 15, 1)'
                                            }
                                        ])
                                    }
                                }
                            },
                            {
                                type: 'CubeRight',
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(153,232,247, 1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(115,181,248, 1)'
                                        }
                                    ])
                                },
                                emphasis: {
                                    style: {
                                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(240, 195, 15, 1)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(240, 195, 15, 1)'
                                            }
                                        ])
                                    }
                                }
                            },
                            {
                                type: 'CubeTop',
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(141,216,250, 1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(141,216,250, 1)'
                                        }
                                    ])
                                },
                                emphasis: {
                                    style: {
                                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(240, 195, 15, 1)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(240, 195, 15, 1)'
                                            }
                                        ])
                                    }
                                }
                            }
                        ]
                    }
                },
                data: values
            } as unknown as CustomSeriesOption,
            {
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 14,
                    color: 'rgba(201, 211, 234, 1)',
                    offset: [0, -12]
                },
                itemStyle: {
                    color: 'transparent'
                },
                tooltip: {},
                data: values
            } as BarSeriesOption
        ]
    }
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