const mongoose = require('mongoose')
const database = require('../libs/database')

const CommentSchema = new mongoose.Schema({
    articleId: {type: String},
    author: {type: String},
    isAuthor: {type: Boolean},
    replyId: {type: String}, 
    replyUserId: {type: String}, 
    replyUserName: {type: String}, 
    content: {type: String},
    createTime: {type: Date},
}, {versionKey: false})

module.exports = database.model('comment', CommentSchema, 'comments');