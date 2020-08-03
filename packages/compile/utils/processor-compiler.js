const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')
const cssnano = require('cssnano')

function compile(file) {
  const css = sass.renderSync({ file }).css
  const processor = postcss([autoprefixer, postcssNormalize])
  return processor.process(css, { from: undefined })
}

async function minify(css) {
  if (css) {
    const processor = postcss([cssnano({
      preset: 'default'
    })])
    const res = await processor.process(css, { from: undefined })
    return res.css
  }
  return css
}

module.exports = {
  compile,
  minify
}