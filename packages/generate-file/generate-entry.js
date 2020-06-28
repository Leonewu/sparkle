const { styleEntry, componentDir, outputDir } = require('./config')
const fs = require('fs-extra')
const { sync: glob } = require('glob')
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')


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

module.exports = {
  generateStyleEntry
}