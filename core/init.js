const RequireDirectory = require('require-directory')
const Router = require('koa-router')

class initManager {
    static initCore(app){
        // 入口方法
        initManager.app = app
        initManager.initLoadRouters()
        initManager.initError()
        initManager.loadConfig()
    }

    static initLoadRouters(){
        const path = `${process.cwd()}/app/api`
        RequireDirectory(module,path,{
            visit : whenLoadMoudle
        })
        
        function whenLoadMoudle(obj){
            if(obj instanceof Router){
                initManager.app.use(obj.routes())
            }
        }
    }

    static initError(){
        const error = require('./http-exception')
        global.errors = error
    }

    static loadConfig (path='') {
        const configPath = path || `${process.cwd()}/config/config.js`
        const config = require(configPath)
        global.config = config
    }
}

module.exports = initManager