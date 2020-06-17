/* eslint-disable no-unused-vars */

const { src, dest, task } = require('gulp')
const babel = require('gulp-babel')
const webpack = require('webpack')
const compiler = require('vue-template-compiler')
const compileUtils = require('@vue/component-compiler-utils')
const through2 = require('through2')
const COMPONENTS_DEPENDENCIES = []
const entry = {
  js: ['src/components/*/index.vue', '!src/components/*/{demo,__test__}/*'],
  style: 'src/components/*/index.{scss,css}',
  commonStyle: 'src/common/*.{scss,css}',
  commonJs: 'src/utils/*.{ts,js}'
}
/* 创建任务 */
// task('build', function(next) {
//   clean()
//   next()
// })

/* 清除目录 */
function clean(next) {
  next()
}

/* compile vue */
function compileVue(next) {
  return src(entry.js)
    .pipe(through2.obj(function(chunk, encode, next) {
      const source = chunk.contents.toString()
      const descriptor = compileUtils.parse({ compiler, source, needMap: false })
      console.log(descriptor)
      if (descriptor.template) {
        const result = compileUtils.compileTemplate({
          source: descriptor.template.content,
          compiler,
          // transformAssetUrls: options.transformAssetUrls || true,
          prettify: false
        })
        console.log(result)
        if (result.errors.length || result.tips.length) {
          // error or tips
        }
        chunk.path = chunk.path.replace('vue', 'js')
        chunk.contents = Buffer.from(result.code + '\n')
      }
      this.push(chunk)
      next()
    }))
    .pipe(dest('gulp-lib/'))
}

/* compile js */
function compileJs(next) {
  return src(entry.js)
    .pipe(through2.obj(function(chunk, encode, next) {
      const source = chunk.contents.toString()
      const descriptor = compileUtils.parse({ compiler, source, needMap: false })
      if (descriptor.script) {
        const contents = descriptor.script.content.replace('export default {', 'export default {\n  render,\n  staticRenderFns,\n')
        chunk.contents = Buffer.from(contents)
      }
      chunk.path = chunk.path.replace('vue', 'js')
      this.push(chunk)
      next()
    }))
    .pipe(babel())
    .pipe(dest('gulp-lib/', { append: true }))
}

/* 拷贝 scss */
function copyScss(next) {
  return src('src/components/*/*.scss')
    .pipe(through2.obj(function(chunk, encode, next) {
      // const { contents } = chunk
      // 复制文件到 lib/scss
      // chunk.path = chunk.path.replace(/components\/[^/]+\//, 'components/')
      this.push(chunk)
      next()
    }))
    .pipe(dest('gulp-lib/'))
}

/* 分析 css 依赖 */
function getCssDep(next) {
  next()
}

exports.default = function build(next) {
  compileVue()
  compileJs()
  // copyScss()
  next()
}

/* 编译 vue template 的内容有两种方法，一种是用vue-template-compiler.complie(source)
  或者用 vue-compile-utils.compileTemplate({source,compiler})
*/
