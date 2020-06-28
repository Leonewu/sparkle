const fs = require('fs-extra')
const { sync: glob } = require('glob')
const compileVue = require('./compile-vue')
const complileCommon = require('./compile-common')
const { generateStyleEntry } = require('./generate-entry')
const { getExt } = require('./utils')
const { entries, outputDir } = require('./config')
const chalk = require('chalk')
// TODO 用 ts 写编译代码，减少出错
// TODO 编译缓存 sass，babel，vue
// TODO sourceMap sass babel vue
// TODO error catch
// TODO uglify，去掉换行，注释，trim
// TODO umd
// TODO 打印每个阶段的控制台信息
// TODO css scope
// TODO 提取公共方法
// spinner
fs.emptyDirSync(outputDir)
const result = entries.map(entry => glob(entry))
console.log(result)
complileCommon()
result.forEach(filePath => {
  if (getExt(filePath) === 'vue') {
    compileVue(filePath).then((output) => {
      console.log(chalk.greenBright(`${filePath}编译成功: ${output}`))
    })
  }
})
generateStyleEntry()
