<template>
  <div class="block">
    <a-divider orientation="center">{{ title }}</a-divider>
    <a-row justify="center">
      <a-space fill size="large">
        <LayoutItem
          v-for="item in options"
          :key="item.key"
          :mode="item.key"
          :name="item.name"
          @click="handleChange(item)"
        ></LayoutItem>
      </a-space>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import { useAppStore } from '@/store'
  import LayoutItem from './components/layout-item.vue'

  type LayoutProps = 'menu' | 'topMenu' | 'mix'

  interface OptionsProps {
    name: string
    key: LayoutProps
    type?: string
    defaultVal: boolean | string | number
  }

  defineProps({
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<OptionsProps[]>,
      default() {
        return []
      },
    },
  })

  const appStore = useAppStore()
  const handleChange = async ({ key, defaultVal }: { key: string; defaultVal: boolean | string | number }) => {
    appStore.updateSettings({
      menuCollapse: key === 'topMenu',
      topMenu: key === 'topMenu',
      menu: key === 'menu',
    })
  }
</script>

<style scoped lang="less">
  .block {
    margin-bottom: 24px;
  }

  .title {
    margin: 10px 0;
    padding: 0;
    font-size: 14px;
  }

  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
  }
</style>
