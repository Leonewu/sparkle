const fs = require('fs-extra')
const compileVue = require('./compile-vue')
const { compileJs } = require('./compile-script')
const generateEntry = require('./codegen/generate-entry')
const generateCssModule = require('./codegen/generate-css-module')
const compileStyles = require('./compile-styles')
const { LIB_DIR, SRC_DIR, ES_DIR, SCRIPT_EXTS } = require('./config')
const chalk = require('chalk')
const ora = require('ora')
const { initDeps } = require('./deps')
const { isIgnorePath, setBuildEnv } = require('./utils/')
const babelTransform = require('./utils/babel-compiler')
const { cacheGlob: glob } = require('./utils/glob')
const emoji = require('../emoji/')
// TODO 用 ts 写编译代码，减少出错
// TODO 编译缓存 sass，babel，vue
// TODO sourceMap sass babel vue
// TODO error catch，promisify
// TODO uglify，去掉换行，注释，trim
// TODO umd
// TODO 打印每个阶段的控制台信息
// TODO css scope，css module
// spinner


// 顺序
// 1. 清空目录
// 2. 复制目录（SRC_DIR => ES_DIR）
// 3. 初始化依赖对象
// 4. 编译脚本文件
// 4-1. 编译时，根据文件类型编译
// 4-2. 编译时，会补充第3步中的依赖对象
// 5. 生成 css module 文件
// 6. 编译组件样式
// 7. 生成主入口文件，生成入口样式文件，编译入口样式文件
// 8. ES_DIR 编译完成，将 ES_DIR 复制到 LIB_DIR
// 9. 编译 LIB_DIR，将所有 js 文件编译成 commonJs 规范


async function compileScripts() {
  // 编译所有 vue|jsx|tsx|ts|js 文件
  // 先不编译样式文件
  const files = glob(`${ES_DIR}/**/*.{${SCRIPT_EXTS.map(s => s.substr(1)).join(',')}}`)
  const vueFiles = files.filter(filePath => /\.vue$/.test(filePath))
  const scriptFiles = files.filter(filePath => /\.(js|ts|jsx|tsx)$/.test(filePath))
  const promises = vueFiles.map(compileVue).concat(scriptFiles.map(compileJs))
  return Promise.all(promises)
}

function buildLib() {
  // 编译成 commonjs
  setBuildEnv('commonjs')
  fs.emptyDirSync(LIB_DIR)
  fs.copySync(ES_DIR, LIB_DIR)
  glob(`${LIB_DIR}/**/*.js`).forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8')
    const result = babelTransform(filePath, content)
    fs.outputFileSync(filePath, result)
  })
}


const tasks = [
  {
    name: '编译esModule目录',
    task: [
      {
        name: '清空复制编译目录',
        task: function() {
          setBuildEnv('esmodule')
          fs.emptyDirSync(ES_DIR)
          fs.copySync(SRC_DIR, ES_DIR, { filter: filePath => !isIgnorePath(filePath) })
        }
      },
      {
        name: '初始化组件依赖',
        task: initDeps
      },
      {
        name: '编译脚本文件',
        task: compileScripts
      },
      {
        name: '生成样式依赖文件',
        task: generateCssModule
      },
      {
        name: '编译样式文件',
        task: compileStyles
      },
      {
        name: '生成入口文件',
        task: generateEntry
      },
    ]
  },
  {
    name: '编译commonJs目录',
    task: buildLib
  },
]
async function build() {
  const spinner = ora(`${emoji.rocket_x3} ${chalk.cyan('unicorns')}`).start();
  setTimeout(() => {
    spinner.succeed('哈哈哈')
  }, 1000)
  for (const task of tasks) {
    if (typeof task.task === 'function') {
      await task.task()
    } else if (Object.prototype.toString.call(task.task) === '[object Array]') {
      for (const sub of task.task) {
        await sub.task()
      }
    }
  }
}

build()

