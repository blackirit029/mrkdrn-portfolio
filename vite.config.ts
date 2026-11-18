import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site from /<repo>/; dev keeps the root
  base: command === 'build' ? '/mrkdrn-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Multi-page build: the portfolio plus each mini project app
      input: {
        main: page('./index.html'),
        journalhere: page('./journalhere/index.html'),
        shophere: page('./shophere/index.html'),
        spendhere: page('./spendhere/index.html'),
      },
    },
  },
}))
