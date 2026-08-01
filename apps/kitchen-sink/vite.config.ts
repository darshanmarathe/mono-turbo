import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'kitchenSink',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/widgets/GalleryWidget.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.2.8' },
        'react-dom': { singleton: true, requiredVersion: '^19.2.8' },
      },
    }),
  ],
  server: {
    port: 5173,
    cors: true,
  },
  build: {
    assetsDir: '',
  },
});
