class ReaponseBase{
    constructor(error_code=0,message='',data={}){
        this.error_code = error_code
        this.message = message
        this.data = data
    }

    success(message='',data={}){
        return {
            error_code: 0,
            message,
            data
        }
    }
}

module.exports = ReaponseBase