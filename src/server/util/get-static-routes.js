//将路由转换为静态路由
async function getStaticRoutes(routes) {

    const key ='__dynamics_route_to_static';
    if (global[key]){
        console.log('cache route');
        return global[key];
    }

    let len = routes.length,
        i = 0;
    const staticRoutes = [];

    for (; i < len; i++) {
        let item = routes[i];
        staticRoutes.push(Object.assign({}, item));
    }
    global[key]=staticRoutes;
    return staticRoutes; //返回静态路由
}

export default getStaticRoutes;