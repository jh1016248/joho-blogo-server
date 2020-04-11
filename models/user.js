const database = require('../libs/database')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  uid: {
    type: String,
  },
  account: {
    type: String,
    unique: true,
    require: true,
  },
  avatar: {
    type: String,
    default: 'https://upload.jianshu.io/users/upload_avatars/3963958/5f317349-75af-40a6-8c0c-5cfec215ca13.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
})
module.exports = database.model('User', UserSchema)
