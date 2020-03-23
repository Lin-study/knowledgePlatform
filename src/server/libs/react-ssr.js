//完成 react ssr 工作的中间件
//引入Index 组件
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route, matchPath } from 'react-router';
import routeList from '../../share/routerList';
import App from '../../client/page/index';
import getStaticRoutes from '../util/get-static-routes';
const getAssets = require('../util/assets');

export default async (ctx, next) => {
    const path = ctx.request.path;

    if (path.indexOf('.') > -1) {
        ctx.body = null;
        return next();
    }

    let html='',//组件渲染结果
         tdk = {//tdk 默认值
            title: '默认标题 - my react ssr',
            keywords: '默认关键词',
            description: '默认描述'
        };

    //获得静态路由
    const staticRoutesList = await getStaticRoutes(routeList);
    html = renderToString(<StaticRouter location={path} >
        <App routeList={staticRoutesList}></App>
    </StaticRouter>);

    //静态资源
    const assetsMap = getAssets();
    // ${assetsMap.css.join('')}
    ctx.body = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${tdk.title}</title>
            <meta name="keywords" content="${tdk.keywords}" />
            <meta name="description" content="${tdk.description}" />
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
        </html>
        </body>
        <script>
        </script>
        ${assetsMap.js.join('')}
    `;

    await next();
}