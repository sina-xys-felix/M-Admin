import { ref, onMounted, onUnmounted } from 'vue'

/** 分辨率等级阈值（可根据需求调整） */
const RESOLUTION_THRESHOLDS = {
  K1: 1920, // 1K 典型宽度（1920x1080）
  K2: 2560, // 2K 典型宽度（2560x1440）
  K4: 3840, // 4K 典型宽度（3840x2160）
} as const

/**
 * 获取当前屏幕分辨率等级
 * @returns 1K→10，2K→15，4K→20（可修改返回值逻辑）
 */
const getResolutionLevel = (): number => {
  if (typeof window === 'undefined') return 10 // SSR 默认值
  const screenWidth = window.screen.width || window.innerWidth

  if (screenWidth >= RESOLUTION_THRESHOLDS.K4) return 30
  if (screenWidth >= RESOLUTION_THRESHOLDS.K2) return 15
  return 10
}

/**
 * 获取当前窗口缩放倍率（百分比形式，如 100%、125%）
 */
const getScalePercentage = (): number => {
  if (typeof window === 'undefined') return 100 // SSR 默认值
  const scale = window.devicePixelRatio * 100
  return Math.round(scale * 100) / 100 // 保留两位小数（如 125.00 → 125）
}

/**
 * 整合屏幕信息（分辨率等级 + 缩放倍率）的 Composables
 * @returns 分辨率等级、缩放倍率、停止监听函数
 */
export const useScreenInfo = () => {
  // 响应式状态
  const resolutionLevel = ref(getResolutionLevel())
  const scale = ref(getScalePercentage())

  /** 更新所有屏幕信息 */
  const updateScreenInfo = () => {
    resolutionLevel.value = getResolutionLevel()
    scale.value = getScalePercentage()
  }

  // 生命周期：挂载时绑定事件
  onMounted(() => {
    // 初始调用（确保 SSR 后客户端正确初始化）
    updateScreenInfo()
    // 监听窗口缩放（同时影响分辨率和缩放倍率）
    window.addEventListener('resize', updateScreenInfo)
  })

  // 生命周期：卸载时解绑事件
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenInfo)
  })

  return {
    resolutionLevel, // 分辨率等级（10/15/20）
    scale, // 缩放倍率（如 100、125、150）
    updateScreenInfo, // 暴露手动更新方法（可选）
  }
}
