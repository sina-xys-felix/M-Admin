import { Directive } from 'vue'

const Debounce: Directive = {
  mounted(el, binding) {
    // 判断是否是函数，防抖指令必须绑定函数
    if (typeof binding.value != 'function') {
      return console.warn('debounce must be bound to a function')
    }
    let timeout: any = null
    // 给el添加自定义事件-防抖函数
    el.__onClick__ = () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        // 由于绑定的是函数，这里直接调用绑定之即可(也就是调用绑定的函数)
        binding.value()
      }, 1000)
    }
    // 监听点击事件，点击后调用绑定的自定义事件
    el.addEventListener('click', el.__onClick__)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.__onClick__)
  },
}

export default Debounce
