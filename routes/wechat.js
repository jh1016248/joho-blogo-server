const router = require('koa-router')()
const Wechat = require('../controller/wechat')

const routers = router
  .post('/wechat/getToken', Wechat.getToken)

module.exports = routers
