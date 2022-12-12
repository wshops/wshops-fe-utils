# wshops-fe-utils

Wshops Shopfront development toolkit. This library is written in TypeScript. It generates a hybrid package - both
support for CommonJS and ESM modules.

## Features

- md5 encryption
- base64 encode
- api request utils
- Hybrid support - CommonJS and ESM modules
- IIFE bundle for direct browser support without bundler
- Typings bundle

## DEV

The project contains the following scripts:

- `dev` - starts dev server
- `build` - generates the following bundles: CommonJS (`.cjs`) ESM (`.mjs`) and IIFE (`.iife.js`). The name of bundle is
  automatically taked from `package.json` name property

## USE

Import the bundled library in your page:

```html

<script src="https://cdn.jsdelivr.net/gh/wshops/wshops-fe-utils@1.0.0/dist/wshop.iife.min.js"></script>
```

Call Instance:

```js
window.$wshop
```

supported functions:

```js
window.$wshop.dsync()
window.$wshop.md5('hi')
window.$wshop.sha256('hello')
window.$wshop.base64Encode('nice')
window.$wshop.base64Decode('bm9pY2U=')
window.$wshop.vd(false) //more functions within this
window.$wshop.api() //more functions within this
window.$wshop.msg() //more functions within this
```
