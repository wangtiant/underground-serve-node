class HttpException extends Error{
    constructor(msg = '', errorCode = 10000, code = 400){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'参数错误'
        this.errorCode = errorCode || 10000
        this.code = 400
    }
}

class Success extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'ok'
        this.errorCode = errorCode || 0
        this.code = 200
    }
}

class NotFound extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

class AuthFailed extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class Forbbiden extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden
}