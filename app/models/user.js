const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class User extends Model{

}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    phone:{
        type:Sequelize.STRING,
        unique:true
    },
    nickname:Sequelize.STRING,
    password:Sequelize.STRING,
},{sequelize})

module.exports = User