import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'appAdminB',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      remotes: {
        kitchenSink: {
          type: 'module',
          name: 'kitchenSink',
          entry: 'http://localhost:5173/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.2.8' },
        'react-dom': { singleton: true, requiredVersion: '^19.2.8' },
      },
    }),
  ],
  server: {
    port: 5175,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    assetsDir: '',
  },
});
