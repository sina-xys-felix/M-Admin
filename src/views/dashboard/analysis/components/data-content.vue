<template>
  <a-spin :loading="loading" style="width: 100%">
    <Card :title="$t('dashboard.analysis.dataContent')">
      <div class="chart">
        <MChart :option="chartOption" />
      </div>
    </Card>
  </a-spin>
</template>

<script lang="ts">
  export default {
    name: 'DataContent',
  }
</script>

<script setup lang="ts">
  import Card from '../../components/card.vue'
  import { graphic } from 'echarts'
  import useLoading from '@/hooks/loading'
  import { queryContentData, ContentDataRecord } from '@/api/dashboard'
  import useChartOption from '@/hooks/chart-option'
  import { ToolTipFormatterParams } from '@/common/types/echarts'
  import { AnyObject } from '@/common/types/global'
  import { useAppStore } from '@/store'

  function graphicFactory(side: AnyObject, isDark: boolean) {
    return {
      type: 'text',
      bottom: '8',
      ...side,
      style: {
        text: '',
        textAlign: 'center',
        fill: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        fontSize: 12,
      },
    }
  }
  const { loading, setLoading } = useLoading(true)
  const xAxis = ref<string[]>([])
  const chartsData = ref<number[]>([])
  const appStore = useAppStore()
  const graphicElements = ref([
    graphicFactory({ left: '3%' }, appStore.theme === 'dark'),
    graphicFactory({ right: 0 }, appStore.theme === 'dark'),
  ])

  watch(
    () => appStore.theme,
    (newVal) => {
      if (newVal === 'dark') {
        graphicElements.value[0].style.fill = 'rgba(255, 255, 255, 0.7)'
        graphicElements.value[1].style.fill = 'rgba(255, 255, 255, 0.7)'
      } else {
        graphicElements.value[0].style.fill = '#4E5969'
        graphicElements.value[1].style.fill = '#4E5969'
      }
    }
  )

  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '3%',
        right: '0',
        top: '10',
        bottom: '30',
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return ''
            if (idx === xAxis.value.length - 1) return ''
            return `${value}`
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: (idx: number) => {
            if (idx === 0) return false
            if (idx === xAxis.value.length - 1) return false
            return true
          },
          lineStyle: {
            color: '#E5E8EF',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          formatter(value: string, idx: number) {
            if (idx === 0) return value
            return `${value}k`
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#E5E8EF',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[]
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
              Number(firstElement.value) * 10000
            ).toLocaleString()}</span></div>
          </div>`
        },
        className: 'echarts-tooltip-diy',
      },
      graphic: {
        elements: graphicElements.value,
      },
      series: [
        {
          data: chartsData.value,
          type: 'line',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(30, 231, 255, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(36, 154, 255, 1)',
              },
              {
                offset: 1,
                color: 'rgba(111, 66, 251, 1)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0.16)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
      ],
    }
  })
  const fetchData = async () => {
    setLoading(true)
    try {
      const chartData = await queryContentData()
      chartData.forEach((el: ContentDataRecord, idx: number) => {
        xAxis.value.push(el.x)
        chartsData.value.push(el.y)
        if (idx === 0) {
          graphicElements.value[0].style.text = el.x
        }
        if (idx === chartData.length - 1) {
          graphicElements.value[1].style.text = el.x
        }
      })
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false)
    }
  }
  fetchData()
</script>

<style lang="less" scoped>
  .chart {
    width: 100%;
    padding: 16px;
    height: 296px;
  }
</style>
