const fs = require('fs-extra')
const { injectInstall, removeComment } = require('./utils/')
const { updateImport } = require('./deps')
const babelTransform = require('./babel-compiler')


function compileJs(filePath) {
  return new Promise((resolve, reject) => {
    let content = fs.readFileSync(filePath, 'utf8')
    const outputFile = filePath.replace(/\.(jsx|tsx|ts)/, '.js')
    content = removeComment(content)
    content = updateImport(filePath, content)
    content = injectInstall(filePath, content)
    const result = babelTransform(filePath, content)
    fs.removeSync(filePath)
    fs.outputFileSync(outputFile, result)
    resolve()
  })
}

module.exports = compileJs