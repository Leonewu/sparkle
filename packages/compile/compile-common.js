const fs = require('fs-extra')
const path = require('path')
const { outputDir, baseStyleDir } = require('./config')

function compileCommon() {
  // 复制 utils
  copyCommonStyle()
  // generateStyleEntry()
}

function copyCommonStyle() {
  // 复制公共样式文件夹
  const baseStyleDirName = path.basename(baseStyleDir)
  fs.copySync(baseStyleDir, `${outputDir}/${baseStyleDirName}`)
}

function compileCommonjs() {

}



function compileCommonStyle() {

}

module.exports = compileCommon
