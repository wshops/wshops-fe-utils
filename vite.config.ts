import path from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import banner from 'vite-plugin-banner'

const fileName = {
  es: `index.mjs.js`,
  cjs: `index.cjs.js`,
  iife: `index.iife.js`,
  umd: `index.umd.js`
}

module.exports = defineConfig({
  base: './',
  plugins: [
    banner(`/**\n * name: wshops-fe-utils\n * version: v${packageJson.version}\n * description: ${packageJson.description}\n * author: ${packageJson.author}\n * homepage: ${packageJson.homepage}\n */`)
  ],
  build: {
    minify: 'esbuild',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'WshopsFrontendUtils',
      formats: ['es', 'cjs', 'iife', 'umd'],
      fileName: (format) => {
        // @ts-ignore
        return fileName[format]
      }
    }
  }
})
