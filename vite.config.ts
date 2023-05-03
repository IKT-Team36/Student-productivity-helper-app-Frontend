import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const projectRootDir = path.resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-ignore
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@src', replacement: path.resolve(projectRootDir, './src') }],
  },
})
