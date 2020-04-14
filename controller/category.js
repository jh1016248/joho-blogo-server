const CONFIG = require('../config/default')
const Category = require('../models/category')

exports.getList = async (ctx, next) => {
  const list = await Category.find({  });
  ctx.body = {
    code: 200,
    data: list
  }
}

exports.publishCategory = async (ctx, next) => {
    const { name } = ctx.request.body;
    const oldCategory = await Category.find({ name })
    if(oldCategory.length) {
      ctx.body = {
        code: 0,
        message: '已存在'
      }
      return;
    }
    try{
      const now = new Date();
      const category = {
        name,
        createTime: now,
      }
      const res = await Category.create(category);
      ctx.body = {
          code: 200,
          data: res._id
      }
    }
    catch(e) {
      ctx.body  = {
          code: 0,
          data: e,
          message: '新增分类失败！'
      }
    } 
}

exports.delete = async (ctx, next) => {
  const { id } = ctx.request.body;
    try{
        const res = await Category.findByIdAndDelete( id );
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