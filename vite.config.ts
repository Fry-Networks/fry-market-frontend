import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // allow external access
    allowedHosts: ['0.0.0.0', 'localhost', 'www.fry.market', 'fry.market'],
  },
})