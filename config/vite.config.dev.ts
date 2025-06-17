import { mergeConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      port: 3361,
      host: '0.0.0.0',
      hmr: true, // 开启热模块替换
      open: true,
      fs: {
        strict: true,
      },
      https: false,
      watch: {
        usePolling: true, // 使用轮询检测文件变更
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
)
