import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Resolves @/foo → src/foo  (works in all Node/Vite versions)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
