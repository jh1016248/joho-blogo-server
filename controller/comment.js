const Comment = require('../models/comment')
const Reply = require('../models/reply')
const getUserAggregate = require('../dbHelper/aggregates').getUserAggregate;


const removeAll = async (articleId) => {
    await Comment.remove({  })
    await Reply.remove({  })
}

const asyncAction = async () => {
    
}


exports.getComment = async ( ctx, next ) => {
    const { articleId } = ctx.request.query;
    // const list = await Comment.aggregate([
    //     { $match: { articleId } },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             let: { "authorId": { "$toObjectId": "$author" } },
    //             pipeline: [
    //                 { "$match": { "$expr": { "$eq": [ "$_id", "$$authorId" ] } } },
    //                 { "$project": { "_id": 1, "account": 1, 'name': 1, 'avatar': 1 }}
    //             ],
    //             as: 'user'
    //         },
    //     },
    //     {$unwind:'$user'},
    // ])
    
    const list = await Comment.aggregate(getUserAggregate({ articleId } ,'author'))
    let index = 0;
    const findChildren = async () => {
        const item = list[index];
        item.children = [];
        const children = await Reply.aggregate(getUserAggregate({ replyId: String(item._id) } ,'author'))
        item.children = children
        if(index >= list.length - 1) {
            return ctx.body = {
                code: 200,
                data: list
            }
        }
        index ++;
        await findChildren()
    }
    await findChildren()
}


exports.sendComment = async ( ctx, next ) => {
    const { articleId, content, replyId = '', replyUserId = '', replyUserName = '' } = ctx.request.body;
    const now = new Date();
    const user = ctx.user;
    const comment = {
        articleId,
        content,
        createTime: now,
        replyId, 
        replyUserId,
        replyUserName,
        author: user._id,
    }

    if(replyId !== '') {
        try{
            const res = await Reply.create(comment)
            ctx.body = {
                code: 200,
                data: res
            }
        }
        catch (e){
            ctx.body = {
                code: 0,
                data: e,
                message: '留言失败'
            }
        }
    }
    else {
        try{
            const res = await Comment.create(comment)
            ctx.body = {
                code: 200,
                data: res
            }
        }
        catch (e){
            ctx.body = {
                code: 0,
                data: e,
                message: '留言失败'
            }
        }
    }
}
