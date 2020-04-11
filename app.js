const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const router = require('./routes')
const CONFIG = require('./config/default')
const cors = require('koa2-cors');
const jwtKoa = require('koa-jwt');
const resolveToken = require('./libs/resolveToken')
require('./libs/database')

const app = new Koa()

app.use(logger())
app.use(koaBody({ 
  multipart: true, 
  "formLimit":"5mb",
  "jsonLimit":"5mb",
  "textLimit":"5mb" }))

// 跨域
app.use(cors({
  origin: function (ctx) {
    return "*"; // 允许来自所有域名请求
      return 'http://localhost:8000'; 
  },
  exposeHeaders: ['WWW-Authenticate', 'token', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['OPTION', 'GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'token', 'Accept'],
}))

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})

// static
app.use(serve(path.join(__dirname, '/public')))
// views
app.use(views(path.join(__dirname, 'view'), {
  map: { html: 'nunjucks' }
}))

// error
onerror(app)

app.use(jwtKoa({secret: CONFIG.secret}).unless({
  path: CONFIG.whiteList, //数组中的路径不需要通过jwt验证
}))

app.use(resolveToken)
router(app)

app.listen(CONFIG.port, () => {
  console.log(`Server running at http://127.0.0.1:${CONFIG.port}/`)
})
