/* eslint-disable no-unused-vars */

const { src, dest, task } = require('gulp')
const babel = require('gulp-babel')
const webpack = require('webpack')
const compiler = require('vue-template-compiler')
const through2 = require('through2')
const COMPONENTS_DEPENDENCIES = []
const entry = {
  js: ['src/components/*/index.{vue,js,jsx,tsx}', '!src/components/*/{demo,__test__}/*'],
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
  // return src(entry.js)
  // .pipe()
  const result = compiler.compile(`
  <div id="test">
    <div>
      <p>This is my vue render test</p>
    </div>
    <p>my name is {{myName}}</p>
  </div>`
  )

  console.log(result)
}

/* compile js */
function compileJs(next) {
  return src(entry.js)
    // .pipe(through2.obj(function(chunk, encode, next) {
    //   this.push(chunk)
    //   next()
    // }))
    .pipe(babel())
    .pipe(dest('gulp-lib/'))
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
  compileJs()
  compileVue()
  copyScss()
  next()
}
