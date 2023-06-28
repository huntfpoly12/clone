/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output:{
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
        }
      },
      treeshake:  false,
      plugins: [
        {
          name: 'no-treeshake',
          transform(_, id) {
            if (id.includes('integration/jquery')) {
              return { moduleSideEffects: 'no-treeshake' }
            }
            if (id.includes('devextreme-vue/data-grid')) {
              return { moduleSideEffects: 'no-treeshake' }
            }
          }
        }
      ]
    },
    chunkSizeWarningLimit:6000
  }
})
