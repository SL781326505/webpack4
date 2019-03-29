const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离css

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  context: path.join(__dirname), // 上下文根目录，默认项目根目录
  entry: {
    app: '../src/index.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/' // 引用资源会加上/前缀
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
          { 
            loader: 'postcss-loader',
            options: {
              plugins: [
                  require("autoprefixer") /*在这里添加*/
              ]
            }
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|png|gif)/i,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DllReferencePlugin({ // 减少基础模块编译次数
      manifest: require(path.join(__dirname, '../dll/', 'vender.manifest.json'))
    })
  ]
}