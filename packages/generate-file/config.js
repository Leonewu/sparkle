
const path = require('path')

const root = path.resolve(__dirname, '../../')
const entry = `${root}/src/components/*/index.{js,vue,jsx,tsx}`
const outputDir = `${root}/fs-lib`
const componentDir = `${root}/src/components`
const styleEntry = `${root}/src/components/*/index.scss`
const utils = `${root}/src/utils/**/*.{js,ts}`
const baseStyle = `${root}/src/common/base.scss`

// 公共css的文件夹
const baseStyleDir = path.dirname(baseStyle)

module.exports = {
  entry,
  outputDir,
  componentDir,
  styleEntry,
  utils,
  baseStyle,
  baseStyleDir
}
