const fs = require('fs-extra')
const compileVue = require('./compile-vue')
const compileJs = require('./compile-script')
const generateEntry = require('./genCode/generate-entry')
const { generateCssModule } = require('./genCode/generate-css-module')
const { compileStyle } = require('./compile-style')
const { LIB_DIR, SRC_DIR, ES_DIR } = require('./config')
const chalk = require('chalk')
const path = require('path')
const { getDeps, initDeps } = require('./deps')
const { isIgnorePath, setBuildEnv } = require('./utils/')
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


// 顺序
// 1. 清空目录
// 2. 复制目录（SRC_DIR => ES_DIR）
// 3. 初始化依赖对象
// 4. 编译目录（ES_DIR）
// 4-1. 编译时，根据文件类型编译
// 4-2. 编译时，会补充第3步中的依赖对象
// 5. 生成 css module 文件
// 6. 编译组件样式
// 7. 生成主入口文件，生成入口样式文件，编译入口样式文件
// 8. ES_DIR 编译完成，将 ES_DIR 复制到 LIB_DIR
// 9. 编译 LIB_DIR，将所有 js 文件编译成 commonJs 规范


function compileDir(dir) {
  const results = fs.readdirSync(dir)
  const dirs = []
  const files = []
  results.forEach(res => {
    const filePath = path.join(dir, res)
    if (isIgnorePath(filePath)) {
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
  const vueFiles = files.filter(file => /\.vue/.test(file))
  const scriptFiles = files.filter(file => /\.(js|ts|jsx|tsx)/.test(file))
  // 先编译 vue 和 jsx/tsx
  vueFiles.forEach(compileVue)
  scriptFiles.forEach(compileJs)
}

// 清空目录
fs.emptyDirSync(ES_DIR)
fs.emptyDirSync(LIB_DIR)
// 编译 es
setBuildEnv('esmodule')
fs.copySync(SRC_DIR, ES_DIR)
initDeps()
compileDir(ES_DIR)
generateCssModule()
compileStyle()
generateEntry()
// 编译 commonjs
setBuildEnv('commonjs')
