const babel = require('@babel/core')

function compile(filePath, content) {
  return new Promise((resolve, reject) => {
    try {
      const result = babel.transformSync(content, { filename: filePath }).code
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = compile




