const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.use('/api', require('./api'))
app.use(router.routes())
app.listen(3000, () => {
  console.log('The server is start at port ' + 3000)
})