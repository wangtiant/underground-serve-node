const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging:true,
    timezone:'+08:00',
    define:{
        freezeTableName:true,//取消复数
        timestamps:true,//自动生成created_at，updated_at字段
        paranoid:true,//自动生成deleted_at字段,软删除
        createdAt:'created_at',//更改字段名
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true,//将默认的驼峰命名改为下划线命名方式
    },
    query: { raw:true }
})

sequelize.sync({
    force:false
})

module.exports = {
    sequelize
}