const fs = require('fs-extra')
const path = require('path')
// 经常会用到查看文件是否存在
// 缓存起来
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
// home/src/**/*.{scss,less,styl,css}
// 只支持 ** 和 * 的语法，如上
function glob(str) {
  let files = []
    // 目录
  const isDir = str.substr(-1) === '/'
  let prefix = [str.match(/([^*]+)/)[1]]
  let left = str.replace(prefix, '').split('/')
  console.log(left)
  while (prefix.length) {
    const curPrefix = prefix.shift()
    for (let i = 0; i < left.length; i++) {
      const curStr = left[i]
      if (curStr === '') {
        if (i === left.length - 1) {
          // 如果是最后一个并且为空，说明是目录
          const dirs = prefix.filter(d => fs.lstatSync(d).isDirectory())
          files.push(...dirs)
          prefix = []
        }
      } else if (curStr === '*') {
        const res = fs.readdirSync(curPrefix).map(s => `${curPrefix}${s}`)
        if (i !== left.length - 1) {
          // 不是最后一个，说明这个是目录
          const dirs = res.filter(d => fs.lstatSync(d).isDirectory())
          prefix.push(...dirs)
          left.shift()
        } else {
          files.push(...res)
        }
        break
      }
    }
  }

  return files
}
// console.log(glob('/home/leone/lib/*/'))
// console.log(glob('/home/leone/lib/*'))
console.log(glob('/home/leone/lib/xiao-ui/*'))
module.exports = {
  isExist
}

