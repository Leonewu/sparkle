const fs = require('fs-extra')
const path = require('path')
const { JS_EXT } = require('./config') 
const { sync: glob } = require('glob')

const depsMap = {}

function updateImport(filePath, source) {
  // 更新 import 语句，并且生成依赖地图
  // https://regexr.com/47jlq
  depsMap[filePath] = []
  const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
  if (!source) {
    source = fs.readFileSync(filePath)
  }
  const imports = source.match(IMPORT_REG)
  imports.forEach(code => {
    const absolutePath = getImportPath(filePath, code)
    if (absolutePath) {
      depsMap[filePath].push(absolutePath)
    }
    // 将引入的 vue 文件后缀改成 js
    if (code.includes('.vue')) {
      source = source.replace(code, code.replace('.vue', '.js'))
    }
  })
  return source
}

function getImportPath(filePath, importCode) {
  // 获取内部依赖的绝对路径
  // TODO 要不要支持别名
  const quote = importCode.includes('"') ? '"' : "'"
  const relativePath = importCode.split(quote)[1]
  if (!relativePath.includes('.')) {
    return ''
  }
  const absolutePath = path.resolve(filePath, '../', relativePath)
  const fileName = path.basename(relativePath)
  let globStr = ''
  if (fileName.includes) {
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
  return depsMap[filePath]
}

module.exports = {
  updateImport,
  getDeps
}