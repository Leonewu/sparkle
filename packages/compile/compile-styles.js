
const { compile } = require('./utils/processor-compiler')
const fs = require('fs-extra')
const { ES_DIR, STYLE_EXT } = require('./config')
const { cacheGlob: glob } = require('./utils/glob')

function compileStyles() {
  // 编译所有样式文件
  const styleFiles = glob(`${ES_DIR}/**/*.{${STYLE_EXT.substr(1)}, css}`)
  const promises = styleFiles.map(filePath => {
    return new Promise(async (resolve, reject) => {
      try {
        const cssPath = filePath.replace(new RegExp(`${STYLE_EXT}`), '.css')
        const res = await compile(filePath)
        res.css && fs.outputFileSync(cssPath, res.css)
        resolve(filePath)
      } catch(e) {
        reject(e)
      }
    })
  })
  return Promise.all(promises)
}


module.exports = compileStyles
