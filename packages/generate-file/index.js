const fs = require('fs-extra')
const path = require('path')
const compiler = require('vue-template-compiler')
const compileUtils = require('@vue/component-compiler-utils')
const { sync: glob } = require('glob')
const babel = require('@babel/core')

function getExt(file) {
  return file ? file.match(/\.([^.]+)$/) ? file.match(/\.([^.]+)$/)[1] : '' : ''
}
function compileVue(source) {
  return new Promise(function(resolve, reject) {
    // TODO 可能需要 sourceMap，估计需要改 needMap 还有 babel.transfrom(code, options)
    // TODO 需要控制好报错，readFile => parse => babel => uglify => writeFile
    // TODO 打印必要的信息，如文件以及处理状态，大小
    let template = ''
    let script = ''
    const descriptor = compileUtils.parse({ compiler, source, needMap: false })
    if (descriptor.template) {
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
      script = descriptor.script.content.replace('export default {', 'export default {\n  render,\n  staticRenderFns,')
    }
    const content = `${template}\n${script}`
    resolve(content)
  })
}

// 先解析 vue 文件，先不考虑 css scope
const entry = path.resolve(__dirname, '../../', 'src/components/*/index.{js,vue,jsx,tsx}')
const output = path.resolve(__dirname, '../../', 'fs-lib')
fs.emptyDirSync(output)
const result = glob(entry)
console.log(result)
result.forEach(filePath => {
  if (getExt(filePath) === 'vue') {
    // 编译 sfc
    const source = fs.readFileSync(filePath, 'utf8')
    compileVue(source).then(content => {
      const componentDir = path.resolve(__dirname, '../../', 'src/components')
      const fileName = filePath.replace(componentDir, output).replace('vue', 'js')
      console.log(content)
      content = babel.transformSync(content, { filename: fileName }).code
      // TODO uglify
      console.log(content)
      fs.outputFileSync(fileName, content)
    })
  }
})
