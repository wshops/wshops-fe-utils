console.log('waiting to read data...')
setTimeout(function () {
  console.log('data: ' + window.$wshop.dsync().get('anxuanzi')['name'])
}, 5000)