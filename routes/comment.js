const router = require('koa-router')()
const Comment = require('../controller/comment')

const routers = router
    .get('/comment/getComment', Comment.getComment)
    .post('/comment/sendComment', Comment.sendComment)

module.exports = routers