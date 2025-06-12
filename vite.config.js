import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['main.js']
        }
      }
    }
  }
});
