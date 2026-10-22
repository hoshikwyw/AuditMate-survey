import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // `npm run dev:api` runs the Cloudflare Function locally on 8788; forward /api to it.
    proxy: { '/api': 'http://localhost:8788' },
  },
})
