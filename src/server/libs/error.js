// 添加响应出错处理的中间件
module.exports = async function(ctx, next) {
  try {
    await next()
  } catch (error) {
    console.log({
      error: '服务器出错',
      message: error.message
    })
  }
}