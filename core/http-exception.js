class HttpException extends Error{
    constructor(msg = '', errorCode = 10000, code = 400){
        super()
        this.msg = msg
        this.error_code = errorCode
        this.code = code
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'参数错误'
        this.error_code = errorCode || 10000
        this.code = 400
    }
}

class Success extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'ok'
        this.error_code = errorCode || 0
        this.code = 200
    }
}

class NotFound extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'资源未找到'
        this.error_code = errorCode || 10000
        this.code = 404
    }
}

class AuthFailed extends HttpException{
    constructor(msg, errorCode ){
        super()
        this.msg = msg ||　'授权失败'
        this.error_code = errorCode || 10000
        this.code = 401
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed
}