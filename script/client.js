const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//webapck dev 前端构建环境配置
const clientConfig = require('../config/webpack.client.config');

// 创建webpack compiler
function getWebPackCompiler() {
    return webpack(clientConfig);
}

//创建 wds 服务
function createWdsServer() {

    let compiler = getWebPackCompiler();
    compiler.hooks.done.tap('done', function (data) {
        console.log('\n wds server compile done'); //编译完成的时候 
    });

    return new WebpackDevServer(compiler);
}

// 启动 WebpackDevServer.
function runWdsServer() {

    let devServer = createWdsServer();
    devServer.listen(9002, 'localhost',err => {
        if (err) {
            return console.log(err);
        }
        // console.log(chalk.cyan('🚀 Starting the development node server,please wait....\n'));
    });

}


runWdsServer();


