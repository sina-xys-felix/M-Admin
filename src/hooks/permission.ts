import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store'
import settings from '@/config/settings.json'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore?.role)
      )
    },
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        )
          return { name: firstElement.name }
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return _routers
    },
    // You can add any rules you want
  }
}

// 表格列权限控制
export function checkColumnsPermission(value: string | number): boolean {
  if (!settings.menuFromServer) return true
  const userStore = useUserStore()
  const { roles } = userStore
  if (value) {
    return (
      (roles && roles[0].operationIds.includes(value)) ||
      (roles[0].operationIds && roles[0].operationIds.length === 1 && roles[0].operationIds[0] === '0')
    )
  } else {
    return true
  }
}
