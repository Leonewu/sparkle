const fs = require('fs-extra')
const compileVue = require('./compile-vue')
const { compileJs } = require('./compile-script')
const generateEntry = require('./codegen/generate-entry')
const generateCssModule = require('./codegen/generate-css-module')
const compileStyles = require('./compile-styles')
const { minify } = require('./utils/processor-compiler')
const { LIB_DIR, SRC_DIR, ES_DIR, SCRIPT_EXTS, LIB_NAME } = require('./config/')
const chalk = require('chalk')
const ora = require('ora')
const { initDeps } = require('./deps')
const { isIgnorePath, setBuildEnv } = require('./utils/')
const babelTransform = require('./utils/babel-compiler')
const { cacheGlob: glob } = require('./utils/glob')
const emoji = require('../emoji/')
const webpack = require('webpack')
const umdConfig = require('./config/webpack.umd.config')
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

async function buildUmd() {
  try {
    const compiler = webpack(umdConfig)
    await new Promise((resolve, reject) => {
      compiler.run(async (err, stats) => {
        if (err || stats.hasErrors()) {
          return reject(err)
        }
        resolve()
      })
    })
    const cssFile = `${LIB_DIR}/index.css`
    const css = fs.readFileSync(cssFile, 'utf8')
    const name = LIB_NAME.toLowerCase().replace(/\s/g, '-')
    const miniFile = `${LIB_DIR}/${name}.min.css`
    const miniCss = await minify(css)
    fs.outputFileSync(miniFile, miniCss)
  } catch (e) {
    throw new Error('编译umd出错')
  }
}


function build() {
  const tasks = [
    {
      name: '编译esModule',
      task: [
        {
          name: '编译前初始化',
          task: function() {
            setBuildEnv('esmodule')
            fs.emptyDirSync(ES_DIR)
            fs.copySync(SRC_DIR, ES_DIR, { filter: filePath => !isIgnorePath(filePath) })
            initDeps()
          }
        },
        {
          name: '编译脚本文件',
          task: compileScripts
        },
        {
          name: '生成样式依赖',
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
      name: '编译commonJs',
      task: buildLib
    },
    {
      name: '编译umd',
      task: buildUmd
    }
  ]
  runTasks(tasks)
}

async function runTasks(tasks) {
  for (const task of tasks) {
    if (typeof task.task === 'function') {
      const spinner = ora(`${chalk.cyan(task.name)}`).start();
      try {
        await task.task()
        spinner.succeed(chalk.magenta(task.name))
      } catch (e) {
        console.log(e)
        spinner.fail(chalk.redBright(task.name))
      }
    } else if (Object.prototype.toString.call(task.task) === '[object Array]') {
      try {
        // const spinner = ora(`${chalk.cyan(task.name)}`).start();
        await runTasks(task.task)
        // spinner.succeed(chalk.magenta(task.name))
      } catch (e) {
        console.log(e)
        // spinner.fail(chalk.redBright(task.name))
      }
    }

  }
}

build()