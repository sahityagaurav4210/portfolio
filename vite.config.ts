import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
  },
  build: {
    sourcemap: false,
  },
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
});
