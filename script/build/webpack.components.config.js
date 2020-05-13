const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// TODO 两份配置差异不大可以通过 merge 来合并

module.exports = {
  mode: 'development',
  entry: {
    button: './src/components/Button/index.js',
    select: './src/components/Select/select.vue'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../', 'lib'),
    library: 'xiao',
    // 打包成 umd
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
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
    })
  ]
}
