
const compileSass = require('./sass-compiler')
const fs = require('fs-extra')
const { OUTPUT_DIR, STYLE_EXT } = require('./config')
const { cacheGlob: glob } = require('./utils/glob')

function compileStyle() {
  // 编译所有样式文件
  const styles = glob(`${OUTPUT_DIR}/**/*.{${STYLE_EXT.substr(1)}, css}`)
  styles.forEach(filePath => {
    const compiledPath = filePath.replace(new RegExp(`${STYLE_EXT}`), '.css')
    compileSass(filePath).then(res => {
      if (res.content) {
        fs.outputFileSync(compiledPath, res.content)
      }
    })
  })
}


module.exports = {
  compileStyle
}
