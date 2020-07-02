const fs = require('fs-extra')
const path = require('path')
const { srcDir, outputDir, baseStyleDir, baseStyleFile } = require('./config')
const compileSass = require('./sass-compiler')
const compileStyle = require('./compile-style')


function compileCommon() {
  // 复制 utils
  copyCommonStyle()
  compileCommonStyle()
}

function copyCommonStyle() {
  // 复制公共样式文件夹
  const baseStyleDirName = path.basename(baseStyleDir)
  fs.copySync(baseStyleDir, `${outputDir}/${baseStyleDirName}`)
}

function compileCommonjs() {

}



function compileCommonStyle() {
  const baseStyle = baseStyleFile.replace(srcDir, outputDir)
  const lang = path.extname(baseStyle).substr(1)
  if (lang === 'scss') {
    compileSass(baseStyle).then(res => {
      fs.outputFileSync(baseStyle.replace(lang, 'css'), res)
    })
  }
}

module.exports = compileCommon
