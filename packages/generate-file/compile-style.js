
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')
const fs = require('fs-extra')
const { outputDir, componentDir } = require('./config')

/**
 * inject style and compile style
 * 影响文件： 组件 index.js
 * 生成文件： 组件 index.css
 *
 *  */

function injectStyle(file) {
  // 注入 scss 的 import 语句到 组件 js 中
  const { filePath, source } = file
  const stylePath = filePath.replace(/(js|vue|jsx|tsx)/, 'scss')
  if (fs.existsSync(stylePath)) {
    // 如果组件目录下面有 index.scss 就自动引入
    const statement = 'import "./index.css"\n'
    compileStyle({ filePath: stylePath })
    return statement + source
  }
  return source
}

function compileStyle(file) {
  const { filePath, source } = file
  const cssPath = filePath.replace(componentDir, outputDir).replace('scss', 'css')
  fs.copySync(filePath, filePath.replace(componentDir, outputDir))
  if (source) {
    // sfc style block
  } else if (filePath) {
    // component/index.scss
    const css = sass.renderSync({ file: filePath }).css
    const processor = postcss([autoprefixer, postcssNormalize])
    processor.process(css).then(res => {
      fs.outputFileSync(cssPath, res)
    })
    generateCssModule(filePath)
  }
}

function generateCssModule(filePath) {
  // 生成 css 依赖文件
  // component/style/css.js
  // component/style/scss.js
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error(`componentName error, filePath: ${filePath}`))
      return
    }
    const componentName = filePath.match(new RegExp(`${componentDir}/([^/]+)/`))
    if (!componentName || !componentName[1]) {
      reject(new Error(`componentName error, filePath: ${filePath}`))
      return
    }
    const dir = `${outputDir}/${componentName[1]}/style`
    const css = '\nimport "../../common/base.css"\nimport "../index.css"'
    const scss = css.replace(/css/g, 'scss')
    fs.outputFileSync(`${dir}/css.js`, css)
    fs.outputFileSync(`${dir}/scss.js`, scss)
    resolve()
  })
}

module.exports = {
  injectStyle,
  compileStyle
}
