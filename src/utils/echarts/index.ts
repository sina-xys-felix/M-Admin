import { onMounted, onUnmounted, Ref, unref } from 'vue'
import echarts from './library'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import { RenderType, ThemeType } from './types'
import { AnyObject } from '@/common/types/global'

export function useECharts(
  elparams: Ref<HTMLDivElement> | HTMLDivElement,
  autoUpdateSize = false,
  render: RenderType = RenderType.SVGRenderer,
  theme = ThemeType.Default,
  animation = true
) {
  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)

  // echats实例
  let echartsInstance: echarts.ECharts | null = null

  // 初始化 echats实例
  function initCharts() {
    const el = unref(elparams)

    if (!el) return

    echartsInstance = echarts.init(el, theme)
  }

  // 配置
  function setOptions(option: AnyObject) {
    showLoading()

    if (!echartsInstance) initCharts()

    if (!echartsInstance) return

    echartsInstance.setOption(option)

    hideLoading()
  }

  // 获取 echats实例
  function getInstance() {
    if (!echartsInstance) initCharts()

    return echartsInstance
  }

  // 更新大小
  function onResize() {
    echartsInstance?.resize()
  }

  // 监听元素大小变化
  function watchEl() {
    if (animation) unref(elparams).style.transition = 'width 1s, height 1s'

    const resizeObserve = new ResizeObserver(() => onResize())

    resizeObserve.observe(unref(elparams))
  }

  // 显示加载状态
  function showLoading() {
    if (!echartsInstance) initCharts()

    echartsInstance?.showLoading()
  }

  // 隐藏加载状态
  function hideLoading() {
    if (!echartsInstance) initCharts()

    echartsInstance?.hideLoading()
  }

  // 生命钩子——组件挂载完成
  onMounted(() => {
    window.addEventListener('resize', onResize)

    if (autoUpdateSize) watchEl()
  })

  // 生命钩子——页面销毁
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return { setOptions, getInstance }
}
