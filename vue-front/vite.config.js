import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 使用根路径
  server: {
    proxy: {
      // 配置代理
      '/api': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 如果后端接口没有 /api 前缀，可以启用这行
      }
    }
  }
})
