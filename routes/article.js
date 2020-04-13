const router = require('koa-router')()
const Article = require('../controller/article')

const routers = router
    .get('/article/list', Article.list)
    .get('/article/detail', Article.detail)
    .post('/article/create', Article.create)
    .post('/article/delete', Article.delete)

module.exports = routers