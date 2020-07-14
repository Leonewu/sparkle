
const compileSass = require('./sass-compiler')
const fs = require('fs-extra')
const { OUTPUT_DIR, STYLE_EXT } = require('./config')
const path = require('path')
const { cacheGlob: glob } = require('./utils/glob')
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

function compileStyle() {
  // 编译所有样式文件
  const styles = glob(`${OUTPUT_DIR}/**/*.{${STYLE_EXT.substr(1)}, css}`)
  styles.forEach(filePath => {
    const compiledPath = filePath.replace(new RegExp(`${STYLE_EXT}`), '.css')
    compileSass(filePath).then(res => {
      if (res.content) {
        fs.outputFileSync(compiledPath, res.content)
      }
    })
  })
}


module.exports = {
  injectStyle,
  compileStyle
}
