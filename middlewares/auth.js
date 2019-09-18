const BasicAuth = require('basic-auth')
class Auth {
    constructor(){

    }

    get m(){
        return async (ctx,next)=>{
            const token = BasicAuth(ctx.req)
            ctx.body = token
        }
    }
}

module.exports = {
    Auth
}