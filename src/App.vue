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
</script>
