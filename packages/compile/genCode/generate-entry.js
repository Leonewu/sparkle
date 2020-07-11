const { COMPONENTS, OUTPUT_DIR, BASE_STYLE_FILE } = require('../config')
const fs = require('fs-extra')
const compileSass = require('../sass-compiler')

// TODO 依赖引入
function generateStyleEntry() {
  return new Promise((resolve, reject) => {
    const sass = COMPONENTS.reduce((sum, cur) => {
      sum += `\n@import "./${cur}/index.scss";`
      return sum
    }, `@import "./${BASE_STYLE_FILE}";`)
    const sassPath = `${OUTPUT_DIR}/index.scss`
    const cssPath = sassPath.replace(/scss/g, 'css')
    fs.outputFileSync(sassPath, sass)
    compileSass(sassPath).then(res => {
      fs.outputFileSync(cssPath, res.content)
    })
    resolve()
  })
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
