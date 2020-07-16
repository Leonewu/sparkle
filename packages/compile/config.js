
const path = require('path')
const componentsJson = require('../../components.config')
// 脚本文件后缀
const SCRIPT_EXTS = ['.js', '.ts', '.vue', '.jsx', '.tsx']
// css 预处理后缀
const STYLE_EXT = '.scss'
// 根目录
const ROOT = path.resolve(__dirname, '../../')
// 打包输出 commonjs 目录
const LIB_DIR = `${ROOT}/lib`
// 打包输出 esModule 目录
const ES_DIR = `${ROOT}/es`
// 源目录
const SRC_DIR = `${ROOT}/src`
// 公共的样式文件
const BASE_STYLE_FILE = `common/base.scss`
// development 下的输出目录
const DEV_DIR = path.join(__dirname, '.dev')
// 组件名前缀
const COMPONENT_PREFIX = 'xiao'

// 组件数组，将 json 文件拍平
const COMPONENTS = componentsJson.reduce((sum, cur) => {
  return sum.concat(cur.components.map(component => component.path))
}, [])

// const COMPONENTS = fs.readdirSync(SRC_DIR).reduce((sum, cur) => {
//   // 判断是否为组件的条件
//   // 1. 目录必须位于 src 下的第一层目录
//   // 2. 存在 src/*/index.{vue,jsx,tsx}
//   // 3. 存在 src/*/index.{js,ts}  src/*/index.{css,less,scss,styl}
//   const scriptFiles = glob(`${SRC_DIR}/${cur}/index.{${SCRIPT_EXTS.map(s => s.substr(1)).join(',')}}`)
//   if (scriptFiles[0]) {
//     if(['.vue', 'jsx', 'tsx'].includes(path.extname(scriptFiles[0]))) {
//       sum.push(cur)
//     } else {
//       const styleFiles = glob(`${SRC_DIR}/${cur}/index.{${STYLE_EXT.substr(1)},css}`)
//       if (styleFiles[0]) {
//         sum.push(cur)
//       }
//     }
//   }
//   return sum
// }, [])


module.exports = {
  DEV_DIR,
  LIB_DIR,
  ES_DIR,
  SRC_DIR,
  BASE_STYLE_FILE,
  SCRIPT_EXTS,
  STYLE_EXT,
  COMPONENTS,
  COMPONENT_PREFIX
}
