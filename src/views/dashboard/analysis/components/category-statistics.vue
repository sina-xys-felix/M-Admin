<template>
  <a-spin :loading="loading" style="width: 100%">
    <Card title="分类统计">
      <div class="chart">
        <MChart :option="chartOption" />
      </div>
    </Card>
  </a-spin>
</template>

<script lang="ts">
  export default {
    name: 'CategoryStatistics',
  }
</script>

<script setup lang="ts">
  import useLoading from '@/hooks/loading'
  import Card from '../../components/card.vue'
  import useChartOption from '@/hooks/chart-option'

  const { loading } = useLoading()
  const { chartOption } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        data: ['分类一', '分类二', '分类三'],
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '40%',
            style: {
              text: '总量',
              textAlign: 'center',
              fill: isDark ? '#ffffffb3' : '#4E5969',
              fontSize: 14,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: '928,531',
              textAlign: 'center',
              fill: isDark ? '#ffffffb3' : '#1D2129',
              fontSize: 16,
              fontWeight: 500,
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 14,
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          },
          itemStyle: {
            borderColor: isDark ? '#232324' : '#fff',
            borderWidth: 1,
          },
          data: [
            {
              value: [148564],
              name: '分类二',
              itemStyle: {
                color: isDark ? '#3D72F6' : '#249EFF',
              },
            },
            {
              value: [334271],
              name: '分类三',
              itemStyle: {
                color: isDark ? '#A079DC' : '#313CA9',
              },
            },
            {
              value: [445694],
              name: '分类一',
              itemStyle: {
                color: isDark ? '#6CAAF5' : '#21CCFF',
              },
            },
          ],
        },
      ],
    }
  })
</script>

<style lang="less" scoped>
  .chart {
    width: 100%;
    padding: 16px;
    height: calc(100% - 16px);
  }
</style>
