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
// 低配版 glob
// home/src/**/*.{scss,less,styl,css}
// 只支持 ** 和 * 的语法，如上
// 思路：
// 1. 确定入口 entry，即 * 之前的路径
// 2. 将除入口之外，剩余的路径按照 / 分割
// 3. 分割出来的数组 routes，假设 routes 有两层，就生成一个相同长度的数组 results
// 4. 遍历 routes，从入口 entry 开始，将每一层的结果塞进 results 相同层的数组中
// 5. 遍历过程中，从第二层开始的父路径，都从 results 拿
// 6. 遍历结束，从结果 results 中拿出最后一层的结果，再根据 .{vue} 之类的条件过滤
function glob(str) {
  let files = []
  // 最后的结果是否为目录
  const isDir = str.substr(-1) === '/'
  const entry = str.match(/([^*]+)\//)[1]
  let filename = ''
  const routes = str.replace(entry, '').split('/')
  if (routes[routes.length - 1] && routes[routes.length - 1].includes('.')) {
    // 有后缀
    fileName = routes.pop()
  }
  routes[0] === '' && routes.shift()
  routes[routes.length - 1] === '' && routes.pop()
  const results = routes.map(() => [])
  routes.forEach((route, index) => {
    let res = []
    if (route === '*') {
      if (index === 0) {
        if (index === routes.length - 1 && !isDir) {
          // 刚好第一层就是最后一层，并且不用筛出目录
          res = fs.readdirSync(entry).map(s => `${entry}/${s}`)
        } else {
          res = fs.readdirSync(entry).map(s => `${entry}/${s}`)
          res = res.filter(p => fs.lstatSync(p).isDirectory())
        }
      } else {
        // 不是第一个 *
        results[index - 1].forEach(parent => {
          const sub = fs.readdirSync(parent).map(s => `${parent}/${s}`)
          if (index < routes.length - 1 || isDir) {
            // 过滤出文件夹
            res = res.concat(sub.filter(p => fs.lstatSync(p).isDirectory()))
          } else {
            res = res.concat(...sub)
          }
        })
      }
      results[index].push(...res)
    } else if (route === '**') {

    }
  })
  files = results[results.length - 1]
  return files
}
// console.log(glob('/home/leone/lib/*/'))
// console.log(glob('/home/leone/lib/*'))
console.log(glob('/Users/leone/leone/test/src/select/*/index.{vue,jsx,tsx}'))
module.exports = {
  isExist
}

