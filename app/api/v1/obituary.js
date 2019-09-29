const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/obituary'
})
const ReaponseBase = require('../../lib/ReaponseBase')
const reaponseBase = new ReaponseBase()
const ObituaryAlive = require('../../models/obituary/obituaryAlive')
const ObituaryLonely = require('../../models/obituary/obituaryLonely')
const ObituaryInfernal = require('../../models/obituary/obituaryInfernal')
const ObituaryDel = require('../../models/obituary/obituaryDel')
const {ObituaryValidator} = require('../../validators/validator')

router.get('/getList',async(ctx, next)=>{
    let v = await new ObituaryValidator().validate(ctx)
    let getObituaryList
    if(v.get('query.status')===1){
        getObituaryList = ObituaryAlive.getObituaryList        
    }else if(v.get('query.status')===2){
        getObituaryList = ObituaryLonely.getObituaryList
    }else if(v.get('query.status')===3){
        getObituaryList = ObituaryInfernal.getObituaryList
    }else if(v.get('query.status')===4){
        getObituaryList = ObituaryDel.getObituaryList
    }else{
        throw global.error.ParameterException()
    }
    const data = await getObituaryList(v.get('query.current'),v.get('query.size'))
    const reaponseBody = {        
        list:data.rows,
        total:data.count
    }
    ctx.body = reaponseBase.success('',reaponseBody)
})

module.exports = router