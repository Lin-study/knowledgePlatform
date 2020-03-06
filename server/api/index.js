const Router = require('koa-router')
const path = require('path')
const { getdir, getBook } = require('../util')

const router = new Router()

router.get('/getTree', ctx => {
  ctx.body = getdir(path.join(__dirname, '..', './_book'))
})
router.get('/getBook',ctx => {
  console.log()
  ctx.body = getBook(path.join(__dirname, '..', './_book/网络/HTTP的Post和Get.md')).toLocaleString()
})

module.exports = router.routes()