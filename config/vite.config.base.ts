import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import configArcoStyleImportPlugin from './plugin/arcoStyleImport'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/], // 允许解析 .md 文件
    }),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router'],
       // arco组件的按需加载
      resolvers: [ArcoResolver()],
        // 配置文件生成位置
      dts: './auto-imports.d.ts',
    }),
    viteMockServe({
      mockPath: 'mock', // 目录位置
      logger: true, //  是否在控制台显示请求日志
      supportTs: true, // 是否读取ts文件模块
      localEnabled: true, // 设置是否启用本地mock文件
      prodEnabled: true, // 设置打包是否启用mock功能
      // 这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
          import { setupProdMockServer } from '../mock/index';
          setupProdMockServer();
        `,
    }),
    configArcoStyleImportPlugin()
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
