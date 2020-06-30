
const fs = require('fs-extra')
const compiler = require('vue-template-compiler')
const compileUtils = require('@vue/component-compiler-utils')
const babel = require('@babel/core')
const { injectStyle } = require('./compile-style')
const { srcDir, outputDir } = require('./config')
const { sync: glob } = require('glob')


function compileVue(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  return new Promise(function(resolve, reject) {
    // TODO 可能需要 sourceMap，估计需要改 needMap 还有 babel.transfrom(code, options)
    // TODO 需要控制好报错，readFile => parse => babel => uglify => writeFile
    // TODO 打印必要的信息，如文件以及处理状态，大小
    let template = ''
    let script = ''
    const descriptor = compileUtils.parse({ compiler, source, needMap: false })
    if (descriptor.template) {
      // 编译 template 代码块
      const result = compileUtils.compileTemplate({
        source: descriptor.template.content,
        compiler,
        // transformAssetUrls: options.transformAssetUrls || true,
        prettify: false
      })
      template = result.code
      if (result.errors.length || result.tips.length) {
        // error or tips
        console.log('出错了')
        // reject('出错了')
      }
    }
    if (descriptor.script) {
      // 在 script 中添加 render 和 staticRenderFns
      script = descriptor.script.content.replace('export default {', 'export default {\n  render,\n  staticRenderFns,')
    }
    if (descriptor.styles) {
      let styles = ''
      descriptor.styles.forEach((style, index) => {
        // 添加到 index.(scss|less|styl) 中
        // 都没有的话创建 css 文件
        const content = `\n/* sfc-style-block-${index} */\n` + style.content.replace(/\n/g, '').trim()
        if (style.lang !== 'css') {
          const mainStyleFile = filePath.replace('.vue', `.${style.lang}`).replace(srcDir, outputDir)
          if (fs.existsSync(mainStyleFile)) {
            fs.appendFileSync(mainStyleFile, content)
          } else {
            fs.outputFileSync(mainStyleFile, content)
          }
        } else {
          const globStr = filePath.replace('.vue', `.{scss,less,styl,css}`).replace(srcDir, outputDir)
          const result = glob(globStr)
          if (result[0]) {
            fs.appendFileSync(result[0], content)
          } else {
            const cssFile =  filePath.replace('.vue', '.css').replace(srcDir, outputDir)
            fs.outputFileSync(cssFile, content)
          }
        }
      })
    }
    // 将 template 和 script 的内容拼在一起
    const content = `${template}\n${script}`
    const fileName = filePath.replace(srcDir, outputDir).replace('vue', 'js')
    const result = babel.transformSync(content, { filename: fileName }).code
    // 到这里为止，打出来的是没有 uglify 的 esModule
    // 这一部开始，可以继续编译出来 umd
    // TODO uglify umd 去掉注释
    // console.log(content)
    fs.outputFileSync(fileName, result)
    resolve(fileName)
    // 解析 sfc 中的样式
    // if (descriptor.styles.length) {
    //   descriptor.styles.forEach(style => {
    //     // 合并，然后写入到文件中
    //     console.log(style)
    //   })
    // }
  })
}

module.exports = compileVue
