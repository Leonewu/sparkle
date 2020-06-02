/* eslint-disable no-unused-vars */

const { series, src, dest, task } = require('gulp')
const webpack = require('webpack')
const COMPONENTS_DEPENDENCIES = []

/* 创建任务 */
task('build', function(next) {
  clean()
  next()
})

/* 清除目录 */
function clean(next) {
  next()
}

/* 拷贝 scss */
function copyScss(next) {
  return src('src/components/*/*.scss')
    .pipe(function(chunk, enc, next) {
      // const { contents } = chunk
      console.log(chunk)
      next()
    })
    // .pipe(dest('lib/scss/'))
}

/* 分析 css 依赖 */
function getCssDep(next) {
  next()
}

exports.default = function build(next) {
  copyScss()
  next()
}
