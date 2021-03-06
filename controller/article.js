const Article = require('../models/article')

exports.list = async ( ctx, next ) => {
    const { page, size, categoryId } = ctx.request.query;
    const query = categoryId ? { categoryId } : {};
    const res = await Article.find( query ).skip(Number(page)).limit(Number(size)).sort({'_id':-1});
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.detail = async ( ctx, next ) => {
    const { id } = ctx.request.query;
    const res = await Article.findById(id);
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.create = async ( ctx, next ) => {
    const { title, content, thumb = '', categoryId } = ctx.request.body;
    const user = ctx.user;
    const now = new Date();
    const article = {
        categoryId,
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

exports.delete = async (ctx, next) => {
    const { id } = ctx.request.body;
    try{
        const res = await Article.findByIdAndDelete( id );
        ctx.body = {
            code: 200,
            data: res,
            message: '删除成功'
        }
    }
    catch (e) {
        ctx.body = {
            code: 0,
            data: e,
            message: '删除失败'
        }
    }
}