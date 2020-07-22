
const { ES_DIR, LIB_DIR } = require('./config')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: path.resolve(ES_DIR, 'index.js'),
  output: {
    libraryTarget: 'umd',
    library: 'StarryUI',
    filename: 'starry-ui.min.js',
    path: LIB_DIR
  },
  optimization: {
    minimize: true
  },
  stats: 'none',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      // compilationSuccessInfo: {
      //   messages: ['Application is running here http://localhost:3000'],
      //   notes: ['Bundle Success!']
      // }
    }),
  ]
}
