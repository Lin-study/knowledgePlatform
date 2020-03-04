const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src'
  },
  output: {
    path: config.build.assetsRoot, // 输入路径
    filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    publicPath: config.build.assetsPublicPath
  },
  module: {
    rules: [{
        test: /\.js/,
        loader: 'babel-loader',
        // query: {
        //   presets: ['react']
        // }
        // excludes: /node_modules/
      },
      {
        test: /\.md/,
        loader: 'markdown-loader'
      },
      {
        test: /\.css/,
        loader: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // 自动添加兼容性前缀
                require('autoprefixer')(),
              ]
            }
          }
        ]
      },
      {
        test: /\.less/,
        loader: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // 自动添加兼容性前缀
                require('autoprefixer')(),
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: true
      },
      inject: true,
    }),
  ]
}