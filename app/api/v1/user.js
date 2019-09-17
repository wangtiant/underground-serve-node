const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const router = new Router({
    prefix:'/v1/user'
})
const { RegisterException } = require('../../validators/validator')
const User = require('../../models/user')

router.post('/register',async (ctx,next)=>{
    let v = await new RegisterException().validate(ctx)
    const user = {
        phone:v.get('body.phone'),
        password:v.get('body.password'),
        nickname:v.get('body.nickname')
    }
    await User.create(user)
    throw new global.errors.Success()
})


module.exports = router