import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add an alias for the 'faker' package
      'faker': 'faker', // This assumes 'faker' is in your 'node_modules' folder
    },
  },
})
