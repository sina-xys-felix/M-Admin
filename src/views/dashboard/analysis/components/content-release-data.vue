<template>
  <a-spin :loading="loading" style="width: 100%">
    <Card :title="$t('dashboard.analysis.contentReleaseData')">
      <div class="chart">
        <MChart :option="chartOption" />
      </div>
    </Card>
  </a-spin>
</template>

<script setup lang="ts">
  import Card from '../../components/card.vue'

  import { ToolTipFormatterParams } from '@/types/echarts'
  import useLoading from '@/hooks/loading'
  import { queryContentPublish, ContentPublishRecord } from '@/api/dashboard'
  import useChartOption from '@/hooks/chart-option'

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
      )
      .join('')
  }

  const { loading, setLoading } = useLoading(true)
  const xAxis = ref<string[]>([])
  const textChartsData = ref<number[]>([])
  const imgChartsData = ref<number[]>([])
  const videoChartsData = ref<number[]>([])
  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '2%',
        right: 0,
        top: '40',
        bottom: '20',
      },
      legend: {
        top: 0,
        right: 0,
        icon: 'circle',
        textStyle: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
      },
      xAxis: {
        type: 'category',
        data: xAxis.value,
        axisLine: {
          lineStyle: {
            color: isDark ? '#3f3f3f' : '#A9AEB8',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#86909C',
          },
        },
        axisLabel: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return `${value}`
            return `${value / 1000}k`
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#3F3F3F' : '#E5E6EB',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[]
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`
        },
        className: 'echarts-tooltip-diy',
      },
      series: [
        {
          name: '纯文本',
          data: textChartsData.value,
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#4A7FF7' : '#246EFF',
        },
        {
          name: '图文类',
          data: imgChartsData.value,
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#085FEF' : '#00B2FF',
        },
        {
          name: '视频类',
          data: videoChartsData.value,
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#A079DC' : '#8973F1',
          itemStyle: {
            borderRadius: 2,
          },
        },
      ],
    }
  })
  const fetchData = async () => {
    setLoading(true)
    try {
      const chartData = await queryContentPublish()
      xAxis.value = chartData[0].x
      chartData.forEach((el: ContentPublishRecord) => {
        if (el.name === '纯文本') {
          textChartsData.value = el.y
        } else if (el.name === '图文类') {
          imgChartsData.value = el.y
        }
        videoChartsData.value = el.y
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
