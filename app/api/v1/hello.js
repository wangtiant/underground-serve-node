const Router = require('koa-router')
const router = new Router()

const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/hello',(ctx,next)=>{
    const path = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body
    let v = new PositiveIntegerValidator().validate(ctx)
    // const id = v.get('path.id')
    ctx.body={
        a:1
    }
})

module.exports = router