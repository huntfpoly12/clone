import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
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
    }
  }
})
