const fs = require('fs-extra')
const path = require('path')
const { JS_EXT } = require('./config') 
const { sync: glob } = require('glob')

const depsMap = {}
// 数据结构
// { '/src/button/index.js': {
//       deps: ['./utils/index.js', './select/index.js'],
//       hasStyle: true
//    } 
// }

function updateImport(filePath, source) {
  // 更新 import 语句，将 vue|jsx|tsx|ts 的引入改成 js
  // 并且生成依赖 map
  const SCRIPT_REG = /\.(vue|jsx|tsx|ts)/g
  const outputPath = filePath.replace(SCRIPT_REG, '.js')
  depsMap[outputPath] = []
  // https://regexr.com/47jlq
  const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
  source = source || fs.readFileSync(filePath, 'utf8')
  const imports = source.match(IMPORT_REG)
  imports && imports.forEach(code => {
    const absolutePath = getImportPath(filePath, code)
    if (absolutePath) {
      depsMap[outputPath].push(code.replace(SCRIPT_REG, '.js'))
    }
    // 将引入文件后缀改成 js
    if (SCRIPT_REG.test(code)) {
      source = source.replace(code, code.replace(SCRIPT_REG, '.js'))
    }
  })
  return source
}

function getImportPath(filePath, importCode) {
  // 获取依赖的绝对路径
  // 不支持别名
  const quote = importCode.includes('"') ? '"' : "'"
  const relativePath = importCode.split(quote)[1]
  if (!relativePath.includes('.')) {
    return ''
  }
  const absolutePath = path.resolve(filePath, '../', relativePath)
  const fileName = path.basename(relativePath)
  let globStr = ''
  if (fileName.includes('.')) {
    // 引入的是文件
    const ext = path.extname(fileName)
    globStr = absolutePath.replace(ext, `.{${JS_EXT.join(',')}}`)
  } else {
    // 引入目录，自动找目录下的 index
    globStr = `${absolutePath}/index.{${JS_EXT.join(',')}}`
  }
  return glob(globStr)[0] || ''
}


function getDeps(filePath) {
  return filePath ? depsMap[filePath] : depsMap
}

module.exports = {
  updateImport,
  getDeps
}