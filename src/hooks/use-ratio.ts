/**
 * 计算比例
 * @param {number} width - 设计图的宽度
 * @param {number} height - 设计图的高度
 * @param {HTMLElement} el - 需要应用比例的元素
 */

export const useRatio = (width = 1920, height = 1080, el: HTMLElement) => {
  const calculateRatio = () => {
    // 设计图的宽高
    const baseWidth = width as number
    const baseHeight = height as number
    // 设计图的比例
    const baseRate = parseFloat((baseWidth / baseHeight).toFixed(5))

    // 当前屏幕的比例
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))

    // 用于存储计算后的宽度和高度比例
    const scale = {
      widthRatio: 1,
      heightRatio: 1,
    }

    // 根据当前屏幕比例和设计图比例计算适当的缩放比例
    if (currentRate > baseRate) {
      // 如果当前比例大于设计图比例，则根据高度计算比例
      scale.widthRatio = parseFloat(((window.innerHeight * baseRate) / baseWidth).toFixed(5))
      scale.heightRatio = parseFloat((window.innerHeight / baseHeight).toFixed(5))
    } else {
      // 如果当前比例小于或等于设计图比例，则根据宽度计算比例
      scale.heightRatio = parseFloat((window.innerWidth / baseRate / baseHeight).toFixed(5))
      scale.widthRatio = parseFloat((window.innerWidth / baseWidth).toFixed(5))
    }
    // 设置等比缩放或者放大
    el.style.transform = `scale(${scale.widthRatio}, ${scale.heightRatio}) translate(-50%, 0)`
  }
  onMounted(() => {
    window.addEventListener('resize', () => {
      calculateRatio()
    })
  })

  return {
    calculateRatio,
  }
}
