const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model{
    static async verifyAccountPassword(account,plainPassword){
        const user = await User.findOne({
            where:{
                phone:account
            }
        })
        if(!user){
            throw new global.errors.NotFound('用户不存在')
        }
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw new global.errors.AuthFailed('密码错误')
        }
        return user
    }
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
    password:{
        type:Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val,salt)
            this.setDataValue('password',pwd)
        }
    }
},{sequelize})

module.exports = User