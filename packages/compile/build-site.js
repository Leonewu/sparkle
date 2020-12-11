const Webpack = require('webpack')
const config = require('../../webpack.site.config.js')
const genImports = require('./codegen/generate-imports')
const chalk = require('chalk')
// 生成文件并启动 dev server


genImports()
process.env.NODE_ENV = 'production'
Webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('编译出错了')
  }
})
