import type { Router, RouteRecordNormalized } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import usePermission from '@/hooks/permission'
import { useUserStore, useAppStore } from '@/store'
import { WHITE_LIST, NOT_FOUND } from '../constants'
import { appRoutes } from '../routes'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const Permission = usePermission()
    const permissionsAllow = Permission.accessRouter(to)
    if (appStore.menuFromServer) {
      // 针对来自服务端的菜单配置进行处理
      if (!appStore.appAsyncMenus.length && !WHITE_LIST.find((el) => el.name === to.name)) {
        await appStore.fetchServerMenuConfig()
      }
      const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]

      if (permissionsAllow) {
        next()
      } else next(NOT_FOUND)
    } else {
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) next()
      else {
        const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || NOT_FOUND
        next(destination)
      }
    }
    NProgress.done()
  })
}
