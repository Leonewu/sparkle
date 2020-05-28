const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const getComponents = require('./components')
// TODO 两份配置差异不大可以通过 merge 来合并
// 规则：
// 全量打包： css 样式通过 style-loader 嵌入 dom 中
// 按需加载打包：每个组件作为一个入口打包，不用 style-laoder ，通过 miniCssExtractPlugin 拆分各自的 css
// 并且提取全局的 css 到 base.css
// 打包出来的目录结构尽量按照 babel-plugin-component 的默认路径
const entries = getComponents().reduce((sum, cur) => {
  sum[cur] = `./src/components/${cur}/`
  return sum
}, {})
module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../', 'lib'),
    library: 'xiao',
    // 打包成 umd
    libraryTarget: 'umd'
  },
  // optimization: {
  //   minimizer: [

  //   ]
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(),
                // normalize 还要在css中手动引入 @import-normalize
                require('postcss-normalize')()
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ]
}
