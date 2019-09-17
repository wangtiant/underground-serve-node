const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/token'
})
const {LoginType} = require('../../lib/enum')
const User = require('../../models/user')
const { TokenException } = require('../../validators/validator')

router.post('/',async (ctx)=>{
    let v = await new TokenException().validate(ctx)
    switch (v.get('body.type')) {
        case LoginType.USER_ACCOUNT:
            await accountLogin(v.get('body.account'),v.get('body.password'))
            break;
        case LoginType.USER_MOBILE:

            break;
        default:
            break;
    }
})

async function accountLogin(account,password){
    const user = await User.verifyAccountPassword(account,password)
}

module.exports = router