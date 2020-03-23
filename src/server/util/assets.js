//生产环境中 静态资源的处理
module.exports = function () {

    //let devHost = '//localhost:9001';
    let devHost = `//localhost:9002`;

    // let jsFiles = ['libs.js', 'main.js'];

    const assets = {
        js: [],
        css: []
    };
    assets.js.push(`<script type="text/javascript"  src="${devHost}/libs.js"></script>`);
    assets.js.push(`<script type="text/javascript"  src="${devHost}/main.js"></script>`);
    // if () {//开发环境
    // } else {
    //     //生产环境 从 asset-manifest.json 读取资源
    //     const map = require('@dist/server/asset-manifest.json');
    //     jsFiles.forEach(item => {
    //         if(map[item])
    //             assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
    //     });
    // }


    return assets;

}