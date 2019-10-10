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
const { ObituaryValidator, ObituaryDeleteValidator } = require('../../validators/validator')

// status:1阳寿未尽 2孤魂野鬼 3地府鬼魂 4已删除
router.post('/getList',async(ctx, next)=>{
    const v = await new ObituaryValidator().validate(ctx)
    const body = v.get('body')
    const {status,current,size,name,genre,type} = body
    let getList = getObituaryList(status)
    const data = await getList(current,size,name,genre,type)
    const reaponseBody = {        
        list:data.rows,
        total:data.count
    }
    ctx.body = reaponseBase.success('',reaponseBody)
})

router.get('/getInfoById',async(ctx, next)=>{
    let v = await new ObituaryDeleteValidator().validate(ctx)
    const query = v.get('query')
    const {id,status} = query
    let getInfo = getInfoById(status)
    const data = await getInfo(id)
    ctx.body = reaponseBase.success('',data)
})

router.delete('/deleteById', async(ctx, next)=>{
    const v = await new ObituaryDeleteValidator().validate(ctx)
    const body = v.get('body')
    const {id,status} = body
    let deleteFun = deleteItem(status)    
    await deleteFun(id)
    ctx.body = reaponseBase.success('删除成功')
})

router.put('/update', async(ctx, next)=>{
    const v = await new ObituaryValidator().validate(ctx)
    const body = v.get('body')
    const id = v.get('query.id')
    let updateFun = updateItem(body.status)
    const data = await updateFun(body,id)
    ctx.body = reaponseBase.success('修改成功')
})

function getObituaryList(status){
    switch (status) {
        case 1:
            return ObituaryAlive.getObituaryList  
            break;
        case 2:
            return ObituaryLonely.getObituaryList  
            break;
        case 3:
            return ObituaryInfernal.getObituaryList  
            break;
        case 4:
            return ObituaryDel.getObituaryList 
            break;
        default:
            throw new global.errors.ParameterException()
            break;
    }
}

function getInfoById(status){
    switch (status) {
        case 1:
            return ObituaryAlive.getItemInfo  
            break;
        case 2:
            return ObituaryLonely.getItemInfo  
            break;
        case 3:
            return ObituaryInfernal.getItemInfo  
            break;
        case 4:
            return ObituaryDel.getItemInfo 
            break;
        default:
            throw new global.errors.ParameterException()
            break;
    }
}

function deleteItem(status){
    switch (status) {
        case 1:
            return ObituaryAlive.deleteItem
            break;
        case 2:
            return ObituaryLonely.deleteItem  
            break;
        case 3:
            return ObituaryInfernal.deleteItem  
            break;
        case 4:
            return ObituaryDel.deleteItem 
            break;
        default:
            throw new global.errors.ParameterException()
            break;
    }
}

function updateItem(status){
    switch (status) {
        case 1:
            return ObituaryAlive.updateItem
            break;
        case 2:
            return ObituaryLonely.updateItem  
            break;
        case 3:
            return ObituaryInfernal.updateItem  
            break;
        case 4:
            return ObituaryDel.updateItem 
            break;
        default:
            throw new global.errors.ParameterException()
            break;
    }
}

module.exports = router