
const path = require('path')
const components = require('../../components.config')

// 脚本文件后缀
const SCRIPT_EXT = ['js', 'ts', 'vue', 'jsx', 'tsx']
// css 预处理后缀
const STYLE_EXT = '.scss'

const ROOT = path.resolve(__dirname, '../../')

// 根据配置项配置的
const COMPONENTS = components.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => component.path))
}, [])



const outputDir = `${ROOT}/fs-lib-2`
const srcDir = `${ROOT}/src`
// 公共的样式文件
const baseStyleFile = `common/base.scss`




module.exports = {
  outputDir,
  srcDir,
  baseStyleFile,
  SCRIPT_EXT,
  STYLE_EXT,
  COMPONENTS
}
