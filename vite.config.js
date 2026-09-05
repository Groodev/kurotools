import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/api/fastsaver': {
          target: 'https://api.fastsaver.io/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/fastsaver/, ''),
          headers: {
            'Origin': 'https://api.fastsaver.io'
          },
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = process.env.FASTSAVER_API_KEY || process.env.VITE_FASTSAVER_API_KEY;
              if (key) {
                proxyReq.setHeader('Authorization', `Bearer ${key}`);
                proxyReq.setHeader('x-api-key', key);
              }
            });
          }
        },
        '/api/shortio': {
          target: 'https://api.short.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/shortio/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = process.env.SHORTIO_API_KEY || process.env.VITE_SHORTIO_API_KEY;
              if (key) {
                proxyReq.setHeader('authorization', key);
              }
            });
          }
        }
      }
    }
  };
});
