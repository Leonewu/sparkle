const fs = require('fs-extra')


// 大量使用 fs.existSync
// 所以将结果缓存起来
// 要注意创建文件的时候需要刷新缓存


const cache = {}

function isExist(filePath) {
  if (cache[filePath]) {
    return cache[filePath].exist
  } else {
    if (fs.existsSync(filePath)) {
      cache[filePath] = {
        filePath,
        exist: true
      }
      return true
    } else {
      cache[filePath] = {
        filePath,
        exist: false
      }
      return false
    }
  }
}
function updateCache(filePath, opts) {
  delete cache[filePath]
  cache[filePath] = { filePath, ...opts }
}

module.exports = {
  isExist,
  updateCache
}

