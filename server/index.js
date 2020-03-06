const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')

const path = require('path')

const app = new Koa()
const router = new Router()
app.use(koaBody())

// 添加自定义中间件
const libs = ['error', 'param']
libs
// 添加后缀名
.map(lib => /\./.test(lib) ? lib : lib + '.js')
.forEach(lib => {
  const fn = require(path.join(__dirname, './libs', lib))
  if (fn && typeof fn === 'function') app.use(fn)
})

router.use('/api', require('./api'))
app.use(router.routes())
app.listen(3000, () => {
  console.log('The server is start at port ' + 3000)
})