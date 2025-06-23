/**
  @description 需求：给整个页面添加背景水印。
  @example <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
**/

import type { Directive, DirectiveBinding } from 'vue'
const addWaterMarker: Directive = (text: string, parentNode: any, font: any, textColor: string) => {
  // 水印文字，父元素，字体，文字颜色
  const can: HTMLCanvasElement = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 205
  can.height = 140
  can.style.display = 'none'
  const cans = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft PingFang SC'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle' as CanvasTextBaseline
  cans.fillText(text, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

const waterMarker = {
  mounted(el: DirectiveBinding, binding: DirectiveBinding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
  },
  updated(el: DirectiveBinding, binding: DirectiveBinding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
  },
}

export default waterMarker
