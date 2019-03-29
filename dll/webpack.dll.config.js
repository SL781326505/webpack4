const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vender: [
      'react',
      'react-dom'
    ]
  },
  // devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './', '[name].manifest.json'),
      name: '[name]_library'
    }),
  ]
}