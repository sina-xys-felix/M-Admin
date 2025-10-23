<template>
  <a-config-provider>
    <template #loading>
      <icon-loading />
    </template>
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useTableStore } from '@/store'
  import GlobalSetting from '@/components/global-setting/index.vue'
  import { useScreenInfo } from '@/hooks/use-screen-info'

  const tableStore = useTableStore()
  const { resolution } = storeToRefs(tableStore)

  const { resolutionLevel } = useScreenInfo()

  resolution.value = resolutionLevel.value
</script>
