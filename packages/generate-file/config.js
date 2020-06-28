
const path = require('path')

const components = require('../../components.config.js')
const root = path.resolve(__dirname, '../../')
const entries = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => {
    console.log(component)
    return `${root}/src/${component.path}/index.{js,vue,jsx,tsx}`
  }))
}, [])
// const entry = `${root}/src/components/*/index.{js,vue,jsx,tsx}`
const outputDir = `${root}/fs-lib`
const componentDir = `${root}/src/components`
const styleEntry = `${root}/src/components/*/index.scss`
const utils = `${root}/src/utils/**/*.{js,ts}`
const baseStyle = `${root}/src/common/base.scss`

// 公共css的文件夹
const baseStyleDir = path.dirname(baseStyle)

module.exports = {
  entries,
  outputDir,
  componentDir,
  styleEntry,
  utils,
  baseStyle,
  baseStyleDir
}
