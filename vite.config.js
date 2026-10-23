import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Sur GitHub Pages le site est servi sous /g25/ (défini par le workflow)
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
