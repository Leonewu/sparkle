const fs = require('fs-extra')
const { sync: glob } = require('glob')
const compileVue = require('./compile-vue')
const complileCommon = require('./compile-common')
const { generateStyleEntry } = require('./generate-entry')
const { getExt } = require('./utils')
const { entries, outputDir, styleEntries, srcDir } = require('./config')
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

// 顺序
// 1. 清空目录
// 2. 复制公共目录（style，js）
// 3. 复制组件样式（这一步在第4步前是因为要 vue 的 style block 要和主样式文件合在一起）
// 4. 编译组件主文件（vue，jsx，tsx）
// 5. 生成 css module 文件
// 6. 编译组件样式
// 7. 生成主入口文件，生成入口样式文件，编译入口样式文件
fs.emptyDirSync(outputDir)

complileCommon()

const styles = styleEntries.map(entry => glob(entry)[0]).filter(entry => entry)
styles.forEach(filePath => {
  const outputPath = filePath.replace(srcDir, outputDir)
  fs.copySync(filePath, outputPath)
})

const result = entries.map(entry => glob(entry)[0]).filter(entry => entry)
result.forEach(filePath => {
  if (getExt(filePath) === 'vue') {
    compileVue(filePath).then((output) => {
      console.log(chalk.greenBright(`${filePath}编译成功: ${output}`))
    })
  }
})



// generateStyleEntry()
