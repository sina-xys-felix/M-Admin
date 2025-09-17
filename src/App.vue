<template>
  <a-config-provider :locale="locale">
    <template #loading>
      <icon-loading />
    </template>
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTableStore } from '@/store'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import GlobalSetting from '@/components/global-setting/index.vue'
import useLocale from '@/hooks/locale'
import { useScreenInfo } from '@/hooks/use-screen-info'

const { currentLocale } = useLocale()
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      return zhCN
    case 'en-US':
      return enUS
    default:
      return enUS
  }
})


const tableStore = useTableStore()
const { resolution } = storeToRefs(tableStore)

const { resolutionLevel } = useScreenInfo()

resolution.value = resolutionLevel.value

// disableRefresh()

function disableRefresh() {
  // 禁用 F5 / Ctrl+R / Cmd+R
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F5' || e.keyCode === 116 || ((e.ctrlKey || e.metaKey) && e.key === 'r')) {
      e.preventDefault()
      // alert('页面刷新已被禁止')
    }
  })

  // 禁用右键菜单（防止右键刷新）
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    // alert('右键菜单已被禁用')
  })
}
</script>
