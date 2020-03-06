const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const { getdir } = require('./util')

const app = new Koa()
const router = new Router()
router.get('/getTree', ctx => {
  ctx.body = getdir(path.join(__dirname, './_book'))
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('The server is start at port ' + 3000)
})