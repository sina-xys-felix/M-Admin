import { DirectiveBinding } from 'vue'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const operationIds = localStorage.getItem('menu') || []
  if (typeof value === 'string' || typeof value === 'number') {
    const hasPermission = operationIds.includes(value)
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need ids! Like v-permission="'10001'"`)
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
