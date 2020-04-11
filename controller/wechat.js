const CONFIG = require('../config/default')
const superagent = require('superagent');

let  wechatData = {};

exports.getToken = async (ctx, next) => {
  if(!wechatData.access_token) {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${CONFIG.wechat.appId}&secret=${CONFIG.wechat.secret}`;
    const tokenRes = await superagent.get(url)
    const data = JSON.parse(tokenRes.text);
    wechatData = data
  }
  else {
    console.log(wechatData)
  }
  // const redirectUrl = 'http://jhapi.fj-wanhe.com/api/wechat/'
  // let redirectUrl = 'http://wechat.fj-wanhe.com';
  // redirectUrl = encodeURIComponent(redirectUrl)
  // const getOpenidUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${CONFIG.wechat.appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  // ctx.status = 301;
  // ctx.body = {
  //   code: 200, 
  //   data: wechatData
  // }
}

