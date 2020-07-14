
const path = require('path')
const componentsJson = require('../../components.config')

// 脚本文件后缀
const SCRIPT_EXTS = ['js', 'ts', 'vue', 'jsx', 'tsx']
// css 预处理后缀
const STYLE_EXT = '.scss'

const ROOT = path.resolve(__dirname, '../../')

// component.config.js 配置的组件
const COMPONENTS = componentsJson.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => component.path))
}, [])



const OUTPUT_DIR = `${ROOT}/fs-lib-2`
const SRC_DIR = `${ROOT}/src`
// 公共的样式文件
const BASE_STYLE_FILE = `common/base.scss`

// dev 下的输出目录
const DEV_OUTPUT_DIR = path.join(__dirname, '.dev')

// 组件名前缀
const COMPONENT_PREFIX = 'xiao'

module.exports = {
  DEV_OUTPUT_DIR,
  OUTPUT_DIR,
  SRC_DIR,
  BASE_STYLE_FILE,
  SCRIPT_EXTS,
  STYLE_EXT,
  COMPONENTS,
  COMPONENT_PREFIX
}
