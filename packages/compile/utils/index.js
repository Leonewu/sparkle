const { isExist } = require('./cache')
const { STYLE_EXT, COMPONENTS, OUTPUT_DIR, SCRIPT_EXT } = require('../config')
function isTestPath(filePath) {
  return /__test__/.test(filePath)
}

function isDemoPath(filePath) {
  return /demo/.test(filePath)
}

function isDocPath(filePath) {
  return /README\.md/.test(filePath)
}

function isIgnorePath(filePath) {
  return isTestPath(filePath) || isDemoPath(filePath) || isDocPath(filePath)
}

function getPreStyle(filePath) {
  // 根据 filePath 检查是否存在预处理样式文件
  // 返回的 ext 是 filePath 的基础上补全的后缀
  // 如 filePath 为 /home/button/, 全路径为 /home/button/index.css, 后缀就为 index.css
  // 如 filePath 为 /home/button, 全路径为 /home/button.css, 后缀就为 .css

  const file = {}
  if (filePath.substr(-1) === '/') {
    // 目录
    if (isExist(`${filePath}index${STYLE_EXT}`)) {
      file.path = `${filePath}index${STYLE_EXT}`
      file.ext = `index${STYLE_EXT}`
    } else if (isExist(`${filePath}index.css`)) {
      file.path = `${filePath}index.css`
      file.ext = 'index.css'
    }
  } else {
    // 文件
    if (isExist(`${filePath}${STYLE_EXT}`)) {
      file.path = `${filePath}${STYLE_EXT}`
      file.ext = STYLE_EXT
    } else if (isExist(`${filePath}.css`)) {
      file.path = `${filePath}.css`
      file.ext = '.css'
    }
  }
  return file
}

function isComponent(filePath) {
  const paths = COMPONENTS.map(com => new RegExp(`${OUTPUT_DIR}/${com}/index\.(${SCRIPT_EXT.join('|')})`))
  let flag = false
  for (reg of paths) {
    if (reg.test(filePath)) {
      flag = true
      break
    }
  }
  return flag
}

function injectInstall(filePath, content) {
  if (isComponent(filePath)) {
    const install = 'function install(Vue) {\n Vue.component(_default.name, _default)\n}'
    content = content.replace('export default', 'var _default = ')
    content += `${install}\nexport default {\n_default,\ninstall\n}`
  }
  return content
}
module.exports = {
  isTestPath,
  isDemoPath,
  isDocPath,
  isIgnorePath,
  getPreStyle,
  injectInstall
}