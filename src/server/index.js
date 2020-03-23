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
router.get('/', require('./libs/react-ssr').default)
router.use('/api', require('./api'))
app.use(router.routes())

const port = 9001;
//启动服务
app.listen(port);

console.log('server is start', `http://localhost:${port}`);