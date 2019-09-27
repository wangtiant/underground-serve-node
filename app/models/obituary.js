const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class Obituary extends Model{

}

Obituary.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    life:{
        type:Sequelize.INTEGER,
    },
    genre:{
        type:Sequelize.INTEGER,
        defaultValue:1 //1:人 2:动物 3:植物
    },
    type:{
        type:Sequelize.INTEGER,
        defaultValue:1 //1:善终 2:病死 3:意外死亡 4:被害 5:自杀
    }
},{sequelize})

module.exports = Obituary