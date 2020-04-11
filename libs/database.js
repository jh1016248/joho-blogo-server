const mongoose = require('mongoose')
const CONFIG = require('../config/default')

const database = mongoose.createConnection(CONFIG.mongodb.uri, CONFIG.mongodb.options)

database.then(() => {
  console.log('成功连接数据库 Mongodb')
}).catch(() => {
  console.log('连接数据库 Mongodb 失败')
})

module.exports = database
