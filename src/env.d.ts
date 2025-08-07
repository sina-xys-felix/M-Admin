/// <reference types="vite/client" />

import { JSX as JSXInternal } from 'vue/jsx-runtime'

declare global {
  namespace JSX {
    interface IntrinsicElements extends JSXInternal.IntrinsicElements {}
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

declare module 'vue-img-cutter'
declare module 'qrcode'