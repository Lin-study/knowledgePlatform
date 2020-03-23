// 添加params属性,方便获取get或post请求参数
module.exports = async (ctx, next) => {
  ctx.params = Object.assign({}, ctx.request.body, ctx.query);
  await next();
}
