import { onUnmounted, ref } from 'vue'
import { Howl } from 'howler'

interface AudioConfig {
  src: string
  loop?: boolean
  volume?: number
}
/**
 * @description 音频播放
 * @param {AudioConfig[]} audioConfigs 音频配置
 * @return {void}
 * */
export function useHowler(audioConfigs: AudioConfig[]): void {
  const sounds = ref<Howl[]>([])

  const loadSounds = async () => {
    const newSounds = await Promise.all(
      audioConfigs.map(async (config) => {
        const sound = new Howl({
          src: config.src,
          loop: config.loop || false,
          volume: config.volume || 1,
          onload: () => {
            // 自动播放
            sound.play()
          },
          onend: () => {
            // 如果没有设置循环，则在结束时停止
            if (!sound._loop) {
              sound.stop()
            }
          },
        })
        return sound
      })
    )
    sounds.value = newSounds
  }

  const stopAllSounds = () => {
    sounds.value.forEach((sound: Howl) => {
      sound.stop()
      sound.unload() // 清理资源
    })
  }

  loadSounds()

  onUnmounted(() => {
    stopAllSounds()
  })
}
