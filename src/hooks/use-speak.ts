/**
 * @description 浏览器自带功能，文字转语音并进行播报
 * @param message 文字内容
 * @param pitch 表示说话的音高,数值,范围从0（最小）到2（最大）。默认值为1
 * @param rate 语速，数值，默认值是1，范围是0.1到10
 * @param volume 声音的音量
 * */
export const useSpeak = (pitch = 2, rate = 1, volume = 100, lang = 'zh-CN') => {
  let utterance: SpeechSynthesisUtterance | null = null

  let isPaused = false

  const speckText = (text: string) => {
    window.speechSynthesis.cancel()
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find((item) => item.lang.indexOf('zh-') > -1)
    if (!voice) {
      console.error('没有可用的中文语音')
    }

    utterance = new window.SpeechSynthesisUtterance()
    utterance.text = text
    utterance.lang = lang
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.volume = volume
    if (text) window.speechSynthesis.speak(utterance)
  }

  const pause = () => {
    if (window.speechSynthesis && utterance) {
      window.speechSynthesis.pause()
      isPaused = true
    }
  }

  const resume = () => {
    if (isPaused && window.speechSynthesis && utterance) {
      window.speechSynthesis.resume()
      isPaused = false
    }
  }

  const stop = () => {
    if (window.speechSynthesis && utterance) {
      window.speechSynthesis.cancel()
      isPaused = false
    }
  }

  // speckText()

  return {
    speckText,
    pause,
    resume,
    stop,
  }
}
