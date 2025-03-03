import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  test: {
    globals: true, // Enables `describe`, `test`, and `expect` globally
    environment: "jsdom", // Ensures JSDOM is used
    setupFiles: "./src/setupTests.js", // Runs before tests
  },
})
