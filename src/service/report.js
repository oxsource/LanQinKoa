const {Log, App} = require('../repos/model')
const Hints = require('../constant/hints')

/**
 * 存储日志
 * @param {日志数组} logs
 */
async function save(logs) {
    if (null == logs || logs.length <= 0 ) throw Error(Hints.REQ_PARAM_ERROR)
    const keys = ['appId', 'appVersion', 'phoneModel', 'hash']
    let targets = logs.filter(log => {
        keys.forEach(key => {
            const value = log[key] 
            if(null == value || value.length <= 0) return false
        })
        return true
    })
    if(targets.length <= 0) return Promise.resolve([])
    //校验ID是否一致
    const ids = targets.map(log => log.appId)
    const uniqueIds = [...new Set(ids)]
    if(uniqueIds.length > 1) throw Error(Hints.APPID_NOT_MATCH)
    await new Promise((resolve, reject) => {
        const appid = targets[0].appId
        App.findOne({appid}, function(error, row){
            if(error) return reject(error)
            if(row == null) return reject(Error(Hints.APP_NOT_SUPPORT))
            const app = row._doc
            if(app.forbid == true) return reject(Error(Hints.APP_IS_FORBID))
            resolve(row._doc)
        })
    })
    //过滤查询已经存在的日志
    targets = await Promise.all(targets.map( target => new Promise((resolve, reject) => {
        Log.count({hash: target.hash}, function(error, count){
            if(error) return reject(error)
            const exist = (null == count ? 0 : count) > 0
            resolve(exist ? null : target)
        })
    })))
    targets = targets.filter(e => e != null)
    if(targets.length <= 0) return Promise.resolve([])
    return new Promise((resolve, reject) => {
        Log.create(targets, function(error, rows){
            if(error) return reject(error)
            resolve(rows.map(row => row._doc))
        })
    })
}

/**
 * 查询日志列表
 * @param {起始页} page 
 * @param {每页请求数量} size 
 * @param {筛选条件} kw 
 */
function list(page, size, kw = null){
    if(page < 0 || size <= 0) return []
    return new Promise((resolve, reject) => {
        const params = null == kw ? {} : kw
        const projecton = '_id_ appId appVersion appChannel phoneModel happenTime errTag level createTime'
        const options = {skip: page*size, limit:size}
        Log.find(params, projecton, options, function(error, row){
            if(error) return reject(error)
            resolve(row)
        })
    })
}

/**
 * 查询日志详情
 * @param {上报日志ID} id 
 */
function detail(id){
    if (null == id || id.length <=0) return null
    return new Promise((resolve, reject) => {
        const _id = id
        Log.findOne({_id}, function(error, row){
            if(error) return reject(error)
            if(null == row) return reject(Error(Hints.DATA_NOT_EXIST))
            resolve(row._doc)
        })
    })
}

module.exports = {
    save,
    list,
    detail
}
