const BasicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { AuthType } = require('../app/lib/enum')
class Auth {
    constructor(level){
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
    }

    get m(){
        return async (ctx,next)=>{
            const userToken = BasicAuth(ctx.req)
            let errMsg = 'token不合法'
            if(!userToken||!userToken.name){
                throw new global.errors.Forbbiden(errMsg)
            }
            try {
                var decode = jwt.verify(userToken.name,global.config.security.secretKey)
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                throw new global.errors.Forbbiden(errMsg)
            }
            if(this.level < AuthType[decode.auth]){
                errMsg = '权限不足'
                throw new global.errors.Forbbiden(errMsg)
            }
            ctx.auth = {
                uid: decode.uid,
                auth: decode.auth
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}