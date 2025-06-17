import { defineStore } from 'pinia'
import { Notification } from '@arco-design/web-vue'
import type { RouteRecordNormalized } from 'vue-router'
import defaultSettings from '@/config/settings.json'
import { AppState } from './types'
import { appRoutes, appExternalRoutes } from '@/router/routes/index'
import { useUserStore } from '@/store'
import { getRoutes } from '@/utils/tree'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      const userStore = useUserStore()
      try {
        this.serverMenu = getRoutes(
          [...appRoutes, ...appExternalRoutes],
          (userStore.roles && userStore.roles[0].menuIds) || ['0']
        )
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        })
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    },
  },
})

export default useAppStore
