
const compileSass = require('./sass-compiler')
const fs = require('fs-extra')
const { OUTPUT_DIR, STYLE_EXT } = require('./config')
const { cacheGlob: glob } = require('./utils/glob')

function compileStyle() {
  // 编译所有样式文件
  return new Promise((resolve, reject) => {
    try {
      const styleFiles = glob(`${OUTPUT_DIR}/**/*.{${STYLE_EXT.substr(1)}, css}`)
      styleFiles.forEach(async (filePath) => {
        const compiledPath = filePath.replace(new RegExp(`${STYLE_EXT}`), '.css')
        const res = await compileSass(filePath)
        res.css && fs.outputFileSync(compiledPath, res.css)
      })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}


module.exports = compileStyle
