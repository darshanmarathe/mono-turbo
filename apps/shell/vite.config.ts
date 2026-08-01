import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        appAdmin: {
          type: 'module',
          name: 'appAdmin',
          entry: 'http://localhost:5174/remoteEntry.js',
        },
        appAdminB: {
          type: 'module',
          name: 'appAdminB',
          entry: 'http://localhost:5175/remoteEntry.js',
        },
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
    port: 5176,
    cors: true,
  },
  build: {
    assetsDir: '',
  },
});
