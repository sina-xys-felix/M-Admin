import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 允许解析 .md 文件
    }),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './auto-imports.d.ts',
    }),
    viteMockServe({
      mockPath: '../mock', // Mock 文件存放目录
      logger: true, //  是否在控制台显示请求日志
      supportTs: true, // 是否读取ts文件模块
      localEnabled: true, // 开发环境启用
      prodEnabled: true, // 生产环境禁用（除非你需要测试构建后的 Mock）
      injectCode: `
        import { setupProdMockServer } from '../mock/index';
        setupProdMockServer();
      `, // 可选：生产环境注入代码（需额外配置）
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {
      REPORT: 'true',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/style/breakpoint.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
