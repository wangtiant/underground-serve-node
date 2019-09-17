module.exports = {
    environment:'dev',
    // environment:'prod',
    database: {
        dbName: 'underground',
        host: 'localhost',
        port: '3306',
        user: 'root',
        password:'123456'
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60*60
    }
}