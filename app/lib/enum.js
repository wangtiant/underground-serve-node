
function isThisType(val) {
    for (let key in this) {
        if (this[key] === val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_ACCOUNT: 100,
    USER_MOBILE: 101,
    isThisType
}

const AuthType = {
    USER: 8,
    ADMIN: 16,
    isThisType
}

module.exports = {
    LoginType,
    AuthType
}