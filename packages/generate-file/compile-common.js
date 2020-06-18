const fs = require('fs-extra')
const path = require('path')
const { styleEntry, componentDir, outputDir, baseStyleDir } = require('./config')
const { sync: glob } = require('glob')
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')

function compileCommon() {
  // 复制 utils
  copyCommonStyle()
  generateStyleEntry()
}

function copyCommonStyle() {
  const baseStyleDirName = path.basename(baseStyleDir)
  debugger
  fs.copySync(baseStyleDir, `${outputDir}/${baseStyleDirName}`)
}

function compileCommonjs() {

}

function generateStyleEntry() {
  return new Promise((resolve, reject) => {
    const result = glob(styleEntry)
    const entry = '@import "./common/base.scss";'
    const code = result.reduce((sum, cur) => {
      const componentName = cur.match(new RegExp(`${componentDir}/([^/]+)/`))
      if (!componentName || !componentName[1]) {
        throw new Error('编译scss入口出错，componentName')
      }
      sum += `\n@import "./${componentName[1]}/index.scss";`
      return sum
    }, entry)
    const scssPath = `${outputDir}/index.scss`
    const cssPath = scssPath.replace(/scss/g, 'css')
    fs.outputFileSync(scssPath, code)
    const css = sass.renderSync({ file: scssPath }).css
    const processor = postcss([autoprefixer, postcssNormalize])
    processor.process(css).then(res => {
      fs.outputFileSync(cssPath, res)
    })
    resolve()
  })
}

function compileCommonStyle() {

}

module.exports = compileCommon
