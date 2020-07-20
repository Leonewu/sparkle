const babel = require('@babel/core')

function compile(filePath, content) {
  return babel.transformSync(content, { filename: filePath }).code
}

module.exports = compile




