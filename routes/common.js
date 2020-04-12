const router = require('koa-router')()
const Common = require('../controller/common')

const routers = router
    .post('/common/upload', Common.upload)

module.exports = routers