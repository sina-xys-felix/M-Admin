import type { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    if (isLogin()) {
      if (userStore.role) {
        next()
      } else {
        try {
          next()
        } catch (error) {
          await userStore.logout()
          next({
            name: 'login',
          })
        }
      }
    } else {
      if (to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login',
      })
    }
  })
}
