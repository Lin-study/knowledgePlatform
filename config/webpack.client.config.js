const path = require('path')
  //提取 css  插件
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);
const webpack = require('webpack');
const wdsPort = 9002
const publicPath = `http://localhost:${wdsPort}/`
console.log(__dirname)
module.exports = {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', resolvePath('../src/client/index.js')] //入口文件
  },
  output: {
    filename: '[name].js',
    path: resolvePath('../dist/static'),
    publicPath: publicPath
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      '__IS_PROD__': false,
      '__SERVER__': false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.scss$/,
          chunks: 'all',
          enforce: true,
        },
        libs: { // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'libs' // 打包后的文件名，任意命名    
        }
      }
    }
  },
  devServer: {
    host: 'localhost',
    quiet: true,
    port: wdsPort, //wds 服务端口
    contentBase: path.resolve(__dirname, '../dist/static'),
    publicPath: publicPath, //必须和 webpack.dev.cnofig保持一致
    hot: true,
    hotOnly: true,
    progress: true,
    open: false,
    compress: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
      //当第一个文件更改，会在重新构建前增加延迟。
      //这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
      aggregateTimeout: 500,
      //指定毫秒为单位进行轮询
      poll: 500
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}