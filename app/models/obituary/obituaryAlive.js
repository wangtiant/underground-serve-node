const {sequelize} = require('../../../core/db')
const {Sequelize, Model} = require('sequelize')

class ObituaryAlive extends Model{

}

ObituaryAlive.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue:1 // 1阳寿未尽 2孤魂野鬼 3地府鬼魂 4已删除
    },
    sex:{
        type:Sequelize.INTEGER,
        defaultValue:1  //1男 2女
    },
    life:{//寿命
        type:Sequelize.INTEGER,
    },
    genre:{
        type:Sequelize.INTEGER,
        defaultValue:1 //1:人 2:动物 3:植物
    },
    Infernal:{//第几层地狱
        type:Sequelize.INTEGER,
    },
    type:{
        type:Sequelize.INTEGER,
        defaultValue:1 //1:善终 2:病死 3:意外死亡 4:被害 5:自杀
    },
    area:Sequelize.STRING,//地区
    birthday:Sequelize.STRING
},{sequelize})

module.exports = ObituaryAlive