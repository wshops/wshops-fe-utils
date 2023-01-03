// @ts-check

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
const config = {
  entries: [
    {
      filePath: './src/index.ts',
      outFile: `./dist/index.d.ts`,
      noCheck: false,
      libraries: {
        /**
         * Array of package names from node_modules to inline typings from.
         * Used types will be inlined into the output file.
         * Optional. Default value is `[]`.
         */
        inlinedLibraries: ['axios']
      }
    }
  ]
}

module.exports = config
