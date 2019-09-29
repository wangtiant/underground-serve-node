const {LinValidator, Rule} = require('../../core/lin-validator-v2')
const User = require('../models/user')
const { LoginType } = require('../lib/enum')
class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }
}

class RegisterException extends LinValidator{
    constructor(){
        super()
        this.phone = [
            new Rule('matches','不符合手机号规范',"^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[1,3,5,8,9])\\d{8}$")
        ]
        this.password = [
            new Rule('isLength','密码至少6个字符，最多32个字符',{min:6,max:32}),
            new Rule('matches','密码不符合规范',"(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,32}$")
        ]
        this.nickname = [
            new Rule('isLength','昵称长度不符合规范',{min:1,max:16})
        ]
    }
    
    async validatePhone(vals){
        const phone = vals.body.phone
        const user = await User.findOne({
            where:{
                phone:phone
            }
        })
        if (user) {
            throw new Error('该手机号已注册')
        }
    }
}

class TokenException extends LinValidator{
    constructor(){
        super()
        this.account = [
            new Rule('matches','不符合手机号规范',"^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[1,3,5,8,9])\\d{8}$")
        ]
        this.password = [
            new Rule('isOptional'),
            new Rule('isLength','密码至少6个字符，最多32个字符',{min:6,max:32}),
        ]
    }

    validateType(vals){
        if(!vals.body.type){
            throw new Error('type是必填参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }
}

class ObituaryValidator extends LinValidator{
    constructor(){
        super()
        this.status = [
            new Rule('isInt','传入正确的状态')
        ]
    }
}



module.exports = {
    PositiveIntegerValidator,
    RegisterException,
    TokenException,
    ObituaryValidator
}