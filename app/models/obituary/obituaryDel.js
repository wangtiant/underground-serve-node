const {sequelize} = require('../../../core/db')
const {Sequelize, Model} = require('sequelize')
const ObituaryAlive = require('../../models/obituary/ObituaryAlive')
const ObituaryLonely = require('../../models/obituary/ObituaryLonely')
const ObituaryInfernal = require('../../models/obituary/ObituaryInfernal')
class ObituaryDel extends Model{
    static async getObituaryList(current=1, size=10, name='', genre='', type=''){
        const data = await ObituaryDel.findAndCountAll({
            where:{
                name: {
                    $like: `%${name}%`,
                  },
            },
            limit: size * 1,
            offset: size * (current - 1),
        })
        return data
    }

     // 根据id查询
    static async getItemInfo(id){
        const data = await ObituaryDel.findOne({
            where:{ id:id }
        })
        return data
    }

     //恢复
     static async deleteItem(id){
        return sequelize.transaction(t => {
            return ObituaryDel.findOne({
                where:{ id:id }
            }, {transaction: t}).then(user => {
                return ObituaryDel.destroy({
                    where:{id:user.id},
                    force:true
                },{transaction: t}).then(row=>{
                    if(user.status===1){
                        return ObituaryAlive.create(user, {transaction: t})
                    }else if(user.status===2){
                        return ObituaryLonely.create(user, {transaction: t})
                    }else if(user.status===3){
                        return ObituaryInfernal.create(user, {transaction: t})
                    }
                });
             });
          }).then(result => {
          }).catch(err => {
            console.log('事件已回滚')
            throw new global.errors.NotFound()
          });
    }
}

ObituaryDel.init({
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

module.exports = ObituaryDel