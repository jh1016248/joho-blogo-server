const router = require('koa-router')()
const User = require('../controller/user')

const routers = router
  .post('/user/signup', User.signup)
  .post('/user/login', User.login)
  .get('/user/current', User.getCurrent)

module.exports = routers
