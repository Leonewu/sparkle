
const path = require('path')
const { sync: glob } = require('glob')
const components = require('../../components.config')

const JS_EXT = ['js', 'ts', 'vue', 'jsx', 'tsx']
const CSS_EXT = ['scss', 'less', 'styl']

const ROOT = path.resolve(__dirname, '../../')
// component entries
const entries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    return `${ROOT}/src/${component.path}/index.{${JS_EXT.join(',')}}`
  }))
}, []).map(entry => glob(entry)[0]).filter(entry => entry)

// component style entries
const styleEntries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    return `${ROOT}/src/${component.path}/index.{${CSS_EXT.join(',')},css}`
  }))
}, []).map(entry => glob(entry)[0]).filter(entry => entry)
// const entry = `${ROOT}/src/components/*/index.{js,vue,jsx,tsx}`
const outputDir = `${ROOT}/fs-lib`
const srcDir = `${ROOT}/src`
const utils = `${ROOT}/src/utils/**/*.{js,ts}`
const baseStyleFile = `${ROOT}/src/common/base.scss`

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
  getOutputStyleDir,
  JS_EXT,
  CSS_EXT
}
