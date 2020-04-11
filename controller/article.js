const Article = require('../models/article')

exports.getArticles = async ( ctx, next ) => {
    const { page, size, categoryID } = ctx.request.query;
    const res = await Article.find({ categoryID }).skip(Number(page)).limit(Number(size)).sort({'_id':-1});
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.getArticleDetail = async ( ctx, next ) => {
    const { id } = ctx.request.query;
    const res = await Article.findById(id);
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.publishArticle = async ( ctx, next ) => {
    const { title, content, thumb = '' } = ctx.request.body;
    const user = ctx.user;
    const now = new Date();
    const article = {
        categoryId: 1,
        author: user._id,
        authorName: user.account,
        title,
        content,
        thumb,
        createTime: now,
    }
    try{
        const res = await Article.create(article);
        ctx.body = {
            code: 200,
            data: res._id
        }
    }
    catch(e) {
        ctx.body  = {
            code: 0,
            data: e,
            message: '发表文章失败！'
        }
    } 
}