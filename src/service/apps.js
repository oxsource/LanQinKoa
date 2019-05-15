const {App} = require('../repos/model')
const Hints = require('../constant/hints')

/**
 * 创建应用
 * @param {APP信息} app
 */
async function create(app) {
    if (null == app) throw Error(Hints.REQ_PARAM_ERROR)
    const keys = ['pkgName']
    keys.forEach(key => {
        const value = app[key] 
        if(null == value || value.length <=0) return false
    })
    //生产应用ID
    //存储应用信息
}

/**
 * 应用列表
 * @param {起始页} page 
 * @param {每页请求数量} size 
 * @param {筛选条件} kw 
 */
function list(page, size, kw = null){
    if(page < 0 || size <= 0) return []
    return new Promise((resolve, reject) => {
        const params = null == kw ? {} : kw
        const options = {skip: page*size, limit:size}
        App.find(params, {}, options, function(error, row){
            if(error) return reject(error)
            resolve(row)
        })
    })
}

/**
 * 更新应用信息
 * @param {应用信息} app 
 */
function update(app){
    if (null == app || null == app.id) return null
    return new Promise((resolve, reject) => {
       
    })
}

module.exports = {
    create,
    list,
    update
}