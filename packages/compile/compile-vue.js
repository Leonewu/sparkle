
const fs = require('fs-extra')
const compiler = require('vue-template-compiler')
const VueCompileUtils = require('@vue/component-compiler-utils')
const { STYLE_EXT } = require('./config')
const hash = require('hash-sum')
const { updateImport } = require('./deps')
const { isExist } = require('./utils/cache')
const { injectInstall, removeComment } = require('./utils/')
const babelTransform = require('./babel-compiler')

function compileVue(filePath) {
  return new Promise(async function(resolve, reject) {
    const source = fs.readFileSync(filePath, 'utf8')
    // TODO 可能需要 sourceMap，估计需要改 needMap 还有 babel.transfrom(code, options)
    // TODO 需要控制好报错，readFile => parse => babel => uglify => writeFile
    // TODO 打印必要的信息，如文件以及处理状态，大小
    let template = ''
    let script = ''
    let scopeId = ''
    const descriptor = VueCompileUtils.parse({ compiler, source, needMap: false })
    if (descriptor.styles) {
      descriptor.styles.forEach((style, index) => {
        // 添加到 index.(scss|less|styl) 中
        // 都没有的话创建 css 文件
        let content = style.content.replace(/\n/g, '').trim()
        if (style.scoped && !scopeId) {
          scopeId = hash(filePath + '\n' + source)
          const { code, map, errors } = VueCompileUtils.compileStyle({
            source: style.content,
            filename: filePath,
            id: `data-v-${scopeId}`,
            scoped: true,
            trim: true
          })
          if (errors.length) {
            console.log(errors)
          } else {
            content = code
          }
        }
        content = content ? `\n/* sfc-style-block-${index} */\n${content}` : ''
        if (style.lang && style.lang !== 'css') {
          const styleFile = filePath.replace('.vue', `.${style.lang}`)
          if (isExist(styleFile)) {
            // 如果有scss|less|styl文件，就写到文件最后面
            fs.appendFileSync(styleFile, content)
          } else {
            // 没有就创建
            content && fs.outputFileSync(styleFile, content)
          }
        } else {
          const styleFile = filePath.replace('.vue', `${STYLE_EXT}`)
          if (isExist(styleFile)) {
            fs.appendFileSync(result[0], content)
          } else {
            const cssFile = filePath.replace('.vue', '.css')
            content && fs.outputFileSync(cssFile, content)
          }
        }
      })
    }
    if (descriptor.template) {
      // 编译 template 代码块
      const result = VueCompileUtils.compileTemplate({
        source: descriptor.template.content,
        compiler,
        // transformAssetUrls: true,
        prettify: false,
        compilerOptions: {
          // scopeId: scopeId ? `data-v-${scopeId}` : null,
          // outputSourceRange: true,
          whitespace: 'condense',
        }
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
      // 以及 scopeId
      // 注意 vue-template-compiler 的 compilerOptions: { scopeId } 是假的
      // 虽然 vue-loader（templateLoader） 的源码上是有写的，但其实并没有起作用
      // 初步猜测应该是添加了 _scopeId
      // TODO 待研究原理
      if (scopeId) {
        script = descriptor.script.content.replace('export default {', `${template}\nexport default {\n  render,\n  staticRenderFns,\n  _scopeId: "data-v-${scopeId}",`)
      } else {
        script = descriptor.script.content.replace('export default {', `${template}\nexport default {\n  render,\n  staticRenderFns,`)
      }
      script = removeComment(script)
      script = updateImport(filePath, script)
      script = injectInstall(filePath, script)
    } else {
      script = template
    }
    const outputFile = filePath.replace('vue', 'js')
    const result = await babelTransform(filePath, script)
    fs.remove(filePath)
    fs.outputFileSync(outputFile, result)
    resolve(filePath)
  })
}

module.exports = compileVue
