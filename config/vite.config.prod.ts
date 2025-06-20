import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import configCompressPlugin from './plugin/compress'
import configVisualizerPlugin from './plugin/visualizer'
import configArcoResolverPlugin from './plugin/arcoResolver'
import configStyleImportPlugin from './plugin/styleImport'
import configImageminPlugin from './plugin/imagemin'
import removeConsole from 'vite-plugin-remove-console'
import externalGlobal from 'rollup-plugin-external-globals'
import { viteMockServe } from 'vite-plugin-mock'

export default mergeConfig(
  {
    mode: 'production',
    base: './',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin(),
      configImageminPlugin(),
      // removeConsole(),
      viteMockServe({
        mockPath: '../mock', // Mock 文件存放目录
        logger: true, //  是否在控制台显示请求日志
        supportTs: true, // 是否读取ts文件模块
        localEnabled: true, // 开发环境启用
        prodEnabled: true, // 生产环境禁用（除非你需要测试构建后的 Mock）
        injectCode: `
        import { setupProdMockServer } from '../src/mockProd';
        setupProdMockServer();
      `, // 可选：生产环境注入代码（需额外配置）
      }),
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
