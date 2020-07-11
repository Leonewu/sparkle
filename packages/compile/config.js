
const path = require('path')
const componentsJson = require('../../components.config')

// 脚本文件后缀
const SCRIPT_EXT = ['js', 'ts', 'vue', 'jsx', 'tsx']
// css 预处理后缀
const STYLE_EXT = '.scss'

const ROOT = path.resolve(__dirname, '../../')

// 根据配置项配置的
const COMPONENTS = componentsJson.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => component.path))
}, [])



const OUTPUT_DIR = `${ROOT}/fs-lib-2`
const SRC_DIR = `${ROOT}/src`
// 公共的样式文件
const BASE_STYLE_FILE = `common/base.scss`




module.exports = {
  OUTPUT_DIR,
  SRC_DIR,
  BASE_STYLE_FILE,
  SCRIPT_EXT,
  STYLE_EXT,
  COMPONENTS
}
