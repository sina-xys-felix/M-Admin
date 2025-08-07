<template>
  <component :is="type" ref="qrcodeRef" />
</template>

<script setup lang="ts">
  import QRCode from 'qrcode'

  defineOptions({
    name: 'MQrcode',
  })

  interface QrcodeProps {
    type: string
    text: string
    logoUrl: string
    logoSize: number
    options: () => void
  }

  const props = withDefaults(defineProps<QrcodeProps>(), {
    type: 'img',
    text: '',
    logoUrl: '',
    logoSize: 40,
    options: () => {},
  })

  const qrcodeRef = ref()
  const createQRCode = () => {
    if (props.type === 'canvas') {
      QRCode.toCanvas(qrcodeRef.value, props.text, props.options, function (error: any) {
        if (props.logoUrl) addLogoToQRCode()
        if (error) return console.error(error)
      })
    } else {
      QRCode.toDataURL(props.text, props.options, function (error: any, url: any) {
        if (error) return console.error(error)
        qrcodeRef.value.src = url // 将二维码图像显示在 img 元素中
      })
    }
  }

  const addLogoToQRCode = () => {
    const canvas = qrcodeRef.value
    const ctx = canvas.getContext('2d')

    // 创建Logo图像
    const logoImg = new Image()
    logoImg.src = props.logoUrl
    logoImg.crossOrigin = 'Anonymous'

    logoImg.onload = () => {
      // 计算Logo位置（居中）
      const x = (canvas.width - props.logoSize) / 2
      const y = (canvas.height - props.logoSize) / 2

      // 绘制白色背景
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x, y, props.logoSize, props.logoSize)

      // 绘制Logo
      ctx.drawImage(logoImg, x, y, props.logoSize, props.logoSize)
    }
  }

  onMounted(() => {
    createQRCode()
  })
</script>
