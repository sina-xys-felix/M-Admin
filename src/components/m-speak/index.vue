<template>
  <div class="speak" @click="handleClick">
    <icon-mute style="color: #fff" v-if="isShow" />
    <icon-sound style="color: #fff" v-else />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MSpeak',
  }
</script>

<script setup lang="ts">
  import { useSpeak } from '@/hooks/use-speak'
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  })
  const { speckText, stop, resume, pause } = useSpeak()
  const isPaused = ref(false)
  const start = ref(false)
  const isShow = ref(false)

  const handleClick = () => {
    isShow.value = !isShow.value
    if (!start.value) {
      setTimeout(() => {
        const message = props.text?.replaceAll('\n', '').replaceAll('#', '').replaceAll('*', '')
        speckText(message)
        start.value = true
        isPaused.value = false
      }, 10)
    } else {
      if (isPaused.value) {
        resume()
        isPaused.value = false
      } else {
        pause()
        isPaused.value = true
      }
    }
  }

  onUnmounted(() => {
    stop()
    isPaused.value = false
    start.value = false
    isShow.value = false
  })

  onMounted(() => {
    stop()
    window.addEventListener('beforeunload', () => {
      stop()
      isPaused.value = false
      start.value = false
      isShow.value = false
    })
  })

  watch(
    () => props.visible,
    (newVal) => {
      if (!newVal) {
        stop()
        isPaused.value = false
        start.value = false
        isShow.value = false
      }
    },
    {
      immediate: true,
    }
  )
</script>

<style lang="less">
  .speak {
    background: rgb(var(--primary-6));
    padding: 8px;
    border-radius: 50%;
    display: flex;
    width: 32px;
    height: 32x;
    text-align: center;
    line-height: 32px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    z-index: 9999999;
  }
</style>
