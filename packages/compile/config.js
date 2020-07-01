
const path = require('path')
const { sync: glob } = require('glob')
const components = require('../../components.config.js')

const root = path.resolve(__dirname, '../../')
// component entries
const entries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    return `${root}/src/${component.path}/index.{js,vue,jsx,tsx}`
  }))
}, []).map(entry => glob(entry)[0]).filter(entry => entry)

// component style entries
const styleEntries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    return `${root}/src/${component.path}/index.{scss,less,styl,css}`
  }))
}, []).map(entry => glob(entry)[0]).filter(entry => entry)
// const entry = `${root}/src/components/*/index.{js,vue,jsx,tsx}`
const outputDir = `${root}/fs-lib`
const srcDir = `${root}/src`
const utils = `${root}/src/utils/**/*.{js,ts}`
const baseStyleFile = `${root}/src/common/base.scss`

// 公共css的文件夹
const baseStyleDir = path.dirname(baseStyleFile)

function getOutputStyleDir() {
  // 获取输出目录下的样式源文件
  const stylePath = styleEntries.map(entry => entry.replace(srcDir, outputDir))
  return stylePath.map(entry => glob(entry)[0]).filter(entry => entry)
}

module.exports = {
  entries,
  styleEntries,
  outputDir,
  srcDir,
  utils,
  baseStyleFile,
  baseStyleDir,
  getOutputStyleDir
}
