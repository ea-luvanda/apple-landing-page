import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/apple-landing-page/' : '/',
  plugins: [react(), tailwindcss()],
})
