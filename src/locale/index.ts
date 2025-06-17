import { createI18n } from 'vue-i18n'
import en from './en-US'
import cn from './zh-CN'

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const defaultLocale = localStorage.getItem( 'arco-locale') || 'zh-CN'

const i18n = createI18n({
  globalInjection: true, // 全局使用
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  allowComposition: true,
  silentTranslationWarn: true,
  messages: {
    'en-US': en,
    'zh-CN': cn,
  },
})

export default i18n
