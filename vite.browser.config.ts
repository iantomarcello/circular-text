import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/circular-text.ts',
      formats: ['iife'],
      name: "CircularText",
    },
    outDir: 'dist/browser',
  }
})
