const fs = require('fs-extra')
const path = require('path')
const { JS_EXT, outputDir, srcDir } = require('./config') 
const { sync: glob } = require('glob')

const deps = {}
// 存放所有组件，和组件的依赖
// { 
//    'button': ['icon'],
//    'icon': []
// }

function updateImport(filePath, source) {
  // 更新 import 语句，将 vue|jsx|tsx|ts 的引入改成 js
  // 并且生成依赖 map
  const SCRIPT_REG = /\.(vue|jsx|tsx|ts)/g
  const reg = new RegExp(`${outputDir}/([^/]+)`)
  const component = filePath.match(reg)[1]
  // https://regexr.com/47jlq
  const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
  source = source || fs.readFileSync(filePath, 'utf8')
  const imports = source.match(IMPORT_REG)
  imports && imports.forEach(importCode => {
    // 取出相对路径
    const quote = importCode.includes('"') ? '"' : "'"
    const importPath = importCode.split(quote)[1]
    // 获取绝对路径
    const fullPath = getImportPath(filePath, importPath)
    if (fullPath) {
      const dep = fullPath.match(reg)[1]
      if (deps[dep]) {
        // 说明是组件
        deps[component].push(dep)
      }
    }
    // 将引入文件后缀改成 js
    if (SCRIPT_REG.test(importCode)) {
      source = source.replace(importCode, importCode.replace(SCRIPT_REG, '.js'))
    }
  })
  return source
}

function getImportPath(filePath, importPath) {
  // 获取依赖的绝对路径
  // 不支持别名

  if (!relativePath.includes('.')) {
    // 不是相对路径引入
    return ''
  }
  const absolutePath = path.resolve(filePath, '../', relativePath)
  const fileName = path.basename(relativePath)
  let globStr = ''
  if (fileName.includes('.')) {
    // 引入的是文件
    const ext = path.extname(fileName)
    globStr = absolutePath.replace(ext, `.{${JS_EXT.join(',')}}`)
  } else {
    // 引入目录，自动找目录下的 index
    globStr = `${absolutePath}/index.{${JS_EXT.join(',')}}`
  }
  return globStr ? glob(globStr)[0] || '' : ''
}



function initDeps() {
  // 找出所有组件的目录
  const globStr = `${srcDir}/*/index.{js,ts,tsx,jsx,vue}`
  const reg = new RegExp(`${srcDir}/([^/]+)`)
  glob(globStr).forEach(file => {
    // 如果是 vue, tsx, jsx 文件
    // 或者 js ，ts 文件，并且目录下有 index.(scss|less|styl|css)，就是组件目录
    if ((['.vue','.tsx','.jsx']).includes(path.extname(file))) {
      const dirName = file.match(reg)[1]
      deps[dirName] = []
    } else {
      const styleFile = file.replace(/\.(js|ts)/, '.{scss,less,styl,css}')
      if (glob(styleFile).length) {
        const dirName = file.match(reg)[1]
        deps[dirName] = []
      }
    }
  })
}

function getDeps(component) {
  if (component && deps[component] && deps[component].length) {
    const subDeps = deps[component].map(getDeps)
    return deps[component].concat(subDeps)
  }
  return []
}

module.exports = {
  updateImport,
  getDeps,
  initDeps
}