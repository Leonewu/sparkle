const fs = require('fs-extra')
const { baseStyleFile, COMPONENTS, outputDir } = require('../config')
const path = require('path')
const { getDeps } = require('../deps')
const { isExist } = require('../utils/cache')

function generateCssModule() {
  // 生成样式依赖文件
  // button/style/css.js
  // button/style/sass.js
  return new Promise((resolve, reject) => {
    COMPONENTS.forEach(component => {
      let sassImports = `require("../../${baseStyleFile}")`
      const deps = getDeps(component)
      console.log(component)
      console.log(deps)
      const styleFile = getPreStyle(`${outputDir}/${component}/`)
      if (styleFile.path) {
        sassImports += `\nrequire("../${styleFile.ext}")`
      }
      deps.forEach(dep => {
        const preStyleFile = getPreStyle(path.join(outputDir, component, dep.path))
        if (preStyleFile.path) {
          const relativePath = path.join('..', `${dep.path}${preStyleFile.ext}`)
          sassImports += `\nrequire("${relativePath}")`
        }
      })
      const cssImports = sassImports.replace(/(\.scss|\.less|\.styl)/g, '.css')
      const styleModuleDir = `${outputDir}/${component}/style`
      fs.outputFileSync(`${styleModuleDir}/sass.js`, sassImports)
      fs.outputFileSync(`${styleModuleDir}/css.js`, cssImports)
    })
    resolve()
  })
}

function getPreStyle(filePath) {
  // 根据 filePath 检查是否存在预处理样式文件
  // 并且更新 deps
  const file = {}
  if (filePath.substr(-1) === '/') {
    // 目录
    if (isExist(`${filePath}index.scss`)) {
      file.path = `${filePath}index.scss`,
      file.ext = 'index.scss'
    } else if (isExist(`${filePath}index.css`)) {
      file.path = `${filePath}index.css`,
      file.ext = 'index.css'
    }
  } else {
    // 文件
    if (isExist(`${filePath}.scss`)) {
      file.path = `${filePath}.scss`,
      file.ext = '.scss'
    } else if (isExist(`${filePath}.css`)) {
      file.path = `${filePath}.css`,
      file.ext = '.css'
    }
  }
  return file
}


module.exports = {
  generateCssModule
}