import { DirectiveBinding } from 'vue'
import { useUserStore } from '@/store'
import settings from '@/config/settings.json'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()
  const { roles } = userStore
  if (typeof value === 'string' || typeof value === 'number') {
    // const hasPermission = userStore.operations.includes(value)
    const hasPermission = settings.menuFromServer ? roles[0].operationIds.includes(value) : true
    // (roles && roles[0].operationIds.includes(value)) ||
    // (roles[0].operationIds && roles[0].operationIds.length === 1 && roles[0].operationIds[0] === '0')
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need roles! Like v-permission="['10000','10001']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
