const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/token'
})
const {LoginType} = require('../../lib/enum')
const User = require('../../models/user')
const { TokenException } = require('../../validators/validator')
const { generateToken } = require('../../../core/util')

router.post('/',async (ctx)=>{
    let v = await new TokenException().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_ACCOUNT:
             token = await accountLogin(v.get('body.account'),v.get('body.password'))
            break;
        case LoginType.USER_MOBILE:
            //验证手机验证码
            break;
        default:
            throw new global.errors.ParameterException('没有相应的处理函数')
            break;
    }
    ctx.body = {
        token
    }
})

async function accountLogin(account,password){
    const user = await User.verifyAccountPassword(account,password)
    return token = generateToken(user.id, user.auth)
}

module.exports = router