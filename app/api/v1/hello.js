const Router = require('koa-router')
const router = new Router()
const { AuthType } = require('../../lib/enum')
const { Auth } = require('../../../middlewares/auth')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/v1/hello',new Auth(AuthType.USER).m, async(ctx,next)=>{
    ctx.body = ctx.auth.uid
})

module.exports = router