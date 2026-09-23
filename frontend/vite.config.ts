import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig,loadEnv } from 'vite'
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../');
  return {
          server: {
            port:parseInt(env.VITE_CLIENT_PORT),
          },
          plugins: [
            react(),
            babel({ presets: [reactCompilerPreset()] })
          ],
          envDir: resolve(import.meta.dirname, '..')
        }
})
