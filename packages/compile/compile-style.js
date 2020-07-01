
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')
const fs = require('fs-extra')
const { outputDir, srcDir, } = require('./config')
const path = require('path')
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
    const statement = 'require("./index.css")\n'
    compileStyle({ filePath: stylePath })
    return statement + source
  }
  return source
}

function compileStyle(filePath) {
  const cssPath = filePath.replace(srcDir, outputDir).replace('scss', 'css')
  fs.copySync(filePath, filePath.replace(srcDir, outputDir))
  if (filePath) {
    // component/index.scss
    const css = sass.renderSync({ file: filePath }).css
    const processor = postcss([autoprefixer, postcssNormalize])
    processor.process(css).then(res => {
      fs.outputFileSync(cssPath, res)
    })
    generateCssModule(filePath)
  }
}


module.exports = {
  injectStyle,
  compileStyle
}
