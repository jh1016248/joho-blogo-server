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
    const now = new Date();
    const category = {
      name,
      createTime: now,
    }
    try{
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