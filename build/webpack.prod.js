const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js
const OptimizeCSSAseetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
// const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip


module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..')
    }),
    // new CompressionWebpackPlugin({ //gzip 压缩
    //   algorithm: 'gzip',
    // })
  ],
  
  // 优化
  optimization: {
    // 单独打包
    splitChunks: { // 打包 node_modules 里的代码
      chunks: 'all'
    },
    runtimeChunk: true, // 打包 runtime 代码

    // 压缩
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAseetsPlugin({}) // 压缩css，使用minimizer会自动取消webpack的默认配置，所以记得用UglifyJsPlugin
    ]
  }
})