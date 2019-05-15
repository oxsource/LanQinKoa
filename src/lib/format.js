const logger = require('./logger')
const crypto = require('crypto')

/**
 * 字符串填充
 * @param {*} orign 原始数据
 * @param {*} config  index-开始索引，total--最终字符串一共多少位，e-填充元素
 */
function padding(orign, config = {
    index: 0,
    total: 0,
    e: '0'
}) {
    if (config.total <= 0) return ''
    const content = orign ? orign.toString() : ''
    const a = content.slice(0, config.index)
    const b = content.slice(config.index)
    return (a + Array(config.total).join(config.e) + b).slice(-config.total)
}

/**
 * 初始化Date.toJSON格式为YYYY-MM-dd HH:mmm:ss
 */
function initDateJsonFormat() {
    Date.prototype.toJSON = function () {
        const options = {
            index: 0,
            total: 2,
            e: '0'
        }
        const year = this.getFullYear()
        const month = padding(this.getMonth() + 1, options)
        const day = padding(this.getDate(), options)
        const hours = padding(this.getHours(), options)
        const minute = padding(this.getMinutes(), options)
        const seconds = padding(this.getSeconds(), options)
        return `${year}-${month}-${day} ${hours}:${minute}:${seconds}`
    }
    const date = new Date()
    logger.info(`initDateJsonFormat:${date.toJSON()}`)
}

/**
 * 比较两个对象指定作用域内值不相同的属性，并单独提取到一个对象
 * @param {*} src 源对象
 * @param {*} dst 目标对象
 * @param {*} scope 用于比较的属性
 */
function diff(src, dst, scope = []) {
    const pkg = {}
    Object.keys(src)
        .filter(e => scope.includes(e) && dst[e] && src[e] != dst[e])
        .forEach(e => pkg[e] = dst[e])
    return pkg
}

function md5(text) {
    if (null == text || text.length <= 0) return ""
    const hash = crypto.createHash('md5')
    hash.update(text)
    return hash.digest('hex')
}

/**数组元素去重 */
function distinct(array) {
    const values = []
    array.forEach(e => {
        if (values.includes(e)) return
        values.push(e)
    })
    return values
}

module.exports = {
    initDateJsonFormat,
    padding,
    diff,
    md5,
    distinct
}