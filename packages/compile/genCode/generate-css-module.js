const fs = require('fs-extra')
const { srcDir, getOutputStyleDir, baseStyleFile } = require('../config')
const path = require('path')


function generateCssModule() {
  // 生成 css 依赖文件，如
  // button/style/css.js
  // button/style/scss.js
  return new Promise((resolve, reject) => {
    const outputStyleDir = getOutputStyleDir()
    const relativeBaseFile = baseStyleFile.replace(srcDir, '')
    outputStyleDir.forEach(filePath => {
      const file = path.basename(filePath)
      const lang = path.extname(filePath).substr(1)
      const cssModuleDir = filePath.replace(file, 'style')
      const srcCode = `\nrequire("../..${relativeBaseFile}")\nrequire("../${file}")`
      const cssCode = srcCode.replace(/(\.scss|\.less|\.styl)/g, '.css')
      fs.outputFileSync(`${cssModuleDir}/css.js`, cssCode)
      fs.outputFileSync(`${cssModuleDir}/${lang}.js`, srcCode)
    })
    resolve()
  })
}

module.exports = {
  generateCssModule
}