const fs = require('fs-extra')
const { injectInstall, removeComment } = require('./utils/')
const { addDepByImport } = require('./deps')
const babelTransform = require('./utils/babel-compiler')

/* 编译 js|ts|tsx|jsx 文件 */

function compileJs(filePath) {
  return new Promise((resolve, reject) => {
    try {
      let content = fs.readFileSync(filePath, 'utf8')
      const outputFile = filePath.replace(/\.(jsx|tsx|ts)/, '.js')
      content = removeComment(content)
      content = updateImport(filePath, content)
      content = injectInstall(filePath, content)
      const result = babelTransform(filePath, content)
      fs.removeSync(filePath)
      fs.outputFileSync(outputFile, result)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

function updateImport(filePath, source) {
  // 更新 import 语句，并将 vue|jsx|tsx|ts 的引入替换 js
  // 并且根据 import 语句拿到对应的依赖，更新到 deps
  const SCRIPT_REG = /\.(vue|jsx|tsx|ts)/g
  // https://regexr.com/47jlq
  const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
  source = source || fs.readFileSync(filePath, 'utf8')
  const imports = source.match(IMPORT_REG)
  imports && imports.forEach(importCode => {
    const quote = importCode.includes('"') ? '"' : "'"
    const importPath = importCode.split(quote)[1]
    addDepByImport(filePath, importPath)
    // 将引入文件后缀改成 js
    if (SCRIPT_REG.test(importCode)) {
      source = source.replace(importCode, importCode.replace(SCRIPT_REG, '.js'))
    }
  })
  return source
}

module.exports = {
  compileJs,
  updateImport
}