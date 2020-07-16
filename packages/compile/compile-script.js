const fs = require('fs-extra')
const babel = require('@babel/core')
const { injectInstall, removeComment } = require('./utils/')
const { updateImport } = require('./deps')



function compileJs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const outputFile = filePath.replace(/\.(jsx|tsx|ts)/, '.js')
  // if (/(j|t)sx/.test(filePath)) {
  content = removeComment(content)
  content = updateImport(filePath, content)
  content = injectInstall(filePath, content)
  // }
  const result = babel.transformSync(content, { filename: filePath }).code
  fs.remove(filePath)
  fs.outputFileSync(outputFile, result)
}

module.exports = compileJs