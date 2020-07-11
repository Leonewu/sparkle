const fs = require('fs-extra')
const path = require('path')
// 大量使用 fs.existSync
// 所以将结果缓存起来
// 要注意创建文件的时候需要刷新缓存

class File {
  constructor(opt) {
    this.filePath = opt.filePath
    this.exist = opt.exist
    this.content = opt.content
  }
}

const cache = {}

function isExist(filePath) {
  if (cache[filePath]) {
    return cache[filePath].exist
  } else {
    if (fs.existsSync(filePath)) {
      cache[filePath] = new File({
        filePath,
        exist: true
      })
      return true
    } else {
      cache[filePath] = new File({
        filePath,
        exist: false
      })
      return false
    }
  }
}
function updateCache(filePath) {
  delete cache[filePath]
  isExist(filePath)
}

module.exports = {
  isExist
}

