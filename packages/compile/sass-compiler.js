const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')


function compile(file) {
  const css = sass.renderSync({ file }).css
  const processor = postcss([autoprefixer, postcssNormalize])
  return processor.process(css, { from: undefined })
}

module.exports = compile