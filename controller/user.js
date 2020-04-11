const UserModel = require('../models/user')
const CONFIG = require('../config/default')
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    async login(ctx, next) {
        const { account, password } = ctx.request.body;
        const user = await UserModel.findOne({ account })
        if(user === null) {
            return ctx.body = {
                code: -1,
                message: '未注册'
            }
        }  
        
        if(user._id) {
            let userToken = {account: user.account, _id: user._id, avatar: user.avatar};
            const token = jsonwebtoken.sign(userToken, CONFIG.secret, { expiresIn:  '1h' });
            ctx.body = {
                code: 200,
                data: "Bearer " + token
            }
        }
    },
    async signup(ctx, next) {
        const body = ctx.request.body;
        const user = {
            account: body.account,
            password: body.password,
            name: body.account
        }
        const oldUser = await UserModel.findOne({ account: user.account })
        if(oldUser && oldUser._id) {
            ctx.body = {
                code: 0,
                message: '该用户名已注册，请使用其他账号'
            }
            return 
        }
        const result = await UserModel.create(user)
        if(result._id) {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        }
    },
    async getCurrent(ctx, next) {
        if(ctx.user._id) {
            ctx.body = {
                code: 200,
                data: {
                    ...ctx.user
                }
            }
        }
    },
}
