const fs = require('fs-extra')
const path = require('path')
const { SCRIPT_EXTS, OUTPUT_DIR, STYLE_EXTS } = require('./config') 
const { cacheGlob: glob } = require('./utils/glob')
const { isIgnorePath  } = require('./utils/')
const deps = {}

function updateImport(filePath, source) {
  // 更新 import 语句，将 vue|jsx|tsx|ts 的引入改成 js
  // 并且根据 import 语句添加到全局依赖对象
  const SCRIPT_REG = /\.(vue|jsx|tsx|ts)/g
  const component = getUniqueName(filePath)
  // https://regexr.com/47jlq
  const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
  source = source || fs.readFileSync(filePath, 'utf8')
  const imports = source.match(IMPORT_REG)
  imports && imports.forEach(importCode => {
    const quote = importCode.includes('"') ? '"' : "'"
    const importPath = importCode.split(quote)[1]
    const dep = getDepByImport(filePath, importPath)
    if (dep && deps[dep.name]) {
      // 这里的判断没有写错
      // deps[dep.name] 说明是组件
      deps[component].push(dep)
    }
    // 将引入文件后缀改成 js
    if (SCRIPT_REG.test(importCode)) {
      source = source.replace(importCode, importCode.replace(SCRIPT_REG, '.js'))
    }
  })
  return source
}

function getDepByImport(filePath, importPath) {
  /** 
   * 根据引入路径生成依赖对象
   * @params '../button/' filpath
   * @returns { name: 'button', path: 相对于当前的路径, fullePath: src 下的路径 }
   */
  if (!importPath.includes('./')) {
    // 不是相对路径引入，第三方依赖
    return null
  }
  const absolutePath = path.resolve(filePath, '../', importPath)
  if (importPath.substr(-1) === '/') {
    // (../button/) 引入目录，自动找目录下的 index
    globStr = `${absolutePath}/index.{${SCRIPT_EXTS.join(',')}}`
  } else if (/\/[^.]+$/.test(importPath)) {
    // (../button/index) 引入没后缀的文件，补全后缀
    globStr = `${absolutePath}.{${SCRIPT_EXTS.join(',')}}`
  } else {
    // (../button/index.vue) 引入的是有后缀的文件，扩展后缀
    const ext = path.extname(importPath)
    globStr = absolutePath.replace(ext, `.{${SCRIPT_EXTS.join(',')}}`)
  }
  const file = glob(globStr)[0]
  if (file) {
    const res = {}
    res.name = getUniqueName(file)
    res.path = getShortPath(importPath)
    res.fullPath = res.name
    return res
  }
  return null
}

function getShortPath(importPath) {
  // 根据相对路径获取短路径
  // ../button/index.vue => ../button/
  // ../button/index => ../button/
  // ../button/icon.vue => ../button/icon
  const extReg = /[^.]+\.[^.]+/
  let shortPath = importPath.split('/').filter(s => !extReg.test(s)).join('/')
  const dirReg = /\/(index(\.[^/]*)?)?$/
  if (importPath.substr(-1) === '/' || dirReg.test(importPath)) {
    shortPath += '/'
  }
  return shortPath
}

function getUniqueName(filePath) {
  // 根据绝对路径获取唯一的名字
  // lib/button/index.vue => button
  // lib/button/components/index.vue => button/components
  // lib/button/components/icon.vue => button/components/icon
  const reg = new RegExp(`${OUTPUT_DIR}/([^.]+)`)
  let name = filePath.match(reg)[1].replace('/index', '')
  if (name.substr(-1) === '/') {
    name = name.substr(0, name.length - 1)
  }
  return name
}


function initDeps() {
  // 找出所有组件的目录
  const globStr = `${OUTPUT_DIR}/*/**/*.{js,ts,tsx,jsx,vue}`
  glob(globStr).forEach(filePath => {
    if (isIgnorePath(filePath)) return
    // 如果是 vue, tsx, jsx 文件
    // 或者 js ，ts 文件，并且目录下有 index.(scss|less|styl|css)，就是组件目录
    if ((['.vue']).includes(path.extname(filePath))) {
      const dirName = getUniqueName(filePath)
      deps[dirName] = []
    } else {
      const styleFile = filePath.replace(/\.(js|ts|jsx|tsx)/, `.{${STYLE_EXTS.substr(1)},css}`)
      if (glob(styleFile).length) {
        // 存在样式文件
        const dirName = getUniqueName(filePath)
        deps[dirName] = []
      }
    }
  })
}

function getDeps(component) {
  // 获取依赖并且会修正依赖路径
  const temp = []
  if (component && deps[component] && deps[component].length) {
    deps[component].forEach(dep => {
      temp.push(dep)
      const sub = getDeps(dep.name)
      sub.forEach(subDep => {
        const newPath = './' + path.join(dep.path, '..' , subDep.path)
        temp.push({
          ...subDep, path: newPath
        })
      })
    })
  }
  return temp
}


module.exports = {
  updateImport,
  getDeps,
  initDeps
}