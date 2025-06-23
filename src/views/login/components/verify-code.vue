<template>
  <div class="captcha">
    <canvas ref="canvasRef" :width="width" :height="height" @click="refreshCaptcha"></canvas>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    width: {
      type: Number,
      default: 120,
    },
    height: {
      type: Number,
      default: 40,
    },
    codeLength: {
      type: Number,
      default: 5,
    },
  })

  const captchaText = ref('')

  const canvasRef = ref()

  onMounted(() => {
    refreshCaptcha()
  })

  const emits = defineEmits(['getCode'])

  const generateRandomText = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < props.codeLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const refreshCaptcha = () => {
    captchaText.value = generateRandomText()
    drawCaptcha()
    emits('getCode', captchaText.value)
  }

  const drawCaptcha = () => {
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 背景色
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制文字
    ctx.font = '20px Arial'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // 添加干扰线
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = getRandomColor()
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }

    // 添加噪点
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = getRandomColor()
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
    }

    // 绘制文字（每个字符单独处理以增加变形）
    for (let i = 0; i < captchaText.value.length; i++) {
      ctx.save()
      ctx.translate(10 + i * 16, 16)
      ctx.rotate((Math.random() - 0.5) * 0.4)
      ctx.fillText(captchaText.value[i], 0, 0)
      ctx.restore()
    }
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  defineExpose({
    code: captchaText,
    refresh: refreshCaptcha,
  })
</script>

<style>
  .captcha canvas {
    cursor: pointer;
  }
</style>
