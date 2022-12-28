import path from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import banner from 'vite-plugin-banner'

const fileName = {
  es: `wshop.mjs`,
  cjs: `wshop.cjs`,
  iife: `wshop.iife.js`,
  umd: `wshop.umd.js`
}

module.exports = defineConfig({
  base: './',
  plugins: [
    banner(`/**\n * name: wshops-fe-utils\n * version: v${packageJson.version}\n * description: ${packageJson.description}\n * author: ${packageJson.author}\n * homepage: ${packageJson.homepage}\n */`)
  ],
  build: {
    minify: true,
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
