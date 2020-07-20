const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const { DEV_DIR } = require('./packages/compile/config')
// 多页面： site 文档网站
// mobile： 移动端预览

module.exports = {
  mode: 'development',
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 2333
  },
  devtool: 'eval-cheap-source-map',
  entry: {
    site: './site/doc/main.js',
    mobile: './site/mobile/main.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../', 'site-dist'),
    chunkFilename: 'js-chunk/[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.jsx', '.json'],
    mainFiles: ['index'],
    alias: {
      '@COMPONENTS': DEV_DIR
    }
  },
  resolveLoader: {
    modules: ['node_modules', 'packages'],
    mainFiles: ['index']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 第三方库打包出 vendor
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        },
        common: {
          test: /.js$/,
          name: 'common',
          chunks: 'initial',
          priority: 1,
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
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
          'style-loader',
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: ['vue-loader', 'markdown-loader']
      }
    ]
  },
  plugins: [
    new WebpackBar({
      name: 'Starity UI',
      color: '#c94bff'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './site/doc/index.html',
      logo: './site/icon/favicon-32x32.png',
      title: 'Starity UI | Vue移动端组件库',
      chunks: ['site']
    }),
    new HtmlWebpackPlugin({
      filename: 'mobile.html',
      template: './site/mobile/index.html',
      logo: './site/icon/favicon-32x32.png',
      title: 'Starity UI | Vue移动端组件库',
      chunks: ['mobile']
    }),
    new CleanWebpackPlugin()
  ]
}
