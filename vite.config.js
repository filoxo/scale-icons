import { defineConfig } from 'vite'
// import svgSprites from 'rollup-plugin-svg-sprites'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/Icon.ts'),
      name: 'Icons',

    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
    },
  }
})