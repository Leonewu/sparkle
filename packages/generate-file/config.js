
const path = require('path')

const components = require('../../components.config.js')
const root = path.resolve(__dirname, '../../')
const entries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    return `${root}/src/${component.path}/index.{js,vue,jsx,tsx}`
  }))
}, [])
const styleEntries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    return `${root}/src/${component.path}/index.{scss,less,styl,css}`
  }))
}, [])
// const entry = `${root}/src/components/*/index.{js,vue,jsx,tsx}`
const outputDir = `${root}/fs-lib`
const srcDir = `${root}/src`
const utils = `${root}/src/utils/**/*.{js,ts}`
const baseStyle = `${root}/src/common/base.scss`

// 公共css的文件夹
const baseStyleDir = path.dirname(baseStyle)

module.exports = {
  entries,
  styleEntries,
  outputDir,
  srcDir,
  utils,
  baseStyle,
  baseStyleDir
}
