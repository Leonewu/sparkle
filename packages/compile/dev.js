const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../../webpack.site.config.js')
const { DEV_DIR, SRC_DIR, BASE_STYLE_FILE, STYLE_EXT, SCRIPT_EXTS } = require('./config')
const fs = require('fs-extra')
const { glob } = require('./utils/glob')
const configJson = require('../../components.config.js').components

// 生成文件并启动 dev server

const flatConfig = []

function initJson() {
  configJson.forEach(config => {
    if (config.components) {
      config.components.forEach(component => {
        const { path } = component
        const scriptFiles = glob(`${SRC_DIR}/${path}/index.{${SCRIPT_EXTS.map(s => s.substr(1)).join(',')}}`)
        const demoFiles = glob(`${SRC_DIR}/${path}/demo/index.{${SCRIPT_EXTS.map(s => s.substr(1)).join(',')}}`)
        const docFiles = glob(`${SRC_DIR}/${path}/README.md`)
        const styleFiles = glob(`${SRC_DIR}/${[path]}/index.{${STYLE_EXT.substr(1)},css}`)
        component.script = scriptFiles[0] ? scriptFiles[0] : ''
        component.style = styleFiles[0] ? styleFiles[0] : ''
        component.demo = demoFiles[0] ? demoFiles[0] : ''
        component.doc = docFiles[0] ? docFiles[0] : ''
        flatConfig.push(component)
      })
    }
  })
}

function genEntries() {
  let scriptImports = `import Vue from "vue"\nimport "./index${STYLE_EXT}"\n`
  let styleImports = `@import "${SRC_DIR}/${BASE_STYLE_FILE}";\n`
  let demoImports = 'import "./index.js"\n'
  let docImports = 'import "./index.js"\n'
  const installs = []
  const demoRoutes = []
  const docRoutes = []
  flatConfig.forEach(config => {
    const { script, style, demo, doc, path } = config
    if (script) {
      scriptImports += `import ${path} from "${script}"\n`
      installs.push(path)
    }
    if (style) {
      styleImports += `@import "${style}";\n`
    }
    if (demo) {
      demoImports += `import ${path} from "${demo}"\n`
      demoRoutes.push({
        path: '/' + path,
        component: path
      })
    }
    if (doc) {
      docImports += `import ${path} from "${doc}"\n`
      docRoutes.push({
        path: '/' + path,
        component: path
      })
    }
  })
  scriptImports +=
    `const components = [${installs.join(', ')}]\n` +
    `components.forEach(component => {\n  Vue.component(component.name, component)\n})\n`
  demoImports +=
    `const components = {\n  ${installs.join(',\n  ')}\n}\n` +
    `const config = ${JSON.stringify(configJson, null, 2)}\n` +
    `const routes = ${JSON.stringify(demoRoutes, null, 2).replace(/"component":\s"(.+)"/g, '"component": $1')}\n` +
    'export { routes, components, config }'
  docImports +=
    `const components = {\n  ${installs.join(',\n  ')}\n}\n` +
    `const config = ${JSON.stringify(configJson, null, 2)}\n` +
    `const routes = ${JSON.stringify(docRoutes, null, 2).replace(/"component":\s"(.+)"/g, '"component": $1')}\n` +
    'export { routes, components, config }'
  fs.outputFileSync(`${DEV_DIR}/index.js`, scriptImports)
  fs.outputFileSync(`${DEV_DIR}/index${STYLE_EXT}`, styleImports)
  fs.outputFileSync(`${DEV_DIR}/demo.js`, demoImports)
  fs.outputFileSync(`${DEV_DIR}/doc.js`, docImports)
}



initJson()
genEntries()

const compiler = Webpack(config)
process.env.NODE_ENV = 'development'
const server = new WebpackDevServer(compiler)
server.listen(config.devServer.port)