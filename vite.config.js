import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pan-dorado-frontend/', // <-- usa TU nombre de repo aquí
})
