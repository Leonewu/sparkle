const fs = require('fs-extra')
const compileVue = require('./compile-vue')
const compileJs = require('./compile-script')
const generateStyleEntry = require('./genCode/generate-entry')
const { generateCssModule } = require('./genCode/generate-css-module')
const { compileStyle } = require('./compile-style')
const { getExt } = require('./utils')
const { entries, outputDir, styleEntries, srcDir } = require('./config')
const chalk = require('chalk')
const path = require('path')
const { sync: glob } = require('glob')
const { getDeps, initDeps } = require('./deps')
// TODO 用 ts 写编译代码，减少出错
// TODO 编译缓存 sass，babel，vue
// TODO sourceMap sass babel vue
// TODO error catch，promisify
// TODO uglify，去掉换行，注释，trim
// TODO umd
// TODO 打印每个阶段的控制台信息
// TODO css scope，css module
// 组件内部依赖，第三方依赖
// TODO babel transform runtime，转 es5
// 抽取公共函数 getExt getComponentName
// spinner

function isTestPath(filePath) {
  return /__test__/.test(filePath)
}
function isDemoPath(filePath) {
  return /demo/.test(filePath)
}
function isDocPath(filePath) {
  return /README\.md/.test(filePath)
}

// 顺序
// 1. 清空目录
// 2. 复制公共目录（style，js）
// 3. 复制组件样式（这一步在第4步前是因为要 vue 的 style block 要和主样式文件合在一起）
// 4. 编译组件主文件（vue，jsx，tsx）,style block 会追加在 index.scss 后面 ,生成依赖地图
// 5. 生成 css module 文件
// 6. 编译组件样式
// 7. 生成主入口文件，生成入口样式文件，编译入口样式文件
fs.emptyDirSync(outputDir)
fs.copySync(srcDir, outputDir)

function compileDir(dir) {
  const results = fs.readdirSync(dir)
  const dirs = []
  const files = []
  results.forEach(res => {
    const filePath = path.join(dir, res)
    if (isDemoPath(filePath) || isTestPath(filePath) || isDocPath(filePath)) {
      fs.removeSync(filePath)
      return
    }
    if (fs.lstatSync(filePath).isDirectory()) {
      dirs.push(filePath)
    } else {
      files.push(filePath)
    }
  })
  dirs.map(compileDir)
  const vueFile = files.find(file => /\.vue/.test(file))
  const scriptFiles = files.filter(file => /\.(js|ts|jsx|tsx)/.test(file))
  // 先编译 vue 和 jsx/tsx
  if (vueFile) {
    compileVue(vueFile).then(() => {
      fs.remove(vueFile)
    })
  }
  if (scriptFiles) {
    scriptFiles.map(compileJs)
  }
}
initDeps()
compileDir(outputDir)
generateCssModule()
compileStyle()
generateStyleEntry()
setTimeout(() => {
  console.log(getDeps())
}, 1000);