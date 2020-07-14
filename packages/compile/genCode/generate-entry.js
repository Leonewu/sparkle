const { COMPONENTS, OUTPUT_DIR, BASE_STYLE_FILE, STYLE_EXTS } = require('../config')
const fs = require('fs-extra')
const compileSass = require('../sass-compiler')
const { getDeps } = require('../deps')
const { getPreStyle } = require('../utils/')
const path = require('path')

function generateStyleEntry() {
  return new Promise((resolve, reject) => {
    const deps = []
    let importCodes = `@import "./${BASE_STYLE_FILE}";`
    COMPONENTS.forEach(component => {
      const styleFile = getPreStyle(`${OUTPUT_DIR}/${component}/`)
      if (styleFile.path) {
        importCodes += `\n@import "./${component}/${styleFile.ext}";`
      }
      getDeps(component).forEach(dep => {
        if (!deps.includes(dep.fullPath)) {
          deps.push(dep.fullPath)
          const depStylePath = path.join(OUTPUT_DIR, component, dep.path)
          const depStyleFile = getPreStyle(depStylePath)
          if (depStyleFile.path) {
            // sass 引入 css 要去掉 css 后缀
            importCodes += `\n@import "${depStyleFile.path.replace(OUTPUT_DIR, '.').replace('.css', '')}";`
          }
        }
      })
    })
    const sassPath = `${OUTPUT_DIR}/index${STYLE_EXTS}`
    const cssPath = sassPath.replace(new RegExp(`${STYLE_EXTS}`), '.css')
    fs.outputFileSync(sassPath, importCodes)
    compileSass(sassPath).then(res => {
      fs.outputFileSync(cssPath, res.content)
    })
    resolve()
  })
}

function getStyle() {
  
}

function generateScriptEntry() {
  let code = COMPONENTS.reduce((sum, cur) => {
      sum += `\nimport ${cur} from "./${cur}/index.js";`
      return sum
    }, '')
    code += `
const components = [${COMPONENTS.join(', ')}];
function install(Vue) {
  components.forEach(component => {
    if (component.install) {
      component.install(Vue);
    } else {
      Vue.component(component.name, component);
    }
  })
}
// if (Vue) {
//   install(Vue)
// }
export default {
  install
}`
    fs.outputFileSync(`${OUTPUT_DIR}/index.js`, code)
}

function generateEntry() {
  generateStyleEntry()
  generateScriptEntry()
}
module.exports = generateEntry
