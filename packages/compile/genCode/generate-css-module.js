const fs = require('fs-extra')
const { BASE_STYLE_FILE, COMPONENTS, LIB_DIR, STYLE_EXT } = require('../config')
const path = require('path')
const { getDeps } = require('../deps')
const { getPreStyle } = require('../utils/')
function generateCssModule() {
  // 生成样式依赖文件
  // button/style/css.js
  // button/style/sass.js
  return new Promise((resolve, reject) => {
    COMPONENTS.forEach(component => {
      let sassImports = `require("../../${BASE_STYLE_FILE}")`
      const deps = getDeps(component)
      console.log(component)
      console.log(deps)
      const styleFile = getPreStyle(`${LIB_DIR}/${component}/`)
      if (styleFile.path) {
        sassImports += `\nrequire("../${styleFile.ext}")`
      }
      deps.forEach(dep => {
        const preStyleFile = getPreStyle(path.join(LIB_DIR, component, dep.path))
        if (preStyleFile.path) {
          const relativePath = path.join('..', `${dep.path}${preStyleFile.ext}`)
          sassImports += `\nrequire("${relativePath}")`
        }
      })
      const cssImports = sassImports.replace(new RegExp(`${STYLE_EXT}`, 'g'), '.css')
      const styleModuleDir = `${LIB_DIR}/${component}/style`
      fs.outputFileSync(`${styleModuleDir}/sass.js`, sassImports)
      fs.outputFileSync(`${styleModuleDir}/css.js`, cssImports)
    })
    resolve()
  })
}



module.exports = {
  generateCssModule
}