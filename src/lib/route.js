const fs = require('fs')
const logger = require('./logger')

/**
 * 从指定路径注入路由项，并返回koa-router
 * @param 路由控制器相对路径 {String} dir 
 * @param 路由环境前缀 {String} prefix 
 */
function inject(dir, prefix = '') {
    const route = require('koa-router')({
        prefix: prefix
    })
    const methods = {
        'GET': route.get,
        'POST': route.post,
        'PUT': route.put,
        'DELETE': route.delete
    }
    const regx = new RegExp(`^(${Object.keys(methods).join('|')})?`)
    fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(file => {
        logger.info(`process controller ${file}...`)
        const mapping = require(`${dir}/${file}`)
        Object.keys(mapping).map(url => {
            const matched = url.match(regx)
            const name = !matched || matched.length < 2 ? '' : matched[1]
            return {
                name,
                url
            }
        }).filter(e => {
            if (e.name.length == 0) {
                logger.info(`invalid url:${e.url}`)
            }
            return e.name.length > 0
        }).forEach(e => {
            const path = e.url.substring(e.name.length + 1)
            methods[e.name].call(route, path, mapping[e.url])
            logger.info(`URL mapping: ${e.name} ${path}`)
        })
    })
    return route
}

//导出
module.exports = {
    routes: inject
}