const Results = require('../lib/results')
const Hints = require('../constant/hints')
const logger = require('../lib/logger')
const Format = require('../lib/format')
const JWT = require('../lib/jwt')
const SecurityService = require('../service/security')

async function login(ctx, _) {
    const {
        mobile = '', pin = ''
    } = ctx.request.body
    let result = null
    try {
        if (mobile.length <= 0) throw Error(Hints.REQ_PARAM_ERROR)
        if (pin.length <= 0) throw Error(Hints.REQ_PARAM_ERROR)
        //按类型查询用户信息
        const user = await SecurityService.findByMobile(mobile)
        if (!user) throw Error(Hints.ACCOUNT_NOT_EXIST)
        const cryptPin = Format.md5(pin)
        if (user.pin !== cryptPin) throw Error(Hints.ACCOUNT_OR_PASSWD_ERROR)
        if (user.forbid == true) throw Error(Hints.ACCOUNT_FORBIDDEN)
        const packet = {}
        packet.uid = user.uid,
        packet.token = JWT.sign({ uid: user.uid})
        //返回信息
        result = Results.success(packet)
    } catch (error) {
        logger.error(error)
        result = Results.failure(error.message)
    }
    ctx.response.body = result
}

module.exports = {
    'POST /security/login': login
}