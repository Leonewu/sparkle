
const { ES_DIR, LIB_DIR, LIB_NAME } = require('./')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin')
const name = LIB_NAME.toLowerCase().replace(/\s/g, '-')
module.exports = {
  mode: 'production',
  entry: path.resolve(ES_DIR, 'index.js'),
  output: {
    libraryTarget: 'umd',
    library: LIB_NAME,
    filename: `${name}.min.js`,
    path: LIB_DIR
  },
  optimization: {
    minimize: true
  },
  stats: 'none',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
      logLevel: 'WARNING'
    }),
  ]
}
