const mongoose = require('mongoose')
const database = require('../libs/database')

const ReplySchema = new mongoose.Schema({
    articleId: {type: String},
    replyId: {type: String},
    author: {type: String},
    isAuthor: {type: Boolean},
    replyUserId: {type: String}, 
    replyUserName: {type: String}, 
    content: {type: String},
    createTime: {type: Date},
}, {versionKey: false})

module.exports = database.model('reply', ReplySchema, 'replys');