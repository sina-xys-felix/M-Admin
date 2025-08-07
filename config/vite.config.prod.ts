import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import configCompressPlugin from './plugin/compress'
import configVisualizerPlugin from './plugin/visualizer'
import configArcoResolverPlugin from './plugin/arcoResolver'
import configImageminPlugin from './plugin/imagemin'
import removeConsole from 'vite-plugin-remove-console'
import externalGlobal from 'rollup-plugin-external-globals'

export default mergeConfig(
  {
    mode: 'production',
    base: './',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configImageminPlugin(),
      removeConsole(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
        plugins: [externalGlobal],
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
)
