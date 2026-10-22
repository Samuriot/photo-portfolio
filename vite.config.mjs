import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [react()],
    server: {
      // Dev only: /bucket/* is forwarded to rustfs, so the browser avoids CORS
      proxy: {
        '/bucket': {
          target: env.RUSTFS_URL || 'http://127.0.0.1:9002',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bucket/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  }
})
