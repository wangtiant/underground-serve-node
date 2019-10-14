const {sequelize} = require('../../../core/db')
const {Sequelize, Model} = require('sequelize')
const ObituaryDel = require('../../models/obituary/obituaryDel')
const Op = Sequelize.Op;
class ObituaryAlive extends Model{
    //按条件分页查询
    static async getObituaryList(current=1, size=10, name='', genre='', type=''){
        const data = await ObituaryAlive.findAndCountAll({
            where:{
                name: { [Op.like]: `%${name}%`},
                genre:{ [Op.like]: `%${genre}%`},
                type:{ [Op.like]: `%${type}%`}
            },
            limit: size * 1,
            offset: size * (current - 1),
        })
        return data
    }
    // 根据id查询
    static async getItemInfo(id){
        const data = await ObituaryAlive.findOne({
            where:{ id:id }
        })
        return data
    }

    //删除
    static async deleteItem(id){
        return sequelize.transaction(t => {
            return ObituaryAlive.findOne({
                where:{ id:id }
            }, {transaction: t}).then(user => {
              return ObituaryDel.create(user,
                {transaction: t}).then(user=>{
                    return ObituaryAlive.destroy({
                        where:{id:user.id},
                        force:true
                    },{transaction: t});
                });
             });
          }).then(result => {
          }).catch(err => {
            console.log('事件已回滚')
            throw new global.errors.NotFound()
          });
    }

    //更新
    static async updateItem(params,id){
        const data = await ObituaryAlive.update(params,{
            where:{
                id:id
            }
        })
        return data
    }
}
ObituaryAlive.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue:1 // 1阳寿未尽 2孤魂野鬼 3地府鬼魂 4已删除
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
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