const CONFIG = require('../config/default')
const Category = require('../models/category')

exports.getList = async (ctx, next) => {
  const list = await Category.find({  });
  ctx.body = {
    code: 200,
    data: list
  }
}

