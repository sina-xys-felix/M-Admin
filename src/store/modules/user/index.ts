import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout } from '@/api/login/index'
import { setToken, clearToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import { UserState } from './types'
import useAppStore from '../app'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    tenantId: undefined,
    type: undefined,
    userId: undefined,
    name: undefined,
    userName: undefined,
    mobile: undefined,
    email: undefined,
    avatar: undefined,
    xppSource: undefined,
    accountSource: undefined,
    start: undefined,
    end: undefined,
    joinTime: undefined,
    joinIp: undefined,
    lastIp: undefined,
    isOfficial: undefined,
    status: undefined,
    tenant: undefined,
    roles: undefined,
    organs: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      this.setInfo()
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.token)
        return res.token
      } catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
      localStorage.removeItem('userInfo')
    },
    // Logout
    async logout() {
      try {
        await userLogout()
      } finally {
        this.logoutCallBack()
      }
    },
  },
})

export default useUserStore
