const Router = require('koa-router')
const router = new Router()

router.get('/v1/world',(ctx,next)=>{
    ctx.body = {
        key: 'world'
    }
})

module.exports = router