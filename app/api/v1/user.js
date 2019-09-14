const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const router = new Router({
    prefix:'/v1/user'
})
const { RegisterException } = require('../../validators/validator')
const User = require('../../models/user')

router.post('/register',async (ctx,next)=>{
    let v = await new RegisterException().validate(ctx)
    const salt = bcrypt.genSaltSync(10)
    const pwd = bcrypt.hashSync(v.get('body.password'),salt)
    const user = {
        phone:v.get('body.phone'),
        password:pwd,
        nickname:v.get('body.nickname')
    }
    const r = await User.create(user)
})


module.exports = router