const fs = require('fs-extra')
const compileVue = require('./compile-vue')
const compileJs = require('./compile-script')
const generateEntry = require('./genCode/generate-entry')
const generateCssModule = require('./genCode/generate-css-module')
const compileStyle = require('./compile-style')
const { LIB_DIR, SRC_DIR, ES_DIR, SCRIPT_EXTS } = require('./config')
const chalk = require('chalk')
const ora = require('ora')
const { initDeps } = require('./deps')
const { isIgnorePath, setBuildEnv } = require('./utils/')
const babelTransform = require('./babel-compiler')
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
// 4. 编译目录（ES_DIR）
// 4-1. 编译时，根据文件类型编译
// 4-2. 编译时，会补充第3步中的依赖对象
// 5. 生成 css module 文件
// 6. 编译组件样式
// 7. 生成主入口文件，生成入口样式文件，编译入口样式文件
// 8. ES_DIR 编译完成，将 ES_DIR 复制到 LIB_DIR
// 9. 编译 LIB_DIR，将所有 js 文件编译成 commonJs 规范


async function compileScripts(dir) {
  // 编译所有 vue|jsx|tsx|ts|js 文件
  const files = glob(`${dir}/**/*.{${SCRIPT_EXTS.map(s => s.substr(1)).join(',')}}`)
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

function buildEs() {
  // 编译成 esmodule
  setBuildEnv('esmodule')
  fs.emptyDirSync(ES_DIR)
  fs.copySync(SRC_DIR, ES_DIR, { filter: filePath => !isIgnorePath(filePath) })
  initDeps()
  return compileScripts(ES_DIR).then(() => {
    return Promise.all([
      generateCssModule(),
      compileStyle(),
      generateEntry()
    ])
  })
}

buildEs().then(() => {
  buildLib()
})

const tasks = [
  {
    name: '编译esModule目录',
    task: buildEs,
    subTasks: [
      {
        name: '设置环境变量',
        task: function() {
          setBuildEnv('esmodule')
        }
      },
      {
        name: '清空编译目录',
        task: function() {
          fs.emptyDirSync(ES_DIR)
        }
      },
      {
        name: '复制源目录',
        task: function() {
          fs.copySync(SRC_DIR, ES_DIR, { filter: filePath => !isIgnorePath(filePath) })
        }
      },
    ]
  },
  {
    name: '编译commonJs目录',
    task: buildLib
  },
]

// const spinner = ora(`${emoji.rocket_x3} ${chalk.cyan('unicorns')}`).start();
// setTimeout(() => {
//   spinner.succeed('哈哈哈')
// }, 1000)