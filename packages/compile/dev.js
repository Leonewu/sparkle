const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config  = require('../../scripts/build/webpack.site.config.js')
const { DEV_OUTPUT_DIR, COMPONENTS, SRC_DIR, BASE_STYLE_FILE, STYLE_EXT } = require('./config')
const fs = require('fs-extra')
const { glob } = require('./utils/glob')
// 生成 dev 的入口

function genDevScriptEntry() {
  let code = 'import Vue from "vue"\n'
  const routes = []
  COMPONENTS.forEach(component => {
    code += `import ${component} from "${SRC_DIR}/${component}/"\n`
    routes.push({
      path: '/' + component,
      title: component,
      component: component
    })
  })
  code += `const components = [${COMPONENTS.join(', ')}]\n` +
  `components.forEach(component => Vue.component(component.name, component))\n` +
  `const routes = ${JSON.stringify(routes, null, 2).replace(/"component":\s"(.+)"/g, '"component": $1')}\n` +
  'export default routes'
  fs.outputFileSync(`${DEV_OUTPUT_DIR}/index.js`, code)
}

function genDevStyleEntry() {
  let code = `@import "${SRC_DIR}/${BASE_STYLE_FILE}";\n`
  COMPONENTS.forEach(component => {
    const stylePath = `${SRC_DIR}/${component}/index.{${STYLE_EXT.substr(1)},css}`
    let files = glob(stylePath)
    if (files[0]) {
      code += `@import "${files[0]}";\n`
    }
  })
  fs.outputFileSync(`${DEV_OUTPUT_DIR}/index.${STYLE_EXT}`, code)
}

genDevScriptEntry()
genDevStyleEntry()
const compiler = Webpack(config)
new WebpackDevServer(compiler)