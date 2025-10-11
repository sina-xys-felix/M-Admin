import * as echarts from 'echarts'
import geoJson from '@/assets/yunnan.json'
import mapBg from '@/assets/images/dataview/mapBg.png'
echarts.registerMap('yunnan', geoJson as any)

// 生成地图数据柱数据
const getLineData = () => {
  const districtData: {
    name: string
    value: number
    point: number[]
  }[] = [
    {
      name: '昆明',
      value: 267,
      point: [102.712251, 25.040609],
    },
    {
      name: '保山',
      value: 200,
      point: [99.167133, 25.111802],
    },
    {
      name: '昭通',
      value: 129,
      point: [103.717216, 27.336999],
    },
    {
      name: '楚雄',
      value: 107,
      point: [101.546046, 25.041988],
    },
    {
      name: '西双版纳',
      value: 86,
      point: [100.797941, 22.001724],
    },
    {
      name: '曲靖',
      value: 206,
      point: [103.797851, 25.501557],
    },
    {
      name: '玉溪',
      value: 186,
      point: [102.543907, 24.350461],
    },
    {
      name: '普洱',
      value: 156,
      point: [100.972344, 22.777321],
    },
    {
      name: '红河',
      value: 106,
      point: [103.383182, 23.366775],
    },
  ]
  const lineSeriesData: any = []
  const maxValue: number = Math.max(...districtData.map((item) => item.value))
  districtData.forEach((item: any, index: number) => {
    // 柱子
    const lineData = {
      type: 'lines',
      zlevel: 5,
      effect: {
        show: false,
        symbolSize: 5,
      },
      lineStyle: {
        width: 10,
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(240, 195, 15, 1)',
            },
            {
              offset: 1,
              color: 'rgba(240, 195, 15, 1)',
            },
          ],
          global: false,
        },
        opacity: 1,
        curveness: 0,
      },
      label: {
        show: 0,
        position: 'end',
        formatter: '245',
      },
      silent: true,
      data: [
        {
          ...item,
          coords: [item.point, [item.point[0], item.point[1] + item.value / maxValue]],
        },
      ],
    }
    // 柱子顶部
    const lineTop: any = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 5,
      label: {
        show: false,
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: 'rgba(240, 195, 15, 1)',
      },
      silent: true,
      data: [
        [item.point[0], item.point[1] + item.value / maxValue],
        [item.point[0], item.point[1] + item.value / maxValue],
      ],
    }
    // 柱子底部
    const lineBottom: any = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 4,
      label: {
        show: false,
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(232, 204, 149, 1)',
            },
            {
              offset: 1,
              color: 'rgba(170, 144, 91, 1)',
            },
          ],
          global: false,
        },
      },
      silent: true,
      data: [item.point],
    }
    // 底部光圈
    const lineBottomCircle: any = {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [
        {
          name: item['name'],
          value: [item.point[0], item.point[1], item['value']],
        },
      ],
      showEffectOn: 'render',
      rippleEffect: {
        scale: 5,
        brushType: 'stroke',
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'bottom',
          show: false,
          color: '#fff',
          distance: 10,
        },
      },
      symbol: 'circle',
      symbolSize: [20, 10],
      itemStyle: {
        normal: {
          color: 'rgba(232, 204, 149, 1)',
          shadowBlur: 10,
          shadowColor: 'rgba(232, 204, 149, 1)',
        },
        opacity: 1,
      },
      zlevel: 4,
    }
    // 顶部图标
    lineSeriesData.push(lineData)
    lineSeriesData.push(lineTop)
    lineSeriesData.push(lineBottom)
    lineSeriesData.push(lineBottomCircle)
  })
  return lineSeriesData
}

const lineSeriesData = getLineData()

// 获取地图配置
export const getMapOption = () => {
  // 渐变层颜色
  const colorList: string[] = [
    '#8b5e70',
    '#81596d',
    '#78556a',
    '#6e5068',
    '#644c65',
    '#5b4762',
    '#51435f',
    '#483e5c',
    '#3e3a59',
    '#343557',
    '#2b3154',
    '#212c51',
  ]
  // 生成渐变图层
  const geoList: any = []
  for (let i = 1; i <= colorList.length; i++) {
    const mapOption: any = {
      map: 'yunnan',
      aspectScale: 1,
      emphasis: {
        disabled: true,
      },
      z: 12 - i,
      layoutCenter: ['50%', `${i * 0.3 + 53}%`], //地图位置
      layoutSize: '75%',
      roam: false, // 禁止缩放和平移（可选）
      itemStyle: {
        areaColor: colorList[i - 1],
        borderWidth: 0,
      },
    }
    if (i === colorList.length) {
      mapOption.itemStyle.shadowColor = 'rgba(0, 0, 0, 0.71)'
      mapOption.itemStyle.shadowBlur = 100
    }
    geoList.push(mapOption)
  }
  const option = {
    geo: [
      // 最外围发光边界
      {
        map: 'yunnan',
        aspectScale: 1,
        layoutCenter: ['50%', '53%'], //地图位置
        layoutSize: '75%',
        roam: false, // 禁止缩放和平移（可选）
        z: 12,
        emphasis: {
          disabled: true,
        },
        itemStyle: {
          borderColor: 'rgb(180, 137, 81)',
          borderWidth: 8,
          shadowColor: 'rgba(218, 163, 88, 0.4)',
          shadowBlur: 20,
        },
      },
      // 最外层遮罩蒙版
      {
        map: 'yunnan',
        aspectScale: 1,
        layoutCenter: ['50%', '53%'], //地图位置
        layoutSize: '75%',
        roam: false, // 禁止缩放和平移（可选）
        z: 14,
        itemStyle: {
          areaColor: 'rgba(106, 125, 171, 0.45)',
          borderWidth: 0,
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 18,
        },
      },
      // 内部蓝色边界
      {
        map: 'yunnan',
        aspectScale: 1,
        layoutCenter: ['50%', '53%'], //地图位置
        layoutSize: '75%',
        roam: false, // 禁止缩放和平移（可选）
        z: 12,
        emphasis: {
          disabled: true,
        },
        itemStyle: {
          areaColor: {
            image: mapBg,
          },
          borderColor: '#d6dbe6ff',
          borderWidth: 3,
        },
      },
      ...geoList,
    ],
    series: [...lineSeriesData],
  }
  return option
}
