const config = require('./config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
// 开启热更新
Object.keys(common.entry).forEach((name) => {
  common.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(common.entry[name])
})
module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 9000,
    hot: true,
    overlay: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})