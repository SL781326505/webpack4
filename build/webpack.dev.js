const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',

  // devtool: 'cheap-source-map', // 推荐
  devtool: 'cheap-eval-source-map', // 快
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true, // 依赖于HTML5 history API,所有的跳转将指向index.html
    port: 9000,
    open: true,
    hot: true,
    inline: true,
    overlay: true, // 在浏览器页面显示错误
    stats: 'errors-only' // 编译时在shell上输出的内容
  }
})