const { COMPONENTS, outputDir, baseStyleFile } = require('../config')
const fs = require('fs-extra')
const compileSass = require('../sass-compiler')
const index = require('postcss-normalize')

// TODO 依赖引入
function generateStyleEntry() {
  return new Promise((resolve, reject) => {
    const sass = COMPONENTS.reduce((sum, cur) => {
      sum += `\n@import "./${cur}/index.scss";`
      return sum
    }, `@import "./${baseStyleFile}";`)
    const sassPath = `${outputDir}/index.scss`
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
    fs.outputFileSync(`${outputDir}/index.js`, code)
}

function generateEntry() {
  generateStyleEntry()
  generateScriptEntry()
}
module.exports = generateEntry
