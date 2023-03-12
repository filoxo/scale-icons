import { defineConfig } from 'vite'
// import svgSprites from 'rollup-plugin-svg-sprites'
import { resolve } from 'path'

// // https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/
// const kebabCase = (str) =>
//   str
//     .replace(/([a-z])([A-Z])/g, '$1-$2') // replace "camelCase" to "camel-case"
//     .replace(/[\s_\/]+/g, '-') // Replace spaces, underscore, and slash with - (dash)
//     .toLowerCase()
  
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/Icon.tsx'),
      name: 'Icons',

    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
    },
  }
})