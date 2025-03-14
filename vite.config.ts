import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/post': {
        target: 'http://localhost:5173',
        rewrite: () => "/"
      },
    },
  },
})
