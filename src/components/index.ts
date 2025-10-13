import { App } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components'
import MChart from './m-chart/index.vue'
import MTable from './m-table/index.vue'
import MBtnGroup from './m-button-group/index.vue'
import MDict from './m-dict/index.vue'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
])

export default {
  install(Vue: App) {
    Vue.component('MChart', MChart)
    Vue.component('MTable', MTable)
    Vue.component('MBtnGroup', MBtnGroup)
    Vue.component('MDict', MDict)
  },
}
