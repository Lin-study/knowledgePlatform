const Router = require('koa-router')
const { getdir, getBook } = require('../util')

const router = new Router()

router.get('/getTree', ctx => {
  ctx.body = getdir()
})
router.post('/getBook',ctx => {
  ctx.body = getBook(ctx.params.path)
})

module.exports = router.routes()