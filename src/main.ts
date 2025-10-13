import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import globalComponents from '@/components/index'
import Particles from 'particles.vue3'
import vueDompurifyHTMLPlugin from 'vue-dompurify-html'
import router from './router'
import store from './store'
import directive from './directive'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/style/global.less'
import '@/assets/style/varibles.less'

const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(router)
app.use(store)
app.use(globalComponents)
app.use(directive)
app.use(vueDompurifyHTMLPlugin)
app.use(Particles)

app.mount('#app')
