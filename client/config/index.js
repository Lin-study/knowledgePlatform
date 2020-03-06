'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
module.exports = {
  // 开发模式
  dev: {
    // 下面定义的是静态资源根目录的子目录static，也就是dist目录下面的static
    assetsSubDirectory: 'static',
    // 静态资源的公开路径
    assetsPublicPath: '/',
    proxyTable: {},
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // 服务的端口号
    port: 8090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 代理
    proxyTable: {
      // 拦截的前缀
      '/smv-web': {
        // 代理的目标地址
        target: 'http://192.168.1.45',
        // 处理跨域
        changeOrigin: true
      }
    },
    // 是否在npm run dev 后开启页面
    autoOpenBrowser: false,
    // 浏览器错误提示
    errorOverlay: true,
    // 跨平台错误提示
    notifyOnErrors: true,
    // 使用文件系统(file system)获取文件改动的通知devServer.watchOptions
    poll: false,
    // 是否使用代码检测工具
    useEslint: true,
    showEslintErrorsInOverlay: false,
    // 增加调试，该属性为原始源代码（仅限行）不可在生产环境中使用
    devtool: 'cheap-module-eval-source-map',
    // 缓存失效
    cacheBusting: true,
    // 开启css文件定位，方便在出错时定位位置信息
    cssSourceMap: true
  },
  // 生产模式
  build: {
    // 编译后生成的位置和名称
    index: path.resolve(__dirname, '../dist/index.html'),
    // 编译后存放生成环境代码的位置
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 静态资源的公开路径
    assetsPublicPath: './',
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // unit的gzip命令用来压缩文件，gzip模式下需要压缩的文件的扩展名有js和css
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}