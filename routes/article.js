const router = require('koa-router')()
const Article = require('../controller/article')

const routers = router
    .get('/article/getArticles', Article.getArticles)
    .get('/article/getArticleDetail', Article.getArticleDetail)
    .post('/article/publishArticle', Article.publishArticle)

module.exports = routers