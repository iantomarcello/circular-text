import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/circular-text.ts',
      formats: ['es', 'umd'],
      name: "CircularText",
      fileName: (format) => `circular-text.${format}.js`
    },
    rollupOptions: {
      external: /^lit/,
    }
  }
})
