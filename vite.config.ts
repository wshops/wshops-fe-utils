import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `wshop.mjs`,
  cjs: `wshop.cjs`,
  iife: `wshop.iife.js`,
};

module.exports = defineConfig({
  base: "./",
  plugins:[
    banner(`/**\n * name: ${packageJson.name}\n * version: v${packageJson.version}\n * description: ${packageJson.description}\n * author: ${packageJson.author}\n * homepage: ${packageJson.homepage}\n */`),
    dts()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats: ["es", "cjs", "iife"],
      fileName: (format) => fileName[format],
    },
  },
});
