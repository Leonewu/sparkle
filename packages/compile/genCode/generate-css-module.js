const fs = require('fs-extra')
const { BASE_STYLE_FILE, COMPONENTS, OUTPUT_DIR, STYLE_EXT } = require('../config')
const path = require('path')
const { getDeps } = require('../deps')
const { getPreStyle } = require('../utils/')
function generateCssModule() {
  // 生成样式依赖文件
  // button/style/css.js
  // button/style/scss.js
  return new Promise((resolve, reject) => {
    try {
      COMPONENTS.forEach(component => {
        let sassImports = `import "../../${BASE_STYLE_FILE}"`
        const deps = getDeps(component)
        const styleFile = getPreStyle(`${OUTPUT_DIR}/${component}/`)
        if (styleFile.path) {
          sassImports += `\nimport "../${styleFile.ext}"`
        }
        deps.forEach(dep => {
          const preStyleFile = getPreStyle(path.join(OUTPUT_DIR, component, dep.path))
          if (preStyleFile.path) {
            const relativePath = path.join('..', `${dep.path}${preStyleFile.ext}`)
            sassImports += `\nimport "${relativePath}"`
          }
        })
        const cssImports = sassImports.replace(new RegExp(`${STYLE_EXT}`, 'g'), '.css')
        const styleModuleDir = `${OUTPUT_DIR}/${component}/style`
        fs.outputFileSync(`${styleModuleDir}/${STYLE_EXT.substr(1)}.js`, sassImports)
        fs.outputFileSync(`${styleModuleDir}/css.js`, cssImports)
      })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}



module.exports = generateCssModule