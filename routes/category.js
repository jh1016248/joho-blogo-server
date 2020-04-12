const router = require('koa-router')()
const Category = require('../controller/category')

const routers = router
  .get('/category/list', Category.getList)
  .post('/category/publishCategory', Category.publishCategory)

module.exports = routers
