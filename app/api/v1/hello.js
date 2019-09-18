const Router = require('koa-router')
const router = new Router()
const { Auth } = require('../../../middlewares/auth')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/v1/hello',new Auth().m, async(ctx,next)=>{
    // let v = await new PositiveIntegerValidator().validate(ctx)
    // ctx.body={
    //     a:1
    // }
})

module.exports = router