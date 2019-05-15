const Hints = require('../constant/hints')

class ValidatorError extends Error {
    constructor(msaage) {
        super(msaage)
        this.name = "ValidatorError"
    }
}

function assert(bool, msg) {
    if (!bool) throw new ValidatorError(msg)
}

function permission(bool) {
    if (!bool) throw Error(Hints.PERMISSION_DENIED)
}

function text(name, value, min, max, abortNull = false) {
    if (abortNull && null == value) return
    if (null == value) throw new ValidatorError(`${name}不能为空`)
    if (value.length < min) throw new ValidatorError(`${name}长度不能少于${min}位`)
    if (value.length > max) throw new ValidatorError(`${name}长度不能超过${max}位`)
}

function intcode(name, value, abortNull = false) {
    if (null == value && abortNull) return
    if (null == value || value < 0) throw new ValidatorError(`${name}参数错误`)
}

function uname(name, value, abortNull = false) {
    text.call(this, name, value, 0, 12, abortNull)
}

function account(name, value, abortNull = false) {
    text.call(this, name, value, 4, 20, abortNull)
}

function city(name, value, abortNull = false) {
    text.call(this, name, value, 0, 30, abortNull)
}

function pin(name, value, abortNull = false) {
    text.call(this, name, value, 8, 20, abortNull)
}

function sex(name, value, abortNull = false) {
    if (abortNull && null == value) return
    if (['M', 'F'].includes(value)) return
    throw new ValidatorError(`${name}参数错误`)
}

function address(name, value, abortNull = false) {
    text.call(this, name, value, 0, 100, abortNull)
}

function remark(name, value) {
    text.call(this, name, value, 0, 250, true)
}

function phone(name, value, abortNull = false) {
    text.call(this, name, value, 7, 20, abortNull)
}

function contract(name, value, abortNull = false) {
    text.call(this, name, value, 0, 50, abortNull)
}

function photo(name, value, abortNull = false) {
    text.call(this, name, value, 0, 255, abortNull)
}

function normal(name, value, abortNull = false){
    text.call(this, name, value, 0, 255, abortNull)
}

function lawMajor(value){
    if((value && value.length > 5)) throw new ValidatorError('律师专长最多可以设置5项')
}

module.exports = {
    assert,
    permission,
    intcode,
    text,
    uname,
    sex,
    contract,
    photo,
    phone,
    city,
    account,
    pin,
    address,
    remark,
    normal,
    lawMajor
}